from fastapi import Depends
from fastapi import HTTPException
from fastapi import status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import create_access_token
from app.core.security import decode_access_token
from app.core.security import oauth2_scheme
from app.db.session import get_db
from app.models.enums import UserRole
from app.models.user import User
from app.repositories import user_repository
from app.utils.password import verify_password


class AuthService:

    @staticmethod
    async def login(
        session: AsyncSession,
        username: str,
        password: str,
    ) -> str | None:
        user = await user_repository.get_by_username(session, username)
        
        if not user:
            return None

        if not verify_password(password, user.password_hash):
            return None
            
        if not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Inactive user",
            )

        token = create_access_token(user.username)
        return token

    @staticmethod
    async def get_current_user(
        token: str = Depends(oauth2_scheme),
        session: AsyncSession = Depends(get_db),
    ) -> User:
        username = decode_access_token(token)
        if not username:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid or expired token",
                headers={"WWW-Authenticate": "Bearer"},
            )
            
        user = await user_repository.get_by_username(session, username)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User not found",
                headers={"WWW-Authenticate": "Bearer"},
            )
            
        if not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Inactive user",
            )
            
        return user


def require_role(*required_roles: UserRole):
    def role_checker(
        current_user: User = Depends(AuthService.get_current_user),
    ) -> User:
        if current_user.role not in required_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not enough permissions",
            )
        return current_user

    return role_checker