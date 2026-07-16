from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.organization import Organization


async def get_by_code(session: AsyncSession, code: str) -> Organization | None:
    stmt = select(Organization).where(Organization.code == code)
    result = await session.execute(stmt)
    return result.scalar_one_or_none()


async def create(session: AsyncSession, data: dict) -> Organization:
    org = Organization(**data)
    session.add(org)
    await session.commit()
    await session.refresh(org)
    return org
