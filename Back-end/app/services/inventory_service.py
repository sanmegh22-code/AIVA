from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.core.logger import logger
from app.db.models import Inventory, Product, Warehouse


class InventoryService:

    @staticmethod
    def create_inventory(db: Session, data, current_user):

        print("=" * 60)
        print("Requested Product ID:", data.product_id)
        print("Requested Warehouse ID:", data.warehouse_id)

        print("\nProducts in Database:")
        for p in db.query(Product).all():
            print(f"ID={p.id}  Name={p.name}")

        print("\nWarehouses in Database:")
        for w in db.query(Warehouse).all():
            print(f"ID={w.id}  Name={w.name}")

        print("=" * 60)

        product = db.query(Product).filter(
            Product.id == data.product_id
        ).first()

        if not product:
            raise HTTPException(
                status_code=404,
                detail="Product not found"
            )

        warehouse = db.query(Warehouse).filter(
            Warehouse.id == data.warehouse_id
        ).first()

        if not warehouse:
            raise HTTPException(
                status_code=404,
                detail="Warehouse not found"
            )

        existing = db.query(Inventory).filter(
            Inventory.product_id == data.product_id,
            Inventory.warehouse_id == data.warehouse_id
        ).first()

        if existing:
            raise HTTPException(
                status_code=400,
                detail="Inventory already exists for this warehouse"
            )

        if data.minimum_stock > data.maximum_stock:
            raise HTTPException(
                status_code=400,
                detail="Minimum stock cannot be greater than maximum stock"
            )

        inventory = Inventory(
            product_id=data.product_id,
            warehouse_id=data.warehouse_id,
            quantity=data.quantity,
            minimum_stock=data.minimum_stock,
            maximum_stock=data.maximum_stock
        )

        db.add(inventory)
        db.commit()
        db.refresh(inventory)

        logger.info(
            f"{current_user.email} created inventory "
            f"for Product {data.product_id} "
            f"in Warehouse {data.warehouse_id}"
        )

        return inventory

    @staticmethod
    def get_all_inventory(db: Session):
        return db.query(Inventory).all()

    @staticmethod
    def get_inventory(db: Session, inventory_id: int):

        inventory = db.query(Inventory).filter(
            Inventory.id == inventory_id
        ).first()

        if not inventory:
            raise HTTPException(
                status_code=404,
                detail="Inventory not found"
            )

        return inventory

    @staticmethod
    def update_inventory(
        db: Session,
        inventory_id: int,
        data,
        current_user
    ):

        inventory = InventoryService.get_inventory(
            db,
            inventory_id
        )

        update_data = data.model_dump(
            exclude_unset=True
        )

        if (
            "minimum_stock" in update_data
            and "maximum_stock" in update_data
            and update_data["minimum_stock"] > update_data["maximum_stock"]
        ):
            raise HTTPException(
                status_code=400,
                detail="Minimum stock cannot be greater than maximum stock"
            )

        for key, value in update_data.items():
            setattr(inventory, key, value)

        db.commit()
        db.refresh(inventory)

        logger.info(
            f"{current_user.email} updated inventory {inventory.id}"
        )

        return inventory

    @staticmethod
    def delete_inventory(
        db: Session,
        inventory_id: int,
        current_user
    ):

        inventory = InventoryService.get_inventory(
            db,
            inventory_id
        )

        if inventory.quantity > 0:
            raise HTTPException(
                status_code=400,
                detail="Cannot delete inventory with stock available"
            )

        db.delete(inventory)
        db.commit()

        logger.info(
            f"{current_user.email} deleted inventory {inventory.id}"
        )

        return {
            "success": True,
            "message": "Inventory deleted successfully"
        }