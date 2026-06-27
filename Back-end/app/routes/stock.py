from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.dependencies import (
    get_current_user,
    require_roles,
)
from app.db.database import get_db
from app.db.models import User
from app.schemas.stock import (
    StockAdjustment,
    StockIn,
    StockOut,
    StockTransfer,
)
from app.services.stock_service import StockService

router = APIRouter(
    prefix="/stock",
    tags=["Stock"],
)


@router.post("/in")
def stock_in(
    stock: StockIn,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_roles("admin", "manager")
    ),
):
    return StockService.stock_in(
        db=db,
        data=stock,
        current_user=current_user,
    )


@router.post("/out")
def stock_out(
    stock: StockOut,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_roles("admin", "manager")
    ),
):
    return StockService.stock_out(
        db=db,
        data=stock,
        current_user=current_user,
    )
@router.post("/transfer")
def stock_transfer(
    stock: StockTransfer,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_roles("admin", "manager")
    ),
):
    return StockService.stock_transfer(
        db=db,
        data=stock,
        current_user=current_user,
    )


@router.post("/adjust")
def stock_adjustment(
    stock: StockAdjustment,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_roles("admin", "manager")
    ),
):
    return StockService.stock_adjustment(
        db=db,
        data=stock,
        current_user=current_user,
    )
@router.get("/history")
def get_stock_history(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return StockService.get_stock_history(db)