from pydantic import BaseModel
from typing import List


class RoleCreate(BaseModel):
    role_name: str


class PermissionCreate(BaseModel):
    module_id: int
    can_view: bool
    can_create: bool
    can_edit: bool
    can_delete: bool


class AssignRoleSchema(BaseModel):
    user_id: int
    role_id: int


class AssignSiteSchema(BaseModel):
    user_id: int
    site_ids: List[int]

class UserPermissionsUpdate(BaseModel):
    user_id: int
    role_id: int
    company_id: int
    site_ids: List[int]

class SiteRoleAssignment(BaseModel):
    site_id: int
    role_ids: List[int]

class AddUserToCompanySchema(BaseModel):
    user_id: int
    site_roles: List[SiteRoleAssignment]

class SetupOwnerSchema(BaseModel):
    company_id: int
    user_id: int
    site_id: int

class ModuleCreate(BaseModel):
    module_name: str
