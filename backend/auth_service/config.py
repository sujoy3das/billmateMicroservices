from pydantic import BaseSettings


class Settings(BaseSettings):
    # App
    APP_NAME: str
    ENV: str
    DEBUG: bool

    # DB
    DB_USER: str
    DB_PASSWORD: str
    DB_HOST: str
    DB_PORT: int
    DB_NAME: str

    # JWT
    SECRET_KEY: str
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    # Email
    SMTP_HOST: str
    SMTP_PORT: int
    SMTP_USER: str
    SMTP_PASSWORD: str
    EMAIL_FROM: str

    # API
    API_PREFIX: str

    class Config:
        env_file = ".env"

settings = Settings()
