from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
import requests

from database import get_db
from models import Module, Role, RolePermission, UserCompanyRole, UserSiteAccess, User
from schemas import RoleCreate, PermissionCreate, AssignRoleSchema, AssignSiteSchema, UserPermissionsUpdate, AddUserToCompanySchema, SetupOwnerSchema, ModuleCreate
from security import get_current_user, security

router = APIRouter(tags=["User Management"])


# Create Role
@router.post("/user-management/roles")
def create_role(
    data: RoleCreate,
    company_id: int,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    role = Role(company_id=company_id, role_name=data.role_name)
    db.add(role)
    db.commit()
    return {"message": "Role created"}


@router.get("/user-management/roles")
def list_roles(
    company_id: int = None,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    query = db.query(Role)
    if company_id:
        query = query.filter(Role.company_id == company_id)
    roles = query.all()
    return [{"id": r.role_id, "name": r.role_name} for r in roles]


# Set Role Permissions
@router.post("/user-management/roles/{role_id}/permissions")
def set_permissions(
    role_id: int,
    permissions: list[PermissionCreate],
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    role = db.query(Role).filter(Role.role_id == role_id).first()
    if not role:
        raise HTTPException(status_code=404, detail="Role not found")

    if role.role_name == "Owner":
        raise HTTPException(status_code=403, detail="Owner permissions cannot be modified")

    db.query(RolePermission).filter(RolePermission.role_id == role_id).delete()

    for perm in permissions:
        rp = RolePermission(role_id=role_id, **perm.dict())
        db.add(rp)

    db.commit()
    return {"message": "Permissions updated"}


# Assign role to user
@router.post("/user-management/assign-role")
def assign_role(
    data: AssignRoleSchema,
    company_id: int,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    role = db.query(Role).filter(Role.role_id == data.role_id).first()
    if not role:
        raise HTTPException(status_code=404, detail="Role not found")

    if role.role_name == "Owner":
        raise HTTPException(status_code=403, detail="Owner role cannot be assigned to other users")

    mapping = UserCompanyRole(
        user_id=data.user_id,
        company_id=company_id,
        role_id=data.role_id
    )
    db.add(mapping)
    db.commit()
    return {"message": "Role assigned"}


# Assign site access
@router.post("/user-management/assign-sites")
def assign_sites(
    data: AssignSiteSchema,
    company_id: int,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    db.query(UserSiteAccess).filter(
        UserSiteAccess.user_id == data.user_id,
        UserSiteAccess.company_id == company_id
    ).delete()

    for site_id in data.site_ids:
        sa = UserSiteAccess(
            user_id=data.user_id,
            company_id=company_id,
            site_id=site_id
        )
        db.add(sa)

    db.commit()
    return {"message": "Site access updated"}


@router.get("/user-management/users")
def search_users(
    email: str = None,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    query = db.query(User)
    if email:
        query = query.filter(User.email == email)
    
    users = query.all()
    return [{"id": u.user_id, "email": u.email, "full_name": u.full_name} for u in users]


@router.post("/user-management/user/permissions")
def update_user_permissions(
    data: UserPermissionsUpdate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    role = db.query(Role).filter(Role.role_id == data.role_id).first()
    if not role:
        raise HTTPException(status_code=404, detail="Role not found")

    if role.role_name == "Owner":
        raise HTTPException(status_code=403, detail="Owner role cannot be assigned to other users")

    # 1. Assign Role
    # Remove existing role for this company
    db.query(UserCompanyRole).filter(
        UserCompanyRole.user_id == data.user_id,
        UserCompanyRole.company_id == data.company_id
    ).delete()
    
    db.add(UserCompanyRole(user_id=data.user_id, company_id=data.company_id, role_id=data.role_id))

    # 2. Assign Sites
    db.query(UserSiteAccess).filter(
        UserSiteAccess.user_id == data.user_id,
        UserSiteAccess.company_id == data.company_id
    ).delete()

    for site_id in data.site_ids:
        db.add(UserSiteAccess(user_id=data.user_id, company_id=data.company_id, site_id=site_id))

    db.commit()
    return {"message": "User permissions updated"}

@router.get("/users/search")
def search_users_v2(
    email: str = None,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    query = db.query(User)
    if email:
        query = query.filter(User.email.ilike(f"%{email}%"))
    
    users = query.all()
    return {"users": [{"id": u.user_id, "email": u.email, "full_name": u.full_name} for u in users]}

@router.get("/company/{company_id}/roles")
def get_company_roles(
    company_id: int,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    roles = db.query(Role).filter(Role.company_id == company_id).all()

    roles_data = []
    for r in roles:
        permissions = db.query(RolePermission).filter(RolePermission.role_id == r.role_id).all()
        perms_data = [{
            "module_id": p.module_id,
            "can_view": p.can_view,
            "can_create": p.can_create,
            "can_edit": p.can_edit,
            "can_delete": p.can_delete
        } for p in permissions]
        roles_data.append({"id": r.role_id, "name": r.role_name, "permissions": perms_data})
    return {"roles": roles_data}

@router.post("/company/{company_id}/add_user")
def add_user_to_company(
    company_id: int,
    data: AddUserToCompanySchema,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    # Validate roles first
    all_role_ids = [r_id for item in data.site_roles for r_id in item.role_ids]
    if all_role_ids:
        roles = db.query(Role).filter(Role.role_id.in_(all_role_ids)).all()
        for role in roles:
            if role.role_name == "Owner":
                raise HTTPException(status_code=403, detail="Owner role cannot be assigned to other users")

    # 1. Clear existing Site Access/Roles for this user in this company
    db.query(UserSiteAccess).filter(
        UserSiteAccess.user_id == data.user_id, 
        UserSiteAccess.company_id == company_id
    ).delete()

    # 2. Assign new Site Roles
    for item in data.site_roles:
        for role_id in item.role_ids:
            db.add(UserSiteAccess(user_id=data.user_id, company_id=company_id, site_id=item.site_id, role_id=role_id))

    db.commit()
    return {"message": "User added to company successfully"}

@router.get("/company/{company_id}/user/{user_id}/permissions")
def get_user_company_permissions(
    company_id: int,
    user_id: int,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    # Get Site Access entries
    user_sites = db.query(UserSiteAccess).filter(
        UserSiteAccess.user_id == user_id,
        UserSiteAccess.company_id == company_id
    ).all()
    
    # Group roles by site
    site_roles_map = {}
    for us in user_sites:
        if us.site_id not in site_roles_map:
            site_roles_map[us.site_id] = []
        if us.role_id:
            site_roles_map[us.site_id].append(us.role_id)

    return {"site_roles": site_roles_map}

@router.get("/company/{company_id}/users")
def get_company_users(
    company_id: int,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    # Join User, UserSiteAccess, and Role to get all users and their roles for a company
    results = db.query(
        User,
        Role.role_name
    ).join(
        UserSiteAccess, User.user_id == UserSiteAccess.user_id
    ).join(
        Role, UserSiteAccess.role_id == Role.role_id
    ).filter(
        UserSiteAccess.company_id == company_id
    ).all()

    # Group roles by user
    users_map = {}
    for user_obj, role_name in results:
        if user_obj.user_id not in users_map:
            users_map[user_obj.user_id] = {
                "user_id": user_obj.user_id,
                "full_name": user_obj.full_name,
                "email": user_obj.email,
                "roles": []
            }
        users_map[user_obj.user_id]["roles"].append(role_name)
    
    # Also include the Owner if they aren't in UserSiteAccess (though they should be)
    # or just to ensure they appear even if they haven't assigned themselves to a site explicitly yet
    owner_role = db.query(UserCompanyRole, User, Role).join(User, User.user_id == UserCompanyRole.user_id).join(Role, Role.role_id == UserCompanyRole.role_id).filter(UserCompanyRole.company_id == company_id, Role.role_name == "Owner").first()
    if owner_role:
        ucr, u, r = owner_role
        if u.user_id not in users_map:
             users_map[u.user_id] = {"user_id": u.user_id, "full_name": u.full_name, "email": u.email, "roles": ["Owner"]}
        elif "Owner" not in users_map[u.user_id]["roles"]:
             users_map[u.user_id]["roles"].append("Owner")

    # Deduplicate roles
    for uid in users_map:
        users_map[uid]["roles"] = list(set(users_map[uid]["roles"]))
        
    return {"users": list(users_map.values())}

@router.delete("/company/{company_id}/user/{user_id}")
def remove_user_from_company(
    company_id: int,
    user_id: int,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    # Business Rule: Prevent Owner from being removed.
    user_to_remove_roles = db.query(Role).join(UserCompanyRole).filter(UserCompanyRole.user_id == user_id, UserCompanyRole.company_id == company_id).all()
    if any(role.role_name == "Owner" for role in user_to_remove_roles):
        raise HTTPException(status_code=403, detail="Cannot remove the company owner. Please transfer ownership first.")

    db.query(UserCompanyRole).filter(
        UserCompanyRole.user_id == user_id,
        UserCompanyRole.company_id == company_id
    ).delete()
    
    db.query(UserSiteAccess).filter(
        UserSiteAccess.user_id == user_id,
        UserSiteAccess.company_id == company_id
    ).delete()
    
    db.commit()
    return {"message": "User removed from company"}

@router.get("/user-management/modules")
def get_modules(db: Session = Depends(get_db), user=Depends(get_current_user)):
    modules = db.query(Module).all()
    return [{"module_id": m.module_id, "module_name": m.module_name} for m in modules]

@router.post("/user-management/modules")
def create_module(
    data: ModuleCreate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    if db.query(Module).filter(Module.module_name == data.module_name).first():
        raise HTTPException(status_code=400, detail="Module already exists")

    module = Module(module_name=data.module_name)
    db.add(module)
    db.commit()
    db.refresh(module)

    # Auto-assign full permissions to all existing Owner roles
    owner_roles = db.query(Role).filter(Role.role_name == "Owner").all()
    for role in owner_roles:
        db.add(RolePermission(
            role_id=role.role_id,
            module_id=module.module_id,
            can_view=True, can_create=True, can_edit=True, can_delete=True
        ))
    
    db.commit()
    return {"message": "Module created and assigned to Owners", "module_id": module.module_id}

@router.post("/user-management/setup-owner")
def setup_owner(
    data: SetupOwnerSchema,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    # 1. Create Owner Role
    owner_role = Role(company_id=data.company_id, role_name="Owner")
    db.add(owner_role)
    db.commit()
    db.refresh(owner_role)

    # 2. Get all modules
    modules = db.query(Module).all()

    # 3. Assign all permissions to Owner role
    for module in modules:
        perm = RolePermission(
            role_id=owner_role.role_id,
            module_id=module.module_id,
            can_view=True,
            can_create=True,
            can_edit=True,
            can_delete=True
        )
        db.add(perm)
    
    # 4. Assign role to user
    user_role = UserCompanyRole(
        user_id=data.user_id,
        company_id=data.company_id,
        role_id=owner_role.role_id
    )
    db.add(user_role)

    # 5. Assign site access (Owner gets access to primary site with Owner role)
    user_site = UserSiteAccess(
        user_id=data.user_id,
        company_id=data.company_id,
        site_id=data.site_id,
        role_id=owner_role.role_id
    )
    db.add(user_site)

    db.commit()
    return {"message": "Owner setup complete"}


COMPANY_SERVICE_URL = "http://127.0.0.1:8003"

@router.post("/user-management/fix-missing-owners")
def fix_missing_owners(
    db: Session = Depends(get_db),
    token: HTTPAuthorizationCredentials = Depends(security),
    user=Depends(get_current_user)
):
    # 1. Get all companies from company_service
    try:
        response = requests.get(
            f"{COMPANY_SERVICE_URL}/company/all",
            headers={"Authorization": f"Bearer {token.credentials}"}
        )
        response.raise_for_status()
        companies = response.json().get("companies", [])
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Could not fetch companies: {e}")

    fixed_companies = []
    for company_data in companies:
        company_id = company_data.get("company_id")
        owner_user_id = company_data.get("owner_user_id")
        primary_site_id = company_data.get("primary_site_id")

        if not all([company_id, owner_user_id, primary_site_id]):
            continue

        # 2. Check if an "Owner" role already exists for this company
        owner_role_exists = db.query(Role).filter(Role.company_id == company_id, Role.role_name == "Owner").first()

        if not owner_role_exists:
            # 3. If not, call setup_owner logic
            setup_data = SetupOwnerSchema(company_id=company_id, user_id=owner_user_id, site_id=primary_site_id)
            setup_owner(data=setup_data, db=db, user=user)
            fixed_companies.append(company_id)

    return {"message": "Owner fix process complete.", "fixed_companies_count": len(fixed_companies), "fixed_company_ids": fixed_companies}
