from sqlalchemy.orm import DeclarativeBase

from app.models.base import Base
from app.models.user import User


class Base(DeclarativeBase):
    pass


__all__ = [
    "Base",
    "User",
]