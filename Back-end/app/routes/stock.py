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


# =====================================================
# STOCK IN
# =====================================================

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


# =====================================================
# STOCK OUT
# =====================================================

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


# =====================================================
# STOCK TRANSFER
# =====================================================

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


# =====================================================
# STOCK ADJUSTMENT
# =====================================================

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


# =====================================================
# STOCK HISTORY
# =====================================================

@router.get("/history")
def get_stock_history(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    ),
):
    return StockService.get_stock_history(db)


# =====================================================
# LOW STOCK
# =====================================================

@router.get("/low-stock")
def get_low_stock(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    ),
):
    return StockService.get_low_stock(db)


# =====================================================
# INVENTORY SUMMARY
# =====================================================

@router.get("/summary")
def get_inventory_summary(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    ),
):
    return StockService.get_inventory_summary(db)


# =====================================================
# RECENT MOVEMENTS
# =====================================================

@router.get("/recent")
def get_recent_movements(
    limit: int = 10,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    ),
):
    return StockService.get_recent_movements(
        db=db,
        limit=limit,
    )


# =====================================================
# STOCK STATISTICS
# =====================================================

@router.get("/statistics")
def get_stock_statistics(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    ),
):
    return StockService.get_stock_statistics(db)