from sqlalchemy.orm import Session

from app.db.models import AuditLog


class AuditService:

    @staticmethod
    def log(
        db: Session,
        user_id: int | None,
        action: str,
        module: str,
        description: str,
        ip_address: str | None = None,
    ):
        """
        Save an audit log entry.
        """

        audit = AuditLog(
            user_id=user_id,
            action=action,
            module=module,
            description=description,
            ip_address=ip_address,
        )

        db.add(audit)
        db.commit()

        db.refresh(audit)

        return audit

    @staticmethod
    def get_logs(
        db: Session,
        limit: int = 100,
    ):
        """
        Return latest audit logs.
        """

        return (
            db.query(AuditLog)
            .order_by(AuditLog.created_at.desc())
            .limit(limit)
            .all()
        )