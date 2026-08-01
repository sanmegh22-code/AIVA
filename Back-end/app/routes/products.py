from typing import Optional

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.dependencies import (
    get_current_user,
    require_roles,
)
from app.db.database import get_db
from app.db.models import User
from app.schemas.product import (
    ProductCreate,
    ProductResponse,
    ProductUpdate,
)
from app.services.product_service import ProductService

router = APIRouter(
    prefix="/products",
    tags=["Products"],
)


# =====================================================
# CREATE PRODUCT
# =====================================================

@router.post(
    "/",
    response_model=ProductResponse,
)
def create_product(
    product: ProductCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_roles("admin", "manager")
    ),
):
    return ProductService.create_product(
        db=db,
        data=product,
        current_user=current_user,
    )


# =====================================================
# GET ALL PRODUCTS
# =====================================================

@router.get(
    "/",
    response_model=list[ProductResponse],
)
def get_products(
    search: Optional[str] = None,
    category: Optional[str] = None,
    status: Optional[str] = None,
    page: int = 1,
    limit: int = 10,
    sort: str = "id",
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    ),
):
    return ProductService.get_products(
        db=db,
        search=search,
        category=category,
        status=status,
        page=page,
        limit=limit,
        sort=sort,
    )


# =====================================================
# GET PRODUCT
# =====================================================

@router.get(
    "/{product_id}",
    response_model=ProductResponse,
)
def get_product(
    product_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    ),
):
    return ProductService.get_product(
        db=db,
        product_id=product_id,
    )


# =====================================================
# UPDATE PRODUCT
# =====================================================

@router.put(
    "/{product_id}",
    response_model=ProductResponse,
)
def update_product(
    product_id: int,
    product: ProductUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_roles("admin", "manager")
    ),
):
    return ProductService.update_product(
        db=db,
        product_id=product_id,
        data=product,
        current_user=current_user,
    )


# =====================================================
# DELETE PRODUCT
# =====================================================

@router.delete("/{product_id}")
def delete_product(
    product_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_roles("admin")
    ),
):
    return ProductService.delete_product(
        db=db,
        product_id=product_id,
        current_user=current_user,
    )


# =====================================================
# LOW STOCK PRODUCTS
# =====================================================

@router.get("/low-stock")
def get_low_stock_products(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    ),
):
    return ProductService.get_low_stock_products(db)


# =====================================================
# PRODUCT STATISTICS
# =====================================================

@router.get("/statistics")
def get_product_statistics(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    ),
):
    return ProductService.get_product_statistics(db)


# =====================================================
# PRODUCT DASHBOARD
# =====================================================

@router.get("/dashboard")
def get_dashboard_summary(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    ),
):
    return ProductService.get_dashboard_summary(db)