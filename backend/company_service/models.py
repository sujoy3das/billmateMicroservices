from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Float, Boolean, TIMESTAMP
from datetime import datetime
from database import Base
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship


class Company(Base):
    __tablename__ = "companies"

    company_id = Column(Integer, primary_key=True, index=True)
    owner_user_id = Column(Integer, nullable=False)
    company_name = Column(String(255), nullable=False, index=True)
    company_database_name = Column(String(255), nullable=False)
    created_at = Column(TIMESTAMP, server_default=func.now())

    sites = relationship("Sites", back_populates="company")

class Sites(Base):
    __tablename__ = "sites"

    site_id = Column(Integer, primary_key=True, index=True)
    company_id = Column(Integer, ForeignKey("companies.company_id"), nullable=False)
    site_name = Column(String(255), nullable=False)
    is_primary = Column(Boolean, default=False)
    created_at = Column(TIMESTAMP, server_default=func.now())

    company = relationship("Company", back_populates="sites")