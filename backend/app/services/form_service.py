import uuid
from collections.abc import Sequence

from fastapi import HTTPException
from fastapi import status
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.form import Form
from app.repositories import form_repository
from app.schemas.form import FormCreate
from app.schemas.form import FormUpdate


async def create_form(session: AsyncSession, form_in: FormCreate) -> Form:
    form_data = form_in.model_dump()
    return await form_repository.create(session, form_data)


async def get_forms(session: AsyncSession) -> Sequence[Form]:
    return await form_repository.get_all_active(session)


async def get_form(session: AsyncSession, form_id: uuid.UUID) -> Form:
    form = await form_repository.get_by_id(session, form_id)
    if not form or not form.is_active:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Form not found",
        )
    return form


async def update_form(session: AsyncSession, form_id: uuid.UUID, form_in: FormUpdate) -> Form:
    form = await get_form(session, form_id)
    update_data = form_in.model_dump(exclude_unset=True)
    return await form_repository.update(session, form, update_data)


async def delete_form(session: AsyncSession, form_id: uuid.UUID) -> Form:
    form = await get_form(session, form_id)
    return await form_repository.update(session, form, {"is_active": False})
