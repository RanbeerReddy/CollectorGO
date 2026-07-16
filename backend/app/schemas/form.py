import uuid
from datetime import datetime
from pydantic import BaseModel
from pydantic import ConfigDict


class FormBase(BaseModel):
    name: str
    description: str | None = None
    kobo_asset_uid: str | None = None
    enketo_url: str | None = None
    category: str | None = None
    organization_id: uuid.UUID


class FormCreate(FormBase):
    pass


class FormUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
    kobo_asset_uid: str | None = None
    enketo_url: str | None = None
    category: str | None = None
    is_active: bool | None = None


class FormResponse(FormBase):
    id: uuid.UUID
    is_active: bool
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
