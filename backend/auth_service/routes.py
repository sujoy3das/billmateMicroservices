from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import or_
from datetime import datetime, timedelta
import socket
import logging

from database import SessionLocal
from models import User, PasswordResetOTP
from schemas import SignupSchema, LoginSchema, ForgotPasswordSchema, ResetPasswordSchema
from auth_utils import hash_password, verify_password, create_access_token, decode_access_token, generate_otp
from config import settings


import smtplib
from email.mime.text import MIMEText

router = APIRouter(prefix="/auth", tags=["Auth"])
logger = logging.getLogger(__name__)

# ---------------- DB Dependency ----------------
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ---------------- Email Sender ----------------
def send_otp_email(to_email: str, otp: str):
    msg = MIMEText(f"Your OTP for password reset is: {otp}")
    msg["Subject"] = "Password Reset OTP"
    if "@" not in settings.EMAIL_FROM:
        msg["From"] = f"{settings.EMAIL_FROM} <{settings.SMTP_USER}>"
    else:
        msg["From"] = settings.EMAIL_FROM
    msg["To"] = to_email

    try:
        if settings.SMTP_PORT == 465:
            server = smtplib.SMTP_SSL(settings.SMTP_HOST, settings.SMTP_PORT, timeout=10)
        else:
            server = smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT, timeout=10)
            server.starttls()
        server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
        server.sendmail(settings.SMTP_USER, to_email, msg.as_string())
        server.quit()
        logger.info(f"Password reset OTP sent successfully to {to_email}")
    except (smtplib.SMTPException, socket.timeout) as e:
        logger.error(f"Failed to send password reset OTP to {to_email}: {e}")
    except Exception as e:
        logger.error(f"An unexpected error occurred while sending email to {to_email}: {e}")

def send_verification_email(to_email: str, token: str):
    # Assuming the backend runs on localhost:8001 based on context
    verification_link = f"http://127.0.0.1:8001/auth/verify-email?token={token}"
    msg = MIMEText(f"Please verify your email by clicking on the following link: {verification_link}")
    msg["Subject"] = "Verify your email"
    if "@" not in settings.EMAIL_FROM:
        msg["From"] = f"{settings.EMAIL_FROM} <{settings.SMTP_USER}>"
    else:
        msg["From"] = settings.EMAIL_FROM
    msg["To"] = to_email

    try:
        if settings.SMTP_PORT == 465:
            server = smtplib.SMTP_SSL(settings.SMTP_HOST, settings.SMTP_PORT, timeout=10)
        else:
            server = smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT, timeout=10)
            server.starttls()
        server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
        server.sendmail(settings.SMTP_USER, to_email, msg.as_string())
        server.quit()
        logger.info(f"Verification email sent successfully to {to_email}")
    except Exception as e:
        logger.error(f"Failed to send verification email to {to_email}: {e}")

# ---------------- SIGNUP ----------------
@router.post("/signup", status_code=status.HTTP_201_CREATED)
def signup(data: SignupSchema, db: Session = Depends(get_db)):
    # check username
    existing_user = db.query(User).filter(User.username == data.username).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already exists")

    # check email
    existing_email = db.query(User).filter(User.email == data.email).first()
    if existing_email:
        raise HTTPException(status_code=400, detail="Email already registered")

    user = User(
        full_name=data.full_name,
        email=data.email,
        username=data.username,
        password_hash=hash_password(data.password),
        is_active=False,  # Set to False initially
        created_at=datetime.utcnow()
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    # Generate verification token
    verification_token = create_access_token(
        data={"sub": user.email, "type": "verification"},
        expires_delta=timedelta(hours=24)
    )
    send_verification_email(user.email, verification_token)

    return {"message": "User created successfully. Please verify your email."}

@router.get("/verify-email")
def verify_email(token: str, db: Session = Depends(get_db)):
    payload = decode_access_token(token)
    if not payload or payload.get("type") != "verification":
        raise HTTPException(status_code=400, detail="Invalid or expired token")
    
    email = payload.get("sub")
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user.is_active = True
    db.commit()
    return {"message": "Email verified successfully. You can now login."}


# ---------------- LOGIN ----------------
@router.post("/login")
def login(data: LoginSchema, db: Session = Depends(get_db)):
    user = db.query(User).filter(
        or_(User.username == data.username, User.email == data.username)
    ).first()

    if not user:
        raise HTTPException(status_code=401, detail="Invalid username or password")

    if not verify_password(data.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid username or password")

    if not user.is_active:
        raise HTTPException(status_code=400, detail="Email not verified. Please check your inbox.")

    token = create_access_token({"sub": user.username,'user_id': user.user_id})

    return {
        "access_token": token,
        "token_type": "bearer",
        "username": user.username,
        "email": user.email,
        "full_name": user.full_name
    }


# ---------------- LOGOUT ----------------
@router.post("/logout", status_code=status.HTTP_200_OK)
def logout():
    """
    Logs out the user. In a stateless JWT architecture, this is mainly a client-side task.
    This endpoint is provided for a complete API.
    """
    return {"status_type": "success", "status": "Logged out successfully"}


# ---------------- FORGOT PASSWORD (SEND OTP) ----------------
@router.post("/forgot-password")
def forgot_password(data: ForgotPasswordSchema, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    otp = generate_otp()
    expires_at = datetime.utcnow() + timedelta(minutes=10)

    # delete old OTPs
    db.query(PasswordResetOTP).filter(PasswordResetOTP.user_id == user.user_id).delete()

    otp_entry = PasswordResetOTP(
        user_id=user.user_id,
        otp=otp,
        expires_at=expires_at
    )

    db.add(otp_entry)
    db.commit()

    send_otp_email(user.email, otp)

    return {"message": "OTP sent to registered email"}


# ---------------- RESET PASSWORD ----------------
@router.post("/reset-password")
def reset_password(data: ResetPasswordSchema, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    otp_row = db.query(PasswordResetOTP).filter(
        PasswordResetOTP.user_id == user.user_id,
        PasswordResetOTP.otp == data.otp,
        PasswordResetOTP.expires_at > datetime.utcnow()
    ).first()

    if not otp_row:
        raise HTTPException(status_code=400, detail="Invalid or expired OTP")

    user.password_hash = hash_password(data.new_password)

    db.delete(otp_row)
    db.commit()

    return {"message": "Password reset successful"}
