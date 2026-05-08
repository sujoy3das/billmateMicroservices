from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from uuid import uuid4
import requests

from database import SessionLocal
from models import Company, Sites
from schemas import CompanyCreateSchema, CompanyOut, SiteOut
from security import get_current_user, security
from company_db_utils import create_company_database, copy_template_tables
from subscription_client import get_allowed_companies

router = APIRouter(prefix="/company", tags=["Company"])

USER_SERVICE_URL = "http://127.0.0.1:8004"


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/create")
def create_company(
    data: CompanyCreateSchema,
    current_user_id: int = Depends(get_current_user),
    db: Session = Depends(get_db),
    token: HTTPAuthorizationCredentials = Depends(security)
):
    allowed = get_allowed_companies(current_user_id)
    used = db.query(Company).filter(Company.owner_user_id == current_user_id).count()

    if used >= allowed:
        raise HTTPException(status_code=403, detail="Company creation limit reached")

    db_name = f"company_{uuid4().hex}"

    create_company_database(db_name)
    copy_template_tables(db_name)

    company = Company(
        owner_user_id=current_user_id,
        company_name=data.company_name,
        company_database_name=db_name
    )

    db.add(company)
    db.commit()
    db.refresh(company)

    # auto-create primary site
    primary_site = Sites(
        company_id=company.company_id,
        site_name="Primary Site",
        is_primary=True
    )

    db.add(primary_site)
    db.commit()
    db.refresh(primary_site)

    # Auto-populate owner role, permissions, and site access via user_services
    try:
        requests.post(
            f"{USER_SERVICE_URL}/user-management/setup-owner",
            json={
                "company_id": company.company_id,
                "user_id": current_user_id,
                "site_id": primary_site.site_id
            },
            headers={"Authorization": f"Bearer {token.credentials}"}
        )
    except Exception as e:
        print(f"Error setting up owner permissions: {e}")

    return {
        "message": "Company created successfully",
        "company_id": company.company_id,
        "company_name": company.company_name
    }

@router.get("/all")
def list_all_companies(
    db: Session = Depends(get_db),
    current_user_id: int = Depends(get_current_user)
):
    companies = db.query(Company).all()

    results = []
    for c in companies:
        primary_site = db.query(Sites).filter(Sites.company_id == c.company_id, Sites.is_primary == True).first()
        site_id = primary_site.site_id if primary_site else None
        results.append({
            "company_id": c.company_id,
            "company_name": c.company_name,
            "owner_user_id": c.owner_user_id,
            "primary_site_id": site_id
        })
    return {"companies": results}

@router.get("/list_companies_for_user")
def list_companies_for_user(
    db: Session = Depends(get_db),
    current_user_id: int = Depends(get_current_user)
):
    companies = db.query(Company).filter(Company.owner_user_id == current_user_id).all()
    
    return {
        "companies": [
            {
                "company_id": c.company_id,
                "company_name": c.company_name,
                "role": "Owner"
            }
            for c in companies
        ]
    }

@router.get("/", response_model=list[CompanyOut])
def list_companies(
    db: Session = Depends(get_db),
    current_user_id: int = Depends(get_current_user)
):
    companies = db.query(Company).filter(Company.owner_user_id == current_user_id).all()
    return companies

@router.get("/{company_id}/sites")
def list_sites(
    company_id: int,
    db: Session = Depends(get_db),
    current_user_id: int = Depends(get_current_user)
):
    sites = db.query(Sites).filter(Sites.company_id == company_id).all()
    return {
        "sites": [
            {"id": s.site_id, "name": s.site_name, "is_primary": s.is_primary}
            for s in sites
        ]
    }