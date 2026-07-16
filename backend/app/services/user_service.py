from fastapi import HTTPException
from fastapi import status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import get_password_hash
from app.models.user import User
from app.repositories import user_repository
from app.schemas.user import UserCreate


async def create_user(session: AsyncSession, user_in: UserCreate) -> User:
    # Check if username exists
    existing_user = await user_repository.get_by_username(session, user_in.username)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already registered",
        )

    # Check if email exists
    existing_email = await user_repository.get_by_email(session, user_in.email)
    if existing_email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )

    # Prepare user data
    user_data = user_in.model_dump()
    password = user_data.pop("password")
    user_data["password_hash"] = get_password_hash(password)

    # Create user
    return await user_repository.create(session, user_data)
