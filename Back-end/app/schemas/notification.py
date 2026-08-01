from datetime import datetime
from pydantic import BaseModel


class NotificationBase(BaseModel):
    title: str
    message: str
    notification_type: str = "system"
    priority: str = "normal"


class NotificationCreate(NotificationBase):
    user_id: int


class NotificationUpdate(BaseModel):
    is_read: bool


class NotificationResponse(NotificationBase):
    id: int
    user_id: int
    is_read: bool
    created_at: datetime

    class Config:
        from_attributes = True


class NotificationStats(BaseModel):
    total: int
    unread: int
    read: int


class NotificationList(BaseModel):
    notifications: list[NotificationResponse]
    unread_count: int