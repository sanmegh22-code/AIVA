from fastapi import APIRouter
from sqlalchemy import text

from app.core.config import settings
from app.db.database import SessionLocal

router = APIRouter(
    prefix="/health",
    tags=["Health"]
)


@router.get("/")
def health_check():

    db = SessionLocal()

    try:
        db.execute(text("SELECT 1"))

        return {
            "status": "healthy",
            "database": "connected",
            "application": settings.APP_NAME,
            "version": settings.APP_VERSION
        }

    except Exception:

        return {
            "status": "unhealthy",
            "database": "disconnected",
            "application": settings.APP_NAME,
            "version": settings.APP_VERSION
        }

    finally:
        db.close()