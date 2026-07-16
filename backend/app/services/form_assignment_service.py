import uuid
from collections.abc import Sequence
from datetime import datetime
from datetime import timezone

from fastapi import HTTPException
from fastapi import status
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.enums import AssignmentStatus
from app.models.form_assignment import FormAssignment
from app.repositories import form_assignment_repository
from app.schemas.form_assignment import FormAssignmentCreate


async def assign_form(
    session: AsyncSession,
    assignment_in: FormAssignmentCreate,
    assigned_by_user_id: uuid.UUID,
) -> FormAssignment:
    assignment_data = assignment_in.model_dump()
    assignment_data["assigned_by"] = assigned_by_user_id
    assignment_data["status"] = AssignmentStatus.PENDING
    return await form_assignment_repository.create(session, assignment_data)


async def get_all_assignments(session: AsyncSession) -> Sequence[FormAssignment]:
    return await form_assignment_repository.get_all(session)


async def get_my_assignments(session: AsyncSession, user_id: uuid.UUID) -> Sequence[FormAssignment]:
    return await form_assignment_repository.get_by_user_id(session, user_id)


async def complete_assignment(
    session: AsyncSession,
    assignment_id: uuid.UUID,
    current_user_id: uuid.UUID,
) -> FormAssignment:
    assignment = await form_assignment_repository.get_by_id(session, assignment_id)
    if not assignment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Assignment not found",
        )

    if assignment.user_id != current_user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only complete your own assignments",
        )

    if assignment.status == AssignmentStatus.COMPLETED:
        return assignment  # Already completed

    update_data = {
        "status": AssignmentStatus.COMPLETED,
        "completed_at": datetime.now(timezone.utc),
    }
    return await form_assignment_repository.update(session, assignment, update_data)
