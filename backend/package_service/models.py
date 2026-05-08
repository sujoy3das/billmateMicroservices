from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Float, Boolean, UniqueConstraint
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
    is_admin = Column(Boolean, default=False, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)


class Plan(Base):
    __tablename__ = "plans"

    id = Column(Integer, primary_key=True)
    name = Column(String(100))                 # e.g. "Basic Monthly"
    plan_type = Column(String(50))            # e.g. "BASIC", "SMS", "STORAGE"
    price = Column(Float)                 # wallet cost
    duration_days = Column(Integer)       # 30, 365
    max_companies = Column(Integer, default=0)
    max_users = Column(Integer, default=0)
    max_sites = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)


class Subscription(Base):
    __tablename__ = "subscriptions"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, index=True)
    plan_id = Column(Integer, ForeignKey("plans.id"))
    plan_type = Column(String(50))

    start_date = Column(DateTime, default=datetime.utcnow)
    end_date = Column(DateTime)

    status = Column(String(20), default="active")
    # active, expired, cancelled, upgraded, downgraded

    carried_days = Column(Integer, default=0)  # from proration
    created_at = Column(DateTime, default=datetime.utcnow)


class Wallet(Base):
    __tablename__ = "wallets"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, unique=True)
    balance = Column(Float, default=0.0)
    updated_at = Column(DateTime, default=datetime.utcnow)

class Coupon(Base):
    __tablename__ = "coupons"

    id = Column(Integer, primary_key=True)
    code = Column(String(50), unique=True)          # e.g. FREE100
    amount = Column(Float)                      # wallet credit
    is_active = Column(Boolean, default=True)
    expiry_date = Column(DateTime)
    max_redemptions = Column(Integer, default=1)  # optional global limit
    created_at = Column(DateTime, default=datetime.utcnow)


class CouponRedemption(Base):
    __tablename__ = "coupon_redemptions"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer)
    coupon_id = Column(Integer, ForeignKey("coupons.id"))
    redeemed_at = Column(DateTime, default=datetime.utcnow)

    __table_args__ = (
        UniqueConstraint("user_id", "coupon_id", name="uq_user_coupon"),
    )


class WalletTransaction(Base):
    __tablename__ = "wallet_transactions"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer)
    amount = Column(Float)  # +credit / -debit
    type = Column(String(50))   # COUPON, SUBSCRIPTION, UPGRADE
    reference_id = Column(Integer)  # subscription_id or coupon_id
    created_at = Column(DateTime, default=datetime.utcnow)
