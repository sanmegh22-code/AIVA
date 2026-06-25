from typing import Optional

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import or_
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user, require_roles
from app.core.logger import logger
from app.db.database import get_db
from app.db.models import Product, User
from app.schemas.product import ProductCreate, ProductUpdate

router = APIRouter(
    prefix="/products",
    tags=["Products"]
)


@router.post("/")
def create_product(
    product: ProductCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("admin", "manager"))
):

    existing = db.query(Product).filter(
        Product.sku == product.sku
    ).first()

    if existing:

        logger.warning(
            f"{current_user.email} tried to create duplicate SKU: {product.sku}"
        )

        raise HTTPException(
            status_code=400,
            detail="SKU already exists"
        )

    new_product = Product(
        name=product.name,
        sku=product.sku,
        quantity=product.quantity,
        price=product.price,
        category=product.category
    )

    db.add(new_product)
    db.commit()
    db.refresh(new_product)

    logger.info(
        f"{current_user.email} created product {new_product.sku}"
    )

    return new_product


@router.get("/")
def get_products(
    search: Optional[str] = None,
    category: Optional[str] = None,
    status: Optional[str] = None,
    page: int = 1,
    limit: int = 10,
    sort: str = "id",
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    query = db.query(Product)

    # Search
    if search:
        query = query.filter(
            or_(
                Product.name.ilike(f"%{search}%"),
                Product.sku.ilike(f"%{search}%")
            )
        )

    # Category Filter
    if category:
        query = query.filter(
            Product.category.ilike(category)
        )

    # Computed Status Filter
    if status:

        status = status.lower()

        if status == "available":
            query = query.filter(Product.quantity > 0)

        elif status in (
            "outofstock",
            "out_of_stock",
            "out-of-stock"
        ):
            query = query.filter(Product.quantity == 0)

    # Sorting
    if sort == "name":
        query = query.order_by(Product.name)

    elif sort == "price":
        query = query.order_by(Product.price)

    else:
        query = query.order_by(Product.id)

    # Pagination
    offset = (page - 1) * limit

    products = query.offset(offset).limit(limit).all()

    logger.info(
        f"{current_user.email} viewed product list"
    )

    return products


@router.get("/{product_id}")
def get_product(
    product_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    product = db.query(Product).filter(
        Product.id == product_id
    ).first()

    if not product:

        logger.warning(
            f"{current_user.email} requested non-existing product {product_id}"
        )

        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    logger.info(
        f"{current_user.email} viewed product {product.sku}"
    )

    return product


@router.put("/{product_id}")
def update_product(
    product_id: int,
    updated_product: ProductUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_roles("admin", "manager")
    )
):

    product = db.query(Product).filter(
        Product.id == product_id
    ).first()

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    if updated_product.sku:

        existing = db.query(Product).filter(
            Product.sku == updated_product.sku,
            Product.id != product_id
        ).first()

        if existing:
            raise HTTPException(
                status_code=400,
                detail="SKU already exists"
            )

    update_data = updated_product.model_dump(
        exclude_unset=True
    )

    for key, value in update_data.items():
        setattr(product, key, value)

    db.commit()
    db.refresh(product)

    logger.info(
        f"{current_user.email} updated product {product.sku}"
    )

    return product


@router.delete("/{product_id}")
def delete_product(
    product_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_roles("admin", "manager")
    )
):

    product = db.query(Product).filter(
        Product.id == product_id
    ).first()

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    logger.info(
        f"{current_user.email} deleted product {product.sku}"
    )

    db.delete(product)
    db.commit()

    return {
        "message": "Product deleted successfully"
    }