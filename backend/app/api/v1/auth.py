from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.models.user import User
from app.schemas.auth import LoginRequest
from app.schemas.auth import TokenResponse
from app.schemas.user import UserResponse
from app.services.auth_services import AuthService

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)

@router.post("/login", response_model=TokenResponse)
async def login(
    request: LoginRequest,
    session: AsyncSession = Depends(get_db),
):
    token = await AuthService.login(
        session,
        request.username,
        request.password,
    )

    if token is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials",
        )

    return TokenResponse(
        access_token=token
    )

@router.get("/me", response_model=UserResponse)
async def read_users_me(
    current_user: User = Depends(AuthService.get_current_user)
):
    return current_user