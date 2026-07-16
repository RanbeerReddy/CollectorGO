from fastapi import APIRouter
from fastapi import Depends
from fastapi import status
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.schemas.user import UserCreate
from app.schemas.user import UserResponse
from app.services import user_service

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
