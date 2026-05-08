from pydantic import BaseModel, EmailStr
from typing import Optional  # Essential for Python 3.9 compatibility

class SignupSchema(BaseModel):
    full_name: str
    email: EmailStr
    username: str
    password: str

class LoginSchema(BaseModel):
    username: str
    password: str

class ForgotPasswordSchema(BaseModel):
    email: EmailStr  # Removed 'otp: str' as it's not known by the user yet

class ResetPasswordSchema(BaseModel):
    email: EmailStr
    otp: str
    new_password: str

class LoginRequest(BaseModel):
    email: EmailStr
    password: str