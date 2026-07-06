from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user, require_roles
from app.core.logger import logger
from app.db.database import get_db
from app.db.models import Category, User
from app.schemas.category import CategoryCreate, CategoryUpdate

router = APIRouter(
    prefix="/categories",
    tags=["Categories"]
)


@router.post("/")
def create_category(
    category: CategoryCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("admin", "manager"))
):

    existing = db.query(Category).filter(
        Category.name.ilike(category.name)
    ).first()

    if existing:

        logger.warning(
            f"{current_user.email} tried to create duplicate category: {category.name}"
        )

        raise HTTPException(
            status_code=400,
            detail="Category already exists"
        )

    new_category = Category(
        name=category.name,
        description=category.description
    )

    db.add(new_category)
    db.commit()
    db.refresh(new_category)

    logger.info(
        f"{current_user.email} created category {new_category.name}"
    )

    return new_category


@router.get("/")
def get_categories(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    logger.info(
        f"{current_user.email} viewed categories"
    )

    return db.query(Category).order_by(Category.name).all()


@router.get("/{category_id}")
def get_category(
    category_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    category = db.query(Category).filter(
        Category.id == category_id
    ).first()

    if not category:
        raise HTTPException(
            status_code=404,
            detail="Category not found"
        )

    return category


@router.put("/{category_id}")
def update_category(
    category_id: int,
    updated_category: CategoryUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("admin", "manager"))
):

    category = db.query(Category).filter(
        Category.id == category_id
    ).first()

    if not category:
        raise HTTPException(
            status_code=404,
            detail="Category not found"
        )

    if updated_category.name:

        existing = db.query(Category).filter(
            Category.name.ilike(updated_category.name),
            Category.id != category_id
        ).first()

        if existing:
            raise HTTPException(
                status_code=400,
                detail="Category already exists"
            )

    update_data = updated_category.model_dump(
        exclude_unset=True
    )

    for key, value in update_data.items():
        setattr(category, key, value)

    db.commit()
    db.refresh(category)

    logger.info(
        f"{current_user.email} updated category {category.name}"
    )

    return category


@router.delete("/{category_id}")
def delete_category(
    category_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("admin", "manager"))
):

    category = db.query(Category).filter(
        Category.id == category_id
    ).first()

    if not category:
        raise HTTPException(
            status_code=404,
            detail="Category not found"
        )

    logger.info(
        f"{current_user.email} deleted category {category.name}"
    )

    db.delete(category)
    db.commit()

    return {
        "message": "Category deleted successfully"
    }