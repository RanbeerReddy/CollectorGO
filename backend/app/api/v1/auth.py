from fastapi import APIRouter
from fastapi import HTTPException

from app.schemas.auth import LoginRequest
from app.schemas.auth import TokenResponse
from app.services.auth_services import AuthService

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)

@router.post("/login", response_model=TokenResponse)
async def login(
    request: LoginRequest,
):
    token = AuthService.login(
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