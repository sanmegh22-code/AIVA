from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user
from app.db.database import get_db
from app.db.models import User

from app.schemas.notification import (
    NotificationCreate,
    NotificationResponse,
    NotificationStats,
)

from app.services.notifications.notification_service import (
    NotificationService,
)

router = APIRouter(
    prefix="/notifications",
    tags=["Notifications"],
)


@router.post(
    "/",
    response_model=NotificationResponse,
)
def create_notification(
    notification: NotificationCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return NotificationService.create_notification(
        db=db,
        user_id=notification.user_id,
        title=notification.title,
        message=notification.message,
        notification_type=notification.notification_type,
        priority=notification.priority,
    )


@router.get(
    "/",
    response_model=list[NotificationResponse],
)
def get_notifications(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return NotificationService.get_user_notifications(
        db,
        current_user.id,
    )


@router.get("/all")
def get_all_notifications(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if current_user.role != "admin":
        raise HTTPException(
            status_code=403,
            detail="Only admin can view all notifications.",
        )

    return NotificationService.get_all_notifications(db)


@router.get(
    "/stats",
    response_model=NotificationStats,
)
def notification_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return NotificationService.statistics(
        db,
        current_user.id,
    )


@router.get("/unread-count")
def unread_count(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return {
        "unread": NotificationService.unread_count(
            db,
            current_user.id,
        )
    }


@router.get("/recent")
def recent_notifications(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return NotificationService.recent_notifications(
        db,
        current_user.id,
    )


@router.patch("/{notification_id}/read")
def mark_as_read(
    notification_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    notification = NotificationService.get_notification(
        db,
        notification_id,
    )

    if notification is None:
        raise HTTPException(
            status_code=404,
            detail="Notification not found",
        )

    if notification.user_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="Access denied",
        )

    return NotificationService.mark_as_read(
        db,
        notification_id,
    )


@router.patch("/read-all")
def mark_all_as_read(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return NotificationService.mark_all_as_read(
        db,
        current_user.id,
    )


@router.delete("/{notification_id}")
def delete_notification(
    notification_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    notification = NotificationService.get_notification(
        db,
        notification_id,
    )

    if notification is None:
        raise HTTPException(
            status_code=404,
            detail="Notification not found",
        )

    if (
        notification.user_id != current_user.id
        and current_user.role != "admin"
    ):
        raise HTTPException(
            status_code=403,
            detail="Access denied",
        )

    return NotificationService.delete_notification(
        db,
        notification_id,
    )