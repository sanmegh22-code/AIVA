from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.core.logger import logger
from app.db.models import Inventory, StockMovement


class StockService:

    @staticmethod
    def stock_in(
        db: Session,
        data,
        current_user,
    ):
        """
        Add stock to an inventory.
        """

        inventory = (
            db.query(Inventory)
            .filter(Inventory.id == data.inventory_id)
            .first()
        )

        if inventory is None:
            raise HTTPException(status_code=404, detail="Inventory not found")

        if data.quantity <= 0:
            raise HTTPException(status_code=400, detail="Quantity must be greater than zero")

        inventory.quantity += data.quantity

        movement = StockMovement(
            inventory_id=inventory.id,
            product_id=inventory.product_id,
            warehouse_id=inventory.warehouse_id,
            movement_type="STOCK_IN",
            quantity=data.quantity,
            reference=data.reference,
            remarks=data.remarks,
        )

        db.add(movement)
        db.commit()
        db.refresh(inventory)

        logger.info(
            f"{current_user.email} added {data.quantity} units to inventory {inventory.id}"
        )

        return {
            "success": True,
            "message": "Stock added successfully",
            "inventory_id": inventory.id,
            "current_stock": inventory.quantity,
        }

    @staticmethod
    def stock_out(
        db: Session,
        data,
        current_user,
    ):
        """
        Remove stock from an inventory.
        """

        inventory = (
            db.query(Inventory)
            .filter(Inventory.id == data.inventory_id)
            .first()
        )

        if inventory is None:
            raise HTTPException(status_code=404, detail="Inventory not found")

        if data.quantity <= 0:
            raise HTTPException(status_code=400, detail="Quantity must be greater than zero")

        if inventory.quantity < data.quantity:
            raise HTTPException(status_code=400, detail="Insufficient stock")

        inventory.quantity -= data.quantity

        movement = StockMovement(
            inventory_id=inventory.id,
            product_id=inventory.product_id,
            warehouse_id=inventory.warehouse_id,
            movement_type="STOCK_OUT",
            quantity=data.quantity,
            reference=data.reference,
            remarks=data.remarks,
        )

        db.add(movement)
        db.commit()
        db.refresh(inventory)

        logger.info(
            f"{current_user.email} removed {data.quantity} units from inventory {inventory.id}"
        )

        return {
            "success": True,
            "message": "Stock removed successfully",
            "inventory_id": inventory.id,
            "current_stock": inventory.quantity,
        }

    @staticmethod
    def stock_transfer(
        db: Session,
        data,
        current_user,
    ):
        """
        Transfer stock between two inventories.
        """

        source = (
            db.query(Inventory)
            .filter(Inventory.id == data.from_inventory_id)
            .first()
        )

        if source is None:
            raise HTTPException(status_code=404, detail="Source inventory not found")

        destination = (
            db.query(Inventory)
            .filter(Inventory.id == data.to_inventory_id)
            .first()
        )

        if destination is None:
            raise HTTPException(status_code=404, detail="Destination inventory not found")

        if source.id == destination.id:
            raise HTTPException(status_code=400, detail="Source and destination cannot be the same")

        if source.product_id != destination.product_id:
            raise HTTPException(status_code=400, detail="Products do not match")

        if source.warehouse_id == destination.warehouse_id:
            raise HTTPException(status_code=400, detail="Both inventories belong to the same warehouse")

        if data.quantity <= 0:
            raise HTTPException(status_code=400, detail="Quantity must be greater than zero")

        if source.quantity < data.quantity:
            raise HTTPException(status_code=400, detail="Insufficient stock")

        try:
            source.quantity -= data.quantity
            destination.quantity += data.quantity

            out_movement = StockMovement(
                inventory_id=source.id,
                product_id=source.product_id,
                warehouse_id=source.warehouse_id,
                movement_type="STOCK_OUT",
                quantity=data.quantity,
                reference="TRANSFER",
                remarks=data.remarks,
            )

            in_movement = StockMovement(
                inventory_id=destination.id,
                product_id=destination.product_id,
                warehouse_id=destination.warehouse_id,
                movement_type="STOCK_IN",
                quantity=data.quantity,
                reference="TRANSFER",
                remarks=data.remarks,
            )

            db.add(out_movement)
            db.add(in_movement)
            db.commit()

            db.refresh(source)
            db.refresh(destination)
        except Exception:
            db.rollback()
            raise HTTPException(status_code=500, detail="Stock transfer failed")

        logger.info(
            f"{current_user.email} transferred {data.quantity} units from inventory {source.id} to inventory {destination.id}"
        )

        return {
            "success": True,
            "message": "Stock transferred successfully",
            "from_inventory": source.id,
            "to_inventory": destination.id,
            "remaining_stock": source.quantity,
            "received_stock": destination.quantity,
        }

    @staticmethod
    def stock_adjustment(
        db: Session,
        data,
        current_user,
    ):
        """
        Adjust inventory to the exact quantity.
        """

        inventory = (
            db.query(Inventory)
            .filter(Inventory.id == data.inventory_id)
            .first()
        )

        if inventory is None:
            raise HTTPException(status_code=404, detail="Inventory not found")

        if data.quantity < 0:
            raise HTTPException(status_code=400, detail="Quantity cannot be negative")

        old_quantity = inventory.quantity
        inventory.quantity = data.quantity

        movement = StockMovement(
            inventory_id=inventory.id,
            product_id=inventory.product_id,
            warehouse_id=inventory.warehouse_id,
            movement_type="STOCK_ADJUSTMENT",
            quantity=data.quantity - old_quantity,
            reference="ADJUSTMENT",
            remarks=data.remarks,
        )

        db.add(movement)
        db.commit()
        db.refresh(inventory)

        logger.info(
            f"{current_user.email} adjusted inventory {inventory.id} from {old_quantity} to {inventory.quantity}"
        )

        return {
            "success": True,
            "message": "Inventory adjusted successfully",
            "inventory_id": inventory.id,
            "previous_quantity": old_quantity,
            "current_quantity": inventory.quantity,
        }

    @staticmethod
    def get_stock_history(db: Session):
        history = (
            db.query(StockMovement)
            .order_by(StockMovement.created_at.desc())
            .all()
        )

        results = []

        for movement in history:
            results.append({
                "id": movement.id,
                "movement_type": movement.movement_type,
                "inventory_id": movement.inventory_id,
                "product_id": movement.product_id,
                "warehouse_id": movement.warehouse_id,
                "quantity": movement.quantity,
                "reference": movement.reference,
                "remarks": movement.remarks,
                "created_at": movement.created_at,
            })

        return results

    @staticmethod
    def get_low_stock(db: Session):
        inventory = (
            db.query(Inventory)
            .filter(Inventory.quantity <= Inventory.minimum_stock)
            .all()
        )

        results = []

        for item in inventory:
            results.append({
                "inventory_id": item.id,
                "product_id": item.product_id,
                "warehouse_id": item.warehouse_id,
                "quantity": item.quantity,
                "minimum_stock": item.minimum_stock,
                "maximum_stock": item.maximum_stock,
            })

        return results