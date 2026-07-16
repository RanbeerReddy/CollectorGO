from typing import List

from fastapi import APIRouter
from fastapi import Depends
from fastapi import status
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.models.enums import UserRole
from app.schemas.user import UserCreate
from app.schemas.user import UserResponse
from app.services import user_service
from app.services.auth_services import require_role

router = APIRouter()


@router.post(
    "/",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Create new user",
)
async def create_user(
    user_in: UserCreate,
    session: AsyncSession = Depends(get_db),
):
    """
    Create a new user.
    """
    return await user_service.create_user(session=session, user_in=user_in)


@router.get(
    "/",
    response_model=List[UserResponse],
    dependencies=[Depends(require_role(UserRole.ADMIN, UserRole.SUPERVISOR))],
    summary="List all users",
)
async def list_users(
    session: AsyncSession = Depends(get_db),
):
    """
    Get all users. Only ADMIN can access.
    """
    return await user_service.get_users(session=session)

