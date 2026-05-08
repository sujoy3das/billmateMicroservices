from sqlalchemy import Column, Integer, String, Boolean, DateTime
from datetime import datetime
from database import Base

class User(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True)
    full_name = Column(String(100))
    email = Column(String(100), unique=True)
    username = Column(String(50), unique=True)
    password_hash = Column(String(255))
    # otp=Column(String(6))
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)


class PasswordResetOTP(Base):
    __tablename__ = "passwordresetotp"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer)
    otp = Column(String(255), unique=True)  # Rename 'token' to 'otp'
    expires_at = Column(DateTime)
