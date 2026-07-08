from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user
from app.db.database import get_db
from app.db.models import User

from app.schemas.report import ReportSummary
from app.services.reports.report_service import ReportService

router = APIRouter(
    prefix="/reports",
    tags=["Reports"],
)


@router.get(
    "/summary",
    response_model=ReportSummary,
)
def get_report_summary(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return ReportService.get_summary(db)
from fastapi import Query


@router.get("/export/pdf")
def export_pdf(
    type: str = Query(default="full"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return ReportService.export_pdf(
        db,
        type,
    )


@router.get("/export/excel")
def export_excel(
    type: str = Query(default="full"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return ReportService.export_excel(
        db,
        type,
    )