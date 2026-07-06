from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.dependencies import (
    get_current_user,
    require_roles,
)
from app.db.database import get_db
from app.schemas.supplier import (
    SupplierCreate,
    SupplierUpdate,
    SupplierResponse,
)
from app.services.supplier_service import SupplierService

router = APIRouter(
    prefix="/suppliers",
    tags=["Suppliers"],
)


@router.get(
    "/",
    response_model=list[SupplierResponse]
)
def get_suppliers(
    db: Session = Depends(get_db),
):
    return SupplierService.get_all_suppliers(db)


@router.get(
    "/{supplier_id}",
    response_model=SupplierResponse
)
def get_supplier(
    supplier_id: int,
    db: Session = Depends(get_db),
):
    return SupplierService.get_supplier(
        db,
        supplier_id
    )


@router.post(
    "/",
    response_model=SupplierResponse
)
def create_supplier(
    supplier: SupplierCreate,
    db: Session = Depends(get_db),
    current_user=Depends(require_roles("admin")),
):
    return SupplierService.create_supplier(
        db,
        supplier,
        current_user,
    )


@router.put(
    "/{supplier_id}",
    response_model=SupplierResponse
)
def update_supplier(
    supplier_id: int,
    supplier: SupplierUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(require_roles("admin")),
):
    return SupplierService.update_supplier(
        db,
        supplier_id,
        supplier,
        current_user,
    )


@router.delete("/{supplier_id}")
def delete_supplier(
    supplier_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_roles("admin")),
):
    return SupplierService.delete_supplier(
        db,
        supplier_id,
        current_user,
    )