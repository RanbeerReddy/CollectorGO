import uuid
from typing import List

from fastapi import APIRouter
from fastapi import Depends
from fastapi import status
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.models.enums import UserRole
from app.models.user import User
from app.schemas.form_assignment import FormAssignmentCreate
from app.schemas.form_assignment import FormAssignmentResponse
from app.services import form_assignment_service
from app.services.auth_services import AuthService
from app.services.auth_services import require_role

router = APIRouter(
    prefix="/assignments",
    tags=["Assignments"],
)


@router.post(
    "/",
    response_model=FormAssignmentResponse,
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(require_role(UserRole.ADMIN))],
    summary="Assign a form to a user",
)
async def create_assignment(
    assignment_in: FormAssignmentCreate,
    session: AsyncSession = Depends(get_db),
    current_user: User = Depends(AuthService.get_current_user),
):
    """
    Assign a form to a user. Only ADMIN can access.
    """
    return await form_assignment_service.assign_form(
        session=session,
        assignment_in=assignment_in,
        assigned_by_user_id=current_user.id,
    )


@router.get(
    "/",
    response_model=List[FormAssignmentResponse],
    dependencies=[Depends(require_role(UserRole.ADMIN))],
    summary="List all assignments",
)
async def list_all_assignments(
    session: AsyncSession = Depends(get_db),
):
    """
    Get all assignments. Only ADMIN can access.
    """
    return await form_assignment_service.get_all_assignments(session=session)


@router.get(
    "/my",
    response_model=List[FormAssignmentResponse],
    summary="List my assignments",
)
async def list_my_assignments(
    session: AsyncSession = Depends(get_db),
    current_user: User = Depends(AuthService.get_current_user),
):
    """
    Get all forms assigned to the currently authenticated user.
    """
    return await form_assignment_service.get_my_assignments(
        session=session,
        user_id=current_user.id,
    )


@router.patch(
    "/{assignment_id}/complete",
    response_model=FormAssignmentResponse,
    summary="Mark an assignment as completed",
)
async def complete_assignment(
    assignment_id: uuid.UUID,
    session: AsyncSession = Depends(get_db),
    current_user: User = Depends(AuthService.get_current_user),
):
    """
    Mark an assignment as completed. Only the assigned user can do this.
    """
    return await form_assignment_service.complete_assignment(
        session=session,
        assignment_id=assignment_id,
        current_user_id=current_user.id,
    )
