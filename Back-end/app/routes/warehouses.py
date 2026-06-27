from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user, require_roles
from app.core.logger import logger
from app.db.database import get_db
from app.db.models import Warehouse, User
from app.schemas.warehouse import WarehouseCreate, WarehouseUpdate

router = APIRouter(
    prefix="/warehouses",
    tags=["Warehouses"]
)


@router.post("/")
def create_warehouse(
    warehouse: WarehouseCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_roles("admin", "manager")
    )
):

    existing = db.query(Warehouse).filter(
        Warehouse.code == warehouse.code
    ).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Warehouse code already exists"
        )

    new_warehouse = Warehouse(
        name=warehouse.name,
        code=warehouse.code,
        address=warehouse.address,
        manager=warehouse.manager,
        phone=warehouse.phone,
        status=warehouse.status
    )

    db.add(new_warehouse)
    db.commit()
    db.refresh(new_warehouse)

    logger.info(
        f"{current_user.email} created warehouse {new_warehouse.code}"
    )

    return new_warehouse


@router.get("/")
def get_warehouses(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return db.query(Warehouse).all()


@router.get("/{warehouse_id}")
def get_warehouse(
    warehouse_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    warehouse = db.query(Warehouse).filter(
        Warehouse.id == warehouse_id
    ).first()

    if not warehouse:
        raise HTTPException(
            status_code=404,
            detail="Warehouse not found"
        )

    return warehouse


@router.put("/{warehouse_id}")
def update_warehouse(
    warehouse_id: int,
    updated: WarehouseUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_roles("admin", "manager")
    )
):

    warehouse = db.query(Warehouse).filter(
        Warehouse.id == warehouse_id
    ).first()

    if not warehouse:
        raise HTTPException(
            status_code=404,
            detail="Warehouse not found"
        )

    if updated.code:

        existing = db.query(Warehouse).filter(
            Warehouse.code == updated.code,
            Warehouse.id != warehouse_id
        ).first()

        if existing:
            raise HTTPException(
                status_code=400,
                detail="Warehouse code already exists"
            )

    update_data = updated.model_dump(
        exclude_unset=True
    )

    for key, value in update_data.items():
        setattr(warehouse, key, value)

    db.commit()
    db.refresh(warehouse)

    logger.info(
        f"{current_user.email} updated warehouse {warehouse.code}"
    )

    return warehouse


@router.delete("/{warehouse_id}")
def delete_warehouse(
    warehouse_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_roles("admin")
    )
):

    warehouse = db.query(Warehouse).filter(
        Warehouse.id == warehouse_id
    ).first()

    if not warehouse:
        raise HTTPException(
            status_code=404,
            detail="Warehouse not found"
        )

    db.delete(warehouse)
    db.commit()

    logger.info(
        f"{current_user.email} deleted warehouse {warehouse.code}"
    )

    return {
        "message": "Warehouse deleted successfully"
    }