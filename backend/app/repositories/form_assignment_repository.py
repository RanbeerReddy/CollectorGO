import uuid
from collections.abc import Sequence

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.form_assignment import FormAssignment


async def get_by_id(session: AsyncSession, assignment_id: uuid.UUID) -> FormAssignment | None:
    stmt = select(FormAssignment).where(FormAssignment.id == assignment_id)
    result = await session.execute(stmt)
    return result.scalar_one_or_none()


async def get_all(session: AsyncSession) -> Sequence[FormAssignment]:
    stmt = select(FormAssignment)
    result = await session.execute(stmt)
    return result.scalars().all()


async def get_by_user_id(session: AsyncSession, user_id: uuid.UUID) -> Sequence[FormAssignment]:
    stmt = select(FormAssignment).where(FormAssignment.user_id == user_id)
    result = await session.execute(stmt)
    return result.scalars().all()


async def create(session: AsyncSession, assignment_data: dict) -> FormAssignment:
    assignment = FormAssignment(**assignment_data)
    session.add(assignment)
    await session.commit()
    await session.refresh(assignment)
    return assignment


async def update(session: AsyncSession, assignment: FormAssignment, update_data: dict) -> FormAssignment:
    for key, value in update_data.items():
        setattr(assignment, key, value)
    await session.commit()
    await session.refresh(assignment)
    return assignment
