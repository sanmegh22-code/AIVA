from typing import Optional

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.dependencies import (
    get_current_user,
    require_roles,
)
from app.db.database import get_db
from app.db.models import User
from app.schemas.inventory import (
    InventoryCreate,
    InventoryResponse,
    InventoryUpdate,
)
from app.services.inventory_service import InventoryService

router = APIRouter(
    prefix="/inventory",
    tags=["Inventory"],
)


# =====================================================
# CREATE INVENTORY
# =====================================================

@router.post(
    "/",
    response_model=InventoryResponse,
)
def create_inventory(
    inventory: InventoryCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_roles("admin", "manager")
    ),
):
    return InventoryService.create_inventory(
        db=db,
        data=inventory,
        current_user=current_user,
    )


# =====================================================
# GET ALL INVENTORY
# =====================================================

@router.get(
    "/",
    response_model=list[InventoryResponse],
)
def get_inventory(
    search: Optional[str] = None,
    warehouse_id: Optional[int] = None,
    product_id: Optional[int] = None,
    low_stock: bool = False,
    page: int = 1,
    limit: int = 10,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    ),
):
    return InventoryService.get_all_inventory(
        db=db,
        search=search,
        warehouse_id=warehouse_id,
        product_id=product_id,
        low_stock=low_stock,
        page=page,
        limit=limit,
    )


# =====================================================
# GET INVENTORY BY ID
# =====================================================

@router.get(
    "/{inventory_id}",
    response_model=InventoryResponse,
)
def get_inventory_by_id(
    inventory_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    ),
):
    return InventoryService.get_inventory(
        db=db,
        inventory_id=inventory_id,
    )


# =====================================================
# UPDATE INVENTORY
# =====================================================

@router.put(
    "/{inventory_id}",
    response_model=InventoryResponse,
)
def update_inventory(
    inventory_id: int,
    inventory: InventoryUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_roles("admin", "manager")
    ),
):
    return InventoryService.update_inventory(
        db=db,
        inventory_id=inventory_id,
        data=inventory,
        current_user=current_user,
    )


# =====================================================
# DELETE INVENTORY
# =====================================================

@router.delete("/{inventory_id}")
def delete_inventory(
    inventory_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_roles("admin")
    ),
):
    return InventoryService.delete_inventory(
        db=db,
        inventory_id=inventory_id,
        current_user=current_user,
    )


# =====================================================
# LOW STOCK
# =====================================================

@router.get("/low-stock")
def get_low_stock_inventory(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    ),
):
    return InventoryService.get_low_stock_inventory(db)


# =====================================================
# INVENTORY STATISTICS
# =====================================================

@router.get("/statistics")
def get_inventory_statistics(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    ),
):
    return InventoryService.get_inventory_statistics(db)


# =====================================================
# INVENTORY BY WAREHOUSE
# =====================================================

@router.get("/warehouse/{warehouse_id}")
def get_inventory_by_warehouse(
    warehouse_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    ),
):
    return InventoryService.get_inventory_by_warehouse(
        db=db,
        warehouse_id=warehouse_id,
    )


# =====================================================
# INVENTORY BY PRODUCT
# =====================================================

@router.get("/product/{product_id}")
def get_inventory_by_product(
    product_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    ),
):
    return InventoryService.get_inventory_by_product(
        db=db,
        product_id=product_id,
    )