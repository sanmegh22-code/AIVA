from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user
from app.db.database import get_db
from app.db.models import User
from app.services.dashboard_service import DashboardService

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"],
)


# =====================================================
# DASHBOARD SUMMARY
# =====================================================

@router.get("/summary")
def dashboard_summary(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return DashboardService.get_dashboard_summary(db)


# =====================================================
# RECENT STOCK MOVEMENTS
# =====================================================

@router.get("/recent-stock")
def recent_stock(
    limit: int = 10,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return DashboardService.get_recent_stock(
        db=db,
        limit=limit,
    )


# =====================================================
# RECENT NOTIFICATIONS
# =====================================================

@router.get("/notifications")
def recent_notifications(
    limit: int = 10,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return DashboardService.get_recent_notifications(
        db=db,
        limit=limit,
    )


# =====================================================
# RECENT AUDIT LOGS
# =====================================================

@router.get("/audits")
def recent_audits(
    limit: int = 10,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return DashboardService.get_recent_audits(
        db=db,
        limit=limit,
    )


# =====================================================
# DASHBOARD CHARTS
# =====================================================

@router.get("/charts")
def dashboard_charts(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return DashboardService.get_dashboard_charts(db)


# =====================================================
# COMPLETE DASHBOARD
# =====================================================

@router.get("/")
def dashboard(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return DashboardService.get_complete_dashboard(db)