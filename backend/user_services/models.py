from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from database import Base


class Role(Base):
    __tablename__ = "roles"
    role_id = Column(Integer, primary_key=True)
    company_id = Column(Integer, nullable=False)
    role_name = Column(String(100), nullable=False)


class Module(Base):
    __tablename__ = "modules"
    module_id = Column(Integer, primary_key=True)
    module_name = Column(String(100), nullable=False)


class RolePermission(Base):
    __tablename__ = "role_permissions"
    id = Column(Integer, primary_key=True)
    role_id = Column(Integer, ForeignKey("roles.role_id"))
    module_id = Column(Integer, ForeignKey("modules.module_id"))
    can_view = Column(Boolean, default=False)
    can_create = Column(Boolean, default=False)
    can_edit = Column(Boolean, default=False)
    can_delete = Column(Boolean, default=False)


class UserCompanyRole(Base):
    __tablename__ = "user_company_roles"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer)
    company_id = Column(Integer)
    role_id = Column(Integer)


class UserSiteAccess(Base):
    __tablename__ = "user_site_access"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer)
    company_id = Column(Integer)
    site_id = Column(Integer)
    role_id = Column(Integer)

class User(Base):
    __tablename__ = "users"
    user_id = Column(Integer, primary_key=True)
    email = Column(String(100))
    full_name = Column(String(100))
