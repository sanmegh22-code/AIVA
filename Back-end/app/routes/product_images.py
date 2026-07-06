import os

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile
from sqlalchemy.orm import Session

from app.core.dependencies import require_roles
from app.core.logger import logger
from app.db.database import get_db
from app.db.models import Product, User
from app.utils.file_upload import save_image

router = APIRouter(
    prefix="/products",
    tags=["Product Images"]
)


@router.post("/{product_id}/image")
def upload_product_image(
    product_id: int,
    image: UploadFile = File(...),
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

    if product.image_url:

        try:
            if os.path.exists(product.image_url):
                os.remove(product.image_url)
        except Exception:
            pass

    image_path = save_image(image)

    product.image_url = image_path

    db.commit()
    db.refresh(product)

    logger.info(
        f"{current_user.email} uploaded image for product {product.id}"
    )

    return {
        "message": "Image uploaded successfully",
        "image_url": image_path
    }


@router.delete("/{product_id}/image")
def delete_product_image(
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

    if not product.image_url:
        raise HTTPException(
            status_code=404,
            detail="Product has no image"
        )

    try:
        if os.path.exists(product.image_url):
            os.remove(product.image_url)
    except Exception:
        pass

    product.image_url = None

    db.commit()

    logger.info(
        f"{current_user.email} deleted image for product {product.id}"
    )

    return {
        "message": "Image deleted successfully"
    }