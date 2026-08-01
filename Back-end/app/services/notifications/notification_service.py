from sqlalchemy.orm import Session
from sqlalchemy import desc

from app.db.models import Notification


class NotificationService:

    @staticmethod
    def create_notification(
        db: Session,
        user_id: int,
        title: str,
        message: str,
        notification_type: str = "system",
        priority: str = "normal",
    ):

        notification = Notification(
            user_id=user_id,
            title=title,
            message=message,
            notification_type=notification_type,
            priority=priority,
        )

        db.add(notification)
        db.commit()
        db.refresh(notification)

        return notification

    @staticmethod
    def get_all_notifications(db: Session):

        return (
            db.query(Notification)
            .order_by(desc(Notification.created_at))
            .all()
        )

    @staticmethod
    def get_user_notifications(
        db: Session,
        user_id: int,
    ):

        return (
            db.query(Notification)
            .filter(Notification.user_id == user_id)
            .order_by(desc(Notification.created_at))
            .all()
        )

    @staticmethod
    def get_notification(
        db: Session,
        notification_id: int,
    ):

        return (
            db.query(Notification)
            .filter(Notification.id == notification_id)
            .first()
        )

    @staticmethod
    def mark_as_read(
        db: Session,
        notification_id: int,
    ):

        notification = (
            db.query(Notification)
            .filter(Notification.id == notification_id)
            .first()
        )

        if notification:

            notification.is_read = True

            db.commit()

            db.refresh(notification)

        return notification

    @staticmethod
    def mark_all_as_read(
        db: Session,
        user_id: int,
    ):

        notifications = (
            db.query(Notification)
            .filter(
                Notification.user_id == user_id,
                Notification.is_read == False,
            )
            .all()
        )

        for notification in notifications:
            notification.is_read = True

        db.commit()

        return {
            "message": "All notifications marked as read."
        }

    @staticmethod
    def delete_notification(
        db: Session,
        notification_id: int,
    ):

        notification = (
            db.query(Notification)
            .filter(Notification.id == notification_id)
            .first()
        )

        if notification:

            db.delete(notification)

            db.commit()

        return {
            "message": "Notification deleted."
        }

    @staticmethod
    def unread_count(
        db: Session,
        user_id: int,
    ):

        return (
            db.query(Notification)
            .filter(
                Notification.user_id == user_id,
                Notification.is_read == False,
            )
            .count()
        )

    @staticmethod
    def statistics(
        db: Session,
        user_id: int,
    ):

        total = (
            db.query(Notification)
            .filter(Notification.user_id == user_id)
            .count()
        )

        unread = (
            db.query(Notification)
            .filter(
                Notification.user_id == user_id,
                Notification.is_read == False,
            )
            .count()
        )

        read = total - unread

        return {
            "total": total,
            "unread": unread,
            "read": read,
        }

    @staticmethod
    def recent_notifications(
        db: Session,
        user_id: int,
        limit: int = 5,
    ):

        return (
            db.query(Notification)
            .filter(Notification.user_id == user_id)
            .order_by(desc(Notification.created_at))
            .limit(limit)
            .all()
        )