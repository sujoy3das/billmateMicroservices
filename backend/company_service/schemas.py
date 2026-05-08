from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List
class CompanyCreateSchema(BaseModel):
    company_name: str

class SiteOut(BaseModel):
    site_id: int
    site_name: str
    is_primary: bool

    class Config:
        orm_mode = True

class CompanyOut(BaseModel):
    company_id: int
    company_name: str
    company_database_name: str
    created_at: datetime
    sites: List[SiteOut] = []

    class Config:
        orm_mode = True

        