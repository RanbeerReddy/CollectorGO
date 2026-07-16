from pydantic import BaseModel
from pydantic import ConfigDict
from pydantic import EmailStr
from pydantic import Field
import uuid

from app.models.enums import UserRole


class UserCreate(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    email: EmailStr
    full_name: str = Field(..., max_length=255)
    password: str = Field(..., min_length=8)
    role: UserRole = UserRole.FIELD_WORKER
    organization_id: uuid.UUID


class UserResponse(BaseModel):
    id: uuid.UUID
    username: str
    email: str
    full_name: str
    role: UserRole
    organization_id: uuid.UUID
    is_active: bool
    is_superuser: bool

    model_config = ConfigDict(from_attributes=True)
