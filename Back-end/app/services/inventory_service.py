from fastapi import HTTPException
from sqlalchemy.orm import Session, joinedload

from app.core.logger import logger
from app.db.models import (
    Inventory,
    Product,
    Warehouse,
)
from app.services.audit.audit_service import AuditService
from app.services.notifications.notification_service import (
    NotificationService,
)


class InventoryService:

    # =====================================================
    # CREATE INVENTORY
    # =====================================================

    @staticmethod
    def create_inventory(
        db: Session,
        data,
        current_user,
    ):

        product = (
            db.query(Product)
            .filter(
                Product.id == data.product_id
            )
            .first()
        )

        if product is None:
            raise HTTPException(
                status_code=404,
                detail="Product not found",
            )

        warehouse = (
            db.query(Warehouse)
            .filter(
                Warehouse.id == data.warehouse_id
            )
            .first()
        )

        if warehouse is None:
            raise HTTPException(
                status_code=404,
                detail="Warehouse not found",
            )

        existing = (
            db.query(Inventory)
            .filter(
                Inventory.product_id == data.product_id,
                Inventory.warehouse_id == data.warehouse_id,
            )
            .first()
        )

        if existing:
            raise HTTPException(
                status_code=400,
                detail="Inventory already exists for this warehouse",
            )

        if data.minimum_stock > data.maximum_stock:
            raise HTTPException(
                status_code=400,
                detail="Minimum stock cannot exceed maximum stock",
            )

        inventory = Inventory(
            product_id=data.product_id,
            warehouse_id=data.warehouse_id,
            quantity=data.quantity,
            minimum_stock=data.minimum_stock,
            maximum_stock=data.maximum_stock,
        )

        db.add(inventory)

        db.commit()

        db.refresh(inventory)

        AuditService.log(
            db=db,
            user_id=current_user.id,
            action="CREATE",
            module="Inventory",
            description=(
                f"Created inventory for "
                f"{product.name} in "
                f"{warehouse.name}"
            ),
        )

        NotificationService.create_notification(
            db=db,
            user_id=current_user.id,
            title="Inventory Created",
            message=(
                f"Inventory created for "
                f"{product.name}"
            ),
            notification_type="success",
            priority="normal",
        )

        logger.info(
            f"{current_user.email} created inventory "
            f"{inventory.id}"
        )

        return inventory
    # =====================================================
    # GET ALL INVENTORY
    # =====================================================

    @staticmethod
    def get_all_inventory(
        db: Session,
        search: str = None,
        warehouse_id: int = None,
        product_id: int = None,
        low_stock: bool = False,
        page: int = 1,
        limit: int = 10,
    ):

        query = (
            db.query(Inventory)
            .options(
                joinedload(Inventory.product),
                joinedload(Inventory.warehouse),
            )
        )

        if search:

            query = query.filter(
                Product.name.ilike(f"%{search}%")
            ).join(Product)

        if warehouse_id:

            query = query.filter(
                Inventory.warehouse_id == warehouse_id
            )

        if product_id:

            query = query.filter(
                Inventory.product_id == product_id
            )

        if low_stock:

            query = query.filter(
                Inventory.quantity <= Inventory.minimum_stock
            )

        offset = (page - 1) * limit

        inventories = (
            query
            .offset(offset)
            .limit(limit)
            .all()
        )

        return inventories

    # =====================================================
    # GET INVENTORY BY ID
    # =====================================================

    @staticmethod
    def get_inventory(
        db: Session,
        inventory_id: int,
    ):

        inventory = (
            db.query(Inventory)
            .options(
                joinedload(Inventory.product),
                joinedload(Inventory.warehouse),
            )
            .filter(
                Inventory.id == inventory_id
            )
            .first()
        )

        if inventory is None:

            raise HTTPException(
                status_code=404,
                detail="Inventory not found",
            )

        return inventory
    # =====================================================
    # UPDATE INVENTORY
    # =====================================================

    @staticmethod
    def update_inventory(
        db: Session,
        inventory_id: int,
        data,
        current_user,
    ):

        inventory = InventoryService.get_inventory(
            db=db,
            inventory_id=inventory_id,
        )

        update_data = data.model_dump(
            exclude_unset=True
        )

        minimum_stock = update_data.get(
            "minimum_stock",
            inventory.minimum_stock,
        )

        maximum_stock = update_data.get(
            "maximum_stock",
            inventory.maximum_stock,
        )

        if minimum_stock > maximum_stock:

            raise HTTPException(
                status_code=400,
                detail="Minimum stock cannot exceed maximum stock",
            )

        for key, value in update_data.items():

            setattr(
                inventory,
                key,
                value,
            )

        db.commit()

        db.refresh(inventory)

        AuditService.log(
            db=db,
            user_id=current_user.id,
            action="UPDATE",
            module="Inventory",
            description=(
                f"Updated inventory "
                f"#{inventory.id}"
            ),
        )

        NotificationService.create_notification(
            db=db,
            user_id=current_user.id,
            title="Inventory Updated",
            message=(
                f"Inventory "
                f"#{inventory.id} updated successfully."
            ),
            notification_type="info",
            priority="normal",
        )

        logger.info(
            f"{current_user.email} updated "
            f"inventory {inventory.id}"
        )

        return inventory


    # =====================================================
    # DELETE INVENTORY
    # =====================================================

    @staticmethod
    def delete_inventory(
        db: Session,
        inventory_id: int,
        current_user,
    ):

        inventory = InventoryService.get_inventory(
            db=db,
            inventory_id=inventory_id,
        )

        if inventory.quantity > 0:

            raise HTTPException(
                status_code=400,
                detail=(
                    "Cannot delete inventory "
                    "with available stock"
                ),
            )

        db.delete(inventory)

        db.commit()

        AuditService.log(
            db=db,
            user_id=current_user.id,
            action="DELETE",
            module="Inventory",
            description=(
                f"Deleted inventory "
                f"#{inventory.id}"
            ),
        )

        NotificationService.create_notification(
            db=db,
            user_id=current_user.id,
            title="Inventory Deleted",
            message=(
                f"Inventory "
                f"#{inventory.id} deleted successfully."
            ),
            notification_type="warning",
            priority="high",
        )

        logger.info(
            f"{current_user.email} deleted "
            f"inventory {inventory.id}"
        )

        return {
            "success": True,
            "message": "Inventory deleted successfully",
        }
    # =====================================================
    # INVENTORY STATISTICS
    # =====================================================

    @staticmethod
    def get_inventory_statistics(
        db: Session,
    ):

        inventories = db.query(Inventory).all()

        total_inventory = len(inventories)

        total_quantity = sum(
            item.quantity
            for item in inventories
        )

        low_stock_items = len(
            [
                item
                for item in inventories
                if item.quantity <= item.minimum_stock
            ]
        )

        out_of_stock = len(
            [
                item
                for item in inventories
                if item.quantity == 0
            ]
        )

        average_quantity = (
            total_quantity / total_inventory
            if total_inventory
            else 0
        )

        return {
            "total_inventory_records": total_inventory,
            "total_quantity": total_quantity,
            "average_quantity": round(
                average_quantity,
                2,
            ),
            "low_stock_items": low_stock_items,
            "out_of_stock_items": out_of_stock,
        }

    # =====================================================
    # INVENTORY BY WAREHOUSE
    # =====================================================

    @staticmethod
    def get_inventory_by_warehouse(
        db: Session,
        warehouse_id: int,
    ):

        warehouse = (
            db.query(Warehouse)
            .filter(
                Warehouse.id == warehouse_id
            )
            .first()
        )

        if warehouse is None:

            raise HTTPException(
                status_code=404,
                detail="Warehouse not found",
            )

        return (
            db.query(Inventory)
            .options(
                joinedload(Inventory.product),
                joinedload(Inventory.warehouse),
            )
            .filter(
                Inventory.warehouse_id == warehouse_id
            )
            .all()
        )

    # =====================================================
    # INVENTORY BY PRODUCT
    # =====================================================

    @staticmethod
    def get_inventory_by_product(
        db: Session,
        product_id: int,
    ):

        product = (
            db.query(Product)
            .filter(
                Product.id == product_id
            )
            .first()
        )

        if product is None:

            raise HTTPException(
                status_code=404,
                detail="Product not found",
            )

        return (
            db.query(Inventory)
            .options(
                joinedload(Inventory.product),
                joinedload(Inventory.warehouse),
            )
            .filter(
                Inventory.product_id == product_id
            )
            .all()
        )

    # =====================================================
    # LOW STOCK INVENTORY
    # =====================================================

    @staticmethod
    def get_low_stock_inventory(
        db: Session,
    ):

        return (
            db.query(Inventory)
            .options(
                joinedload(Inventory.product),
                joinedload(Inventory.warehouse),
            )
            .filter(
                Inventory.quantity <= Inventory.minimum_stock
            )
            .all()
        )