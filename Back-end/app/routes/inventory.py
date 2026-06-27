from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user, require_roles
from app.db.database import get_db
from app.db.models import User
from app.schemas.inventory import (
    InventoryCreate,
    InventoryUpdate,
    InventoryResponse,
)
from app.services.inventory_service import InventoryService

router = APIRouter(
    prefix="/inventory",
    tags=["Inventory"]
)


@router.post("/", response_model=InventoryResponse)
def create_inventory(
    inventory: InventoryCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_roles("admin", "manager")
    )
):
    return InventoryService.create_inventory(
        db,
        inventory,
        current_user
    )


@router.get("/", response_model=list[InventoryResponse])
def get_all_inventory(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return InventoryService.get_all_inventory(db)


@router.get("/low-stock")
def get_low_stock(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return InventoryService.get_low_stock(db)


@router.get("/{inventory_id}", response_model=InventoryResponse)
def get_inventory(
    inventory_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return InventoryService.get_inventory(
        db,
        inventory_id
    )


@router.put("/{inventory_id}", response_model=InventoryResponse)
def update_inventory(
    inventory_id: int,
    inventory: InventoryUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_roles("admin", "manager")
    )
):
    return InventoryService.update_inventory(
        db,
        inventory_id,
        inventory,
        current_user
    )


@router.delete("/{inventory_id}")
def delete_inventory(
    inventory_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_roles("admin")
    )
):
    return InventoryService.delete_inventory(
        db,
        inventory_id,
        current_user
    )