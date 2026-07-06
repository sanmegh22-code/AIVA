from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.core.logger import logger
from app.db.models import Supplier


class SupplierService:

    @staticmethod
    def create_supplier(db: Session, data, current_user):

        existing = (
            db.query(Supplier)
            .filter(Supplier.email == data.email)
            .first()
        )

        if existing:
            raise HTTPException(
                status_code=400,
                detail="Supplier already exists"
            )

        supplier = Supplier(
            name=data.name,
            email=data.email,
            phone=data.phone,
            gst_number=data.gst_number,
            address=data.address,
            city=data.city,
            state=data.state,
        )

        db.add(supplier)
        db.commit()
        db.refresh(supplier)

        logger.info(
            f"{current_user.email} created supplier {supplier.name}"
        )

        return supplier

    @staticmethod
    def get_all_suppliers(db: Session):
        return db.query(Supplier).all()

    @staticmethod
    def get_supplier(db: Session, supplier_id: int):

        supplier = (
            db.query(Supplier)
            .filter(Supplier.id == supplier_id)
            .first()
        )

        if not supplier:
            raise HTTPException(
                status_code=404,
                detail="Supplier not found"
            )

        return supplier

    @staticmethod
    def update_supplier(
        db: Session,
        supplier_id: int,
        data,
        current_user
    ):

        supplier = SupplierService.get_supplier(
            db,
            supplier_id
        )

        update_data = data.model_dump(
            exclude_unset=True
        )

        for key, value in update_data.items():
            setattr(supplier, key, value)

        db.commit()
        db.refresh(supplier)

        logger.info(
            f"{current_user.email} updated supplier {supplier.id}"
        )

        return supplier

    @staticmethod
    def delete_supplier(
        db: Session,
        supplier_id: int,
        current_user
    ):

        supplier = SupplierService.get_supplier(
            db,
            supplier_id
        )

        db.delete(supplier)
        db.commit()

        logger.info(
            f"{current_user.email} deleted supplier {supplier.id}"
        )

        return {
            "success": True,
            "message": "Supplier deleted successfully"
        }