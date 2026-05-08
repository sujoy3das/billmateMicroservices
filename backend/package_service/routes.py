from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from typing import Optional

import smtplib
from email.mime.text import MIMEText
import socket
import logging

import models
import schema as schemas
from database import get_db
from security import get_current_user, get_current_admin_user
from config import settings

router = APIRouter()
logger = logging.getLogger(__name__)


# -------------------------
# EMAIL UTILITY
# -------------------------

def send_email(to_email: str, subject: str, body: str):
    """Sends an HTML email."""
    msg = MIMEText(body, 'html')
    msg["Subject"] = subject
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
        logger.info(f"Email sent successfully to {to_email}")
    except (smtplib.SMTPException, socket.timeout) as e:
        logger.error(f"Failed to send email to {to_email}: {e}")
    except Exception as e:
        logger.error(f"An unexpected error occurred while sending email to {to_email}: {e}")


# -------------------------
# PLAN ROUTES
# -------------------------

@router.post("/plans", response_model=schemas.PlanOut)
def create_plan(plan: schemas.PlanCreate, db: Session = Depends(get_db), admin_user: models.User = Depends(get_current_admin_user)):
    new_plan = models.Plan(**plan.dict())
    db.add(new_plan)
    db.commit()
    db.refresh(new_plan)
    return new_plan


@router.get("/plans", response_model=list[schemas.PlanOut])
def list_plans(db: Session = Depends(get_db), user_id: int = Depends(get_current_user)):
    return db.query(models.Plan).filter(models.Plan.is_active == True).all()


# -------------------------
# WALLET & COUPON ROUTES
# -------------------------

@router.post("/coupons", response_model=schemas.CouponOut)
def create_coupon(coupon: schemas.CouponCreate, db: Session = Depends(get_db), admin_user: models.User = Depends(get_current_admin_user)):
    """
    Create a new coupon. Only accessible by admin users.
    """
    db_coupon = db.query(models.Coupon).filter(models.Coupon.code == coupon.code).first()
    if db_coupon:
        raise HTTPException(status_code=400, detail="Coupon code already exists")
    new_coupon = models.Coupon(**coupon.dict())
    db.add(new_coupon)
    db.commit()
    db.refresh(new_coupon)
    return new_coupon

@router.post("/wallet/redeem-coupon", response_model=schemas.WalletBalanceResponse)
def redeem_coupon(req: schemas.CouponRedeemRequest, db: Session = Depends(get_db), user_id: int = Depends(get_current_user)):
    coupon = db.query(models.Coupon).filter(
        models.Coupon.code == req.code,
        models.Coupon.is_active == True
    ).first()

    if not coupon:
        raise HTTPException(status_code=400, detail="Invalid coupon")

    if coupon.expiry_date < datetime.utcnow():
        raise HTTPException(status_code=400, detail="Coupon expired")

    used = db.query(models.CouponRedemption).filter(
        models.CouponRedemption.user_id == user_id,
        models.CouponRedemption.coupon_id == coupon.id
    ).first()

    if used:
        raise HTTPException(status_code=400, detail="Coupon already used")

    wallet = db.query(models.Wallet).filter(models.Wallet.user_id == user_id).first()
    if not wallet:
        wallet = models.Wallet(user_id=user_id, balance=0)
        db.add(wallet)

    wallet.balance += coupon.amount
    wallet.updated_at = datetime.utcnow()

    redemption = models.CouponRedemption(user_id=user_id, coupon_id=coupon.id)
    db.add(redemption)

    txn = models.WalletTransaction(
        user_id=user_id,
        amount=coupon.amount,
        type="COUPON",
        reference_id=coupon.id
    )
    db.add(txn)

    db.commit()

    # Send email notification
    user = db.query(models.User).filter(models.User.user_id == user_id).first()
    if user and user.email:
        subject = "Coupon Redeemed Successfully"
        body = f"""
        <p>Hi {user.full_name},</p>

        <p>You have successfully redeemed the coupon '<b>{req.code}</b>'.</p>
        <p>An amount of <b>₹{coupon.amount:.2f}</b> has been credited to your wallet.</p>

        <p>Your new wallet balance is: <b>₹{wallet.balance:.2f}</b>.</p>

        <p>Thanks,<br>
        The BillMate Team</p>
        """
        send_email(user.email, subject, body)


    return {
        "message": "Coupon redeemed successfully",
        "wallet_balance": wallet.balance
    }


@router.get("/wallet", response_model=schemas.WalletOut)
def get_wallet(db: Session = Depends(get_db), user_id: int = Depends(get_current_user)):
    wallet = db.query(models.Wallet).filter(models.Wallet.user_id == user_id).first()
    if not wallet:
        wallet = models.Wallet(user_id=user_id, balance=0.0)
        db.add(wallet)
        db.commit()
        db.refresh(wallet)
    return wallet


# -------------------------
# SUBSCRIPTION ROUTES
# -------------------------

@router.post("/subscribe", response_model=schemas.SubscriptionResponse)
def subscribe(req: schemas.SubscriptionCreate, db: Session = Depends(get_db), user_id: int = Depends(get_current_user)):
    plan = db.query(models.Plan).filter(models.Plan.id == req.plan_id).first()
    if not plan:
        raise HTTPException(status_code=404, detail="Plan not found")

    wallet = db.query(models.Wallet).filter(models.Wallet.user_id == user_id).first()
    if not wallet:
        wallet = models.Wallet(user_id=user_id, balance=0.0)
        db.add(wallet)
        db.commit()
        db.refresh(wallet)

    if wallet.balance < plan.price:
        raise HTTPException(status_code=400, detail="Insufficient wallet balance")

    existing = db.query(models.Subscription).filter(
        models.Subscription.user_id == user_id,
        models.Subscription.plan_type == plan.plan_type,
        models.Subscription.status == "active"
    ).first()

    if existing:
        raise HTTPException(status_code=400, detail="Same plan type already active")

    wallet.balance -= plan.price

    end_date = datetime.utcnow() + timedelta(days=plan.duration_days)

    sub = models.Subscription(
        user_id=user_id,
        plan_id=plan.id,
        plan_type=plan.plan_type,
        start_date=datetime.utcnow(),
        end_date=end_date,
        status="active"
    )

    db.add(sub)

    txn = models.WalletTransaction(
        user_id=user_id,
        amount=-plan.price,
        type="SUBSCRIPTION",
        reference_id=plan.id
    )
    db.add(txn)

    db.commit()
    db.refresh(sub)

    # Send email notification
    user = db.query(models.User).filter(models.User.user_id == user_id).first()
    if user and user.email:
        subject = "Subscription Activated"
        body = f"""
        <p>Hi {user.full_name},</p>

        <p>Your subscription to the '<b>{plan.name}</b>' plan has been successfully activated.</p>
        
        <h3>Plan Details:</h3>
        <ul>
            <li><b>Plan:</b> {plan.name}</li>
            <li><b>Type:</b> {plan.plan_type}</li>
            <li><b>Price:</b> ₹{plan.price:.2f}</li>
            <li><b>Duration:</b> {plan.duration_days} days</li>
            <li><b>Max Companies:</b> {plan.max_companies}</li>
            <li><b>Max Users:</b> {plan.max_users}</li>
            <li><b>Max Sites:</b> {plan.max_sites}</li>
            <li><b>End Date:</b> {sub.end_date.strftime('%Y-%m-%d')}</li>
        </ul>

        <p>Your wallet has been debited by ₹{plan.price:.2f}.</p>
        <p>Your new wallet balance is: <b>₹{wallet.balance:.2f}</b>.</p>

        <p>Thanks,<br>
        The BillMate Team</p>
        """
        send_email(user.email, subject, body)

    return {
        "message": "Subscription activated",
        "subscription": sub,
        "wallet_balance": wallet.balance
    }


# -------------------------
# CHANGE PLAN (PRORATED)
# -------------------------

@router.post("/change-plan", response_model=schemas.ChangePlanResponse)
def change_plan(req: schemas.SubscriptionChangeRequest, db: Session = Depends(get_db), user_id: int = Depends(get_current_user)):
    new_plan = db.query(models.Plan).filter(models.Plan.id == req.new_plan_id).first()
    if not new_plan:
        raise HTTPException(status_code=404, detail="New plan not found")

    current_sub = db.query(models.Subscription).filter(
        models.Subscription.user_id == user_id,
        models.Subscription.plan_type == new_plan.plan_type,
        models.Subscription.status == "active"
    ).first()

    if not current_sub:
        raise HTTPException(status_code=400, detail="No active plan of this type")

    old_plan = db.query(models.Plan).filter(models.Plan.id == current_sub.plan_id).first()
    wallet = db.query(models.Wallet).filter(models.Wallet.user_id == user_id).first()
    if not wallet:
        wallet = models.Wallet(user_id=user_id, balance=0.0)
        db.add(wallet)
        db.commit()
        db.refresh(wallet)

    now = datetime.utcnow()
    remaining_days = (current_sub.end_date - now).days
    if remaining_days < 0:
        remaining_days = 0

    old_daily_price = old_plan.price / old_plan.duration_days
    remaining_value = remaining_days * old_daily_price

    new_daily_price = new_plan.price / new_plan.duration_days
    extra_days = int(remaining_value / new_daily_price)

    # wallet charge if upgrading
    if new_plan.price > old_plan.price:
        diff = new_plan.price - old_plan.price
        if wallet.balance < diff:
            raise HTTPException(status_code=400, detail="Insufficient wallet balance for upgrade")
        wallet.balance -= diff

        txn = models.WalletTransaction(
            user_id=user_id,
            amount=-diff,
            type="UPGRADE",
            reference_id=new_plan.id
        )
        db.add(txn)

    # close old subscription
    current_sub.status = "upgraded" if new_plan.price > old_plan.price else "downgraded"

    total_days = new_plan.duration_days + extra_days
    new_end_date = now + timedelta(days=total_days)

    new_sub = models.Subscription(
        user_id=user_id,
        plan_id=new_plan.id,
        plan_type=new_plan.plan_type,
        start_date=now,
        end_date=new_end_date,
        carried_days=extra_days,
        status="active"
    )

    db.add(new_sub)
    db.commit()

    # Send email notification
    user = db.query(models.User).filter(models.User.user_id == user_id).first()
    if user and user.email:
        change_type = "upgraded" if new_plan.price > old_plan.price else "downgraded"
        subject = f"Plan Successfully {change_type.capitalize()}"
        
        wallet_charge_info = ""
        if new_plan.price > old_plan.price:
            diff = new_plan.price - old_plan.price
            wallet_charge_info = f"<p>Your wallet has been charged an upgrade fee of <b>₹{diff:.2f}</b>.</p>"

        body = f"""
        <p>Hi {user.full_name},</p>

        <p>You have successfully {change_type} your plan from '<b>{old_plan.name}</b>' to '<b>{new_plan.name}</b>'.</p>

        <h3>New Plan Details:</h3>
        <ul>
            <li><b>Plan:</b> {new_plan.name}</li>
            <li><b>Max Companies:</b> {new_plan.max_companies}</li>
            <li><b>Max Users:</b> {new_plan.max_users}</li>
            <li><b>Max Sites:</b> {new_plan.max_sites}</li>
            <li><b>New End Date:</b> {new_end_date.strftime('%Y-%m-%d')}</li>
            <li><b>Extra days added (from old plan):</b> {extra_days}</li>
        </ul>

        {wallet_charge_info}
        <p>Your current wallet balance is: <b>₹{wallet.balance:.2f}</b>.</p>

        <p>Thanks,<br>The BillMate Team</p>
        """
        send_email(user.email, subject, body)

    return {
        "message": "Plan changed successfully",
        "old_subscription_id": current_sub.id,
        "new_subscription_id": new_sub.id,
        "remaining_days_old_plan": remaining_days,
        "extra_days_added": extra_days,
        "new_subscription_end_date": new_end_date,
        "wallet_balance": wallet.balance
    }


# -------------------------
# LIST SUBSCRIPTIONS
# -------------------------

@router.get("/subscriptions", response_model=schemas.SubscriptionListOut)
def list_user_subscriptions(db: Session = Depends(get_db), user_id: int = Depends(get_current_user)):
    subs = db.query(models.Subscription).filter(
        models.Subscription.user_id == user_id
    ).all()

    return {"subscriptions": subs}


@router.get("/check-limit")
def check_limit(user_id: int, db: Session = Depends(get_db)):
    sub = db.query(models.Subscription).filter(
        models.Subscription.user_id == user_id,
        models.Subscription.status == "active",
        models.Subscription.end_date > datetime.utcnow()
    ).first()

    limit = 0
    if sub:
        plan = db.query(models.Plan).filter(models.Plan.id == sub.plan_id).first()
        if plan:
            limit = plan.max_companies

    return {"allowed_companies": limit}

# -------------------------
# WALLET LEDGER
# -------------------------

@router.get("/wallet-transactions", response_model=schemas.WalletTransactionListOut)
def wallet_transactions(
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user)
):
    query = db.query(models.WalletTransaction).filter(
        models.WalletTransaction.user_id == user_id
    )
    if start_date:
        query = query.filter(models.WalletTransaction.created_at >= start_date)
    if end_date:
        query = query.filter(models.WalletTransaction.created_at <= end_date)

    txns = query.order_by(models.WalletTransaction.created_at.desc()).all()

    return {"transactions": txns}
