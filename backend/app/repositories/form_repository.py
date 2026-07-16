import uuid
from collections.abc import Sequence

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.form import Form


async def get_by_id(session: AsyncSession, form_id: uuid.UUID) -> Form | None:
    stmt = select(Form).where(Form.id == form_id)
    result = await session.execute(stmt)
    return result.scalar_one_or_none()


async def get_all_active(session: AsyncSession) -> Sequence[Form]:
    stmt = select(Form).where(Form.is_active == True)
    result = await session.execute(stmt)
    return result.scalars().all()


async def create(session: AsyncSession, form_data: dict) -> Form:
    form = Form(**form_data)
    session.add(form)
    await session.commit()
    await session.refresh(form)
    return form


async def update(session: AsyncSession, form: Form, update_data: dict) -> Form:
    for key, value in update_data.items():
        setattr(form, key, value)
    await session.commit()
    await session.refresh(form)
    return form
