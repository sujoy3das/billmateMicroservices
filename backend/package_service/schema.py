from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List


# -----------------------
# PLAN
# -----------------------

class PlanCreate(BaseModel):
    name: str
    plan_type: str
    price: float
    duration_days: int
    max_companies: int
    max_users: int
    max_sites: int


class PlanOut(BaseModel):
    id: int
    name: str
    plan_type: str
    price: float
    duration_days: int
    max_companies: int
    max_users: int
    max_sites: int
    is_active: bool
    created_at: datetime

    class Config:
        orm_mode = True


# -----------------------
# SUBSCRIPTION
# -----------------------

class SubscriptionCreate(BaseModel):
    plan_id: int


class SubscriptionChangeRequest(BaseModel):
    new_plan_id: int


class SubscriptionOut(BaseModel):
    id: int
    user_id: int
    plan_id: int
    plan_type: str
    start_date: datetime
    end_date: datetime
    status: str
    carried_days: int
    created_at: datetime

    class Config:
        orm_mode = True


# -----------------------
# WALLET
# -----------------------

class WalletOut(BaseModel):
    user_id: int
    balance: float
    updated_at: datetime

    class Config:
        orm_mode = True


# -----------------------
# COUPON
# -----------------------

class CouponCreate(BaseModel):
    code: str
    amount: float
    expiry_date: datetime
    max_redemptions: Optional[int] = 1


class CouponOut(BaseModel):
    id: int
    code: str
    amount: float
    is_active: bool
    expiry_date: datetime
    max_redemptions: int
    created_at: datetime

    class Config:
        orm_mode = True


# -----------------------
# COUPON REDEMPTION
# -----------------------

class CouponRedeemRequest(BaseModel):
    code: str


class CouponRedemptionOut(BaseModel):
    id: int
    user_id: int
    coupon_id: int
    redeemed_at: datetime

    class Config:
        orm_mode = True


# -----------------------
# WALLET TRANSACTION (LEDGER)
# -----------------------

class WalletTransactionOut(BaseModel):
    id: int
    user_id: int
    amount: float
    type: str  # COUPON, SUBSCRIPTION, UPGRADE
    reference_id: int
    created_at: datetime

    class Config:
        orm_mode = True


# -----------------------
# RESPONSE MODELS
# -----------------------

class WalletBalanceResponse(BaseModel):
    message: str
    wallet_balance: float


class SubscriptionResponse(BaseModel):
    message: str
    subscription: SubscriptionOut
    wallet_balance: float


class ChangePlanResponse(BaseModel):
    message: str
    old_subscription_id: int
    new_subscription_id: int
    remaining_days_old_plan: int
    extra_days_added: int
    new_subscription_end_date: datetime
    wallet_balance: float


# -----------------------
# LIST RESPONSES
# -----------------------

class SubscriptionListOut(BaseModel):
    subscriptions: List[SubscriptionOut]


class WalletTransactionListOut(BaseModel):
    transactions: List[WalletTransactionOut]
