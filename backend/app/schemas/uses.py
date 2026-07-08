from uuid import UUID

from pydantic import BaseModel
from pydantic import ConfigDict

from app.models.enums import UserRole


class UserCreate(BaseModel):
    username: str
    email: str
    full_name: str
    password: str


class UserResponse(BaseModel):
    id: UUID
    username: str
    email: str
    full_name: str
    role: UserRole
    is_active: bool

    model_config = ConfigDict(
        from_attributes=True
    )