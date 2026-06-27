from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user
from app.db.database import get_db
from app.db.models import User
from app.schemas.dashboard import DashboardSummary
from app.services.dashboard_service import DashboardService

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"],
)


@router.get(
    "/summary",
    response_model=DashboardSummary,
)
def get_dashboard_summary(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return DashboardService.get_summary(db)


@router.get("/recent-movements")
def get_recent_movements(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return DashboardService.get_recent_movements(db)


@router.get("/charts")
def get_chart_data(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return DashboardService.get_chart_data(db)