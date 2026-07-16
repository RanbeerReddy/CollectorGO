import uuid
from datetime import datetime

from pydantic import BaseModel
from pydantic import ConfigDict

from app.models.enums import AssignmentStatus


class FormAssignmentCreate(BaseModel):
    form_id: uuid.UUID
    user_id: uuid.UUID


class FormAssignmentResponse(BaseModel):
    id: uuid.UUID
    form_id: uuid.UUID
    user_id: uuid.UUID
    assigned_by: uuid.UUID
    status: AssignmentStatus
    assigned_at: datetime
    completed_at: datetime | None
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
