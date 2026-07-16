import uuid
from typing import List

from fastapi import APIRouter
from fastapi import Depends
from fastapi import status
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.models.enums import UserRole
from app.schemas.form import FormCreate
from app.schemas.form import FormResponse
from app.schemas.form import FormUpdate
from app.services import form_service
from app.services.auth_services import AuthService
from app.services.auth_services import require_role

router = APIRouter(
    prefix="/forms",
    tags=["Forms"],
)


@router.post(
    "/",
    response_model=FormResponse,
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(require_role(UserRole.ADMIN))],
    summary="Create a new form",
)
async def create_form(
    form_in: FormCreate,
    session: AsyncSession = Depends(get_db),
):
    """
    Create a new form. Only ADMIN can access.
    """
    return await form_service.create_form(session=session, form_in=form_in)


@router.get(
    "/",
    response_model=List[FormResponse],
    dependencies=[Depends(AuthService.get_current_user)],
    summary="List all active forms",
)
async def list_forms(
    session: AsyncSession = Depends(get_db),
):
    """
    Get all active forms. Authenticated users can access.
    """
    return await form_service.get_forms(session=session)


@router.get(
    "/{form_id}",
    response_model=FormResponse,
    dependencies=[Depends(AuthService.get_current_user)],
    summary="Get a form by ID",
)
async def get_form(
    form_id: uuid.UUID,
    session: AsyncSession = Depends(get_db),
):
    """
    Get a specific form by ID. Authenticated users can access.
    """
    return await form_service.get_form(session=session, form_id=form_id)


@router.put(
    "/{form_id}",
    response_model=FormResponse,
    dependencies=[Depends(require_role(UserRole.ADMIN))],
    summary="Update a form",
)
async def update_form(
    form_id: uuid.UUID,
    form_in: FormUpdate,
    session: AsyncSession = Depends(get_db),
):
    """
    Update a specific form. Only ADMIN can access.
    """
    return await form_service.update_form(session=session, form_id=form_id, form_in=form_in)


@router.delete(
    "/{form_id}",
    response_model=FormResponse,
    dependencies=[Depends(require_role(UserRole.ADMIN))],
    summary="Soft delete a form",
)
async def delete_form(
    form_id: uuid.UUID,
    session: AsyncSession = Depends(get_db),
):
    """
    Soft delete a specific form. Only ADMIN can access.
    """
    return await form_service.delete_form(session=session, form_id=form_id)
