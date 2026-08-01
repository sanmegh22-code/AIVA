from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class AuditLogBase(BaseModel):
    action: str
    module: str
    description: str
    ip_address: Optional[str] = None


class AuditLogCreate(AuditLogBase):
    user_id: Optional[int] = None


class AuditLogResponse(AuditLogBase):
    id: int
    user_id: Optional[int]
    created_at: datetime

    class Config:
        from_attributes = True