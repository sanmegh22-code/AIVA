from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.core.logger import logger
from app.db.models import (
    Inventory,
    Product,
    StockMovement,
)


class StockService:

    # =====================================================
    # STOCK IN
    # =====================================================

    @staticmethod
    def stock_in(
        db: Session,
        data,
        current_user,
    ):

        inventory = (
            db.query(Inventory)
            .filter(
                Inventory.id == data.inventory_id
            )
            .first()
        )

        if inventory is None:

            raise HTTPException(
                status_code=404,
                detail="Inventory not found",
            )

        if data.quantity <= 0:

            raise HTTPException(
                status_code=400,
                detail="Quantity must be greater than zero",
            )

        inventory.quantity += data.quantity

        movement = StockMovement(

            inventory_id=inventory.id,

            product_id=inventory.product_id,

            warehouse_id=inventory.warehouse_id,

            user_id=current_user.id,

            movement_type="STOCK_IN",

            quantity=data.quantity,

            reference=data.reference,

            remarks=data.remarks,
        )

        db.add(movement)

        db.commit()

        db.refresh(inventory)

        logger.info(

            f"{current_user.email} added "

            f"{data.quantity} units "

            f"to inventory {inventory.id}"

        )

        return {

            "success": True,

            "message": "Stock added successfully",

            "inventory_id": inventory.id,

            "current_stock": inventory.quantity,

        }

    # =====================================================
    # STOCK OUT
    # =====================================================

    @staticmethod
    def stock_out(
        db: Session,
        data,
        current_user,
    ):

        inventory = (
            db.query(Inventory)
            .filter(
                Inventory.id == data.inventory_id
            )
            .first()
        )

        if inventory is None:

            raise HTTPException(
                status_code=404,
                detail="Inventory not found",
            )

        if data.quantity <= 0:

            raise HTTPException(
                status_code=400,
                detail="Quantity must be greater than zero",
            )

        if inventory.quantity < data.quantity:

            raise HTTPException(
                status_code=400,
                detail="Insufficient stock",
            )

        inventory.quantity -= data.quantity

        movement = StockMovement(

            inventory_id=inventory.id,

            product_id=inventory.product_id,

            warehouse_id=inventory.warehouse_id,

            user_id=current_user.id,

            movement_type="STOCK_OUT",

            quantity=data.quantity,

            reference=data.reference,

            remarks=data.remarks,
        )

        db.add(movement)

        db.commit()

        db.refresh(inventory)

        logger.info(

            f"{current_user.email} removed "

            f"{data.quantity} units "

            f"from inventory {inventory.id}"

        )

        return {

            "success": True,

            "message": "Stock removed successfully",

            "inventory_id": inventory.id,

            "current_stock": inventory.quantity,

        }

    # =====================================================
    # STOCK TRANSFER
    # =====================================================

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
            .filter(
                Inventory.id == data.from_inventory_id
            )
            .first()
        )

        if source is None:

            raise HTTPException(
                status_code=404,
                detail="Source inventory not found",
            )

        destination = (
            db.query(Inventory)
            .filter(
                Inventory.id == data.to_inventory_id
            )
            .first()
        )

        if destination is None:

            raise HTTPException(
                status_code=404,
                detail="Destination inventory not found",
            )

        if source.id == destination.id:

            raise HTTPException(
                status_code=400,
                detail="Source and destination cannot be the same",
            )

        if source.product_id != destination.product_id:

            raise HTTPException(
                status_code=400,
                detail="Products do not match",
            )

        if source.warehouse_id == destination.warehouse_id:

            raise HTTPException(
                status_code=400,
                detail="Both inventories belong to the same warehouse",
            )

        if data.quantity <= 0:

            raise HTTPException(
                status_code=400,
                detail="Quantity must be greater than zero",
            )

        if source.quantity < data.quantity:

            raise HTTPException(
                status_code=400,
                detail="Insufficient stock",
            )

        try:

            source.quantity -= data.quantity

            destination.quantity += data.quantity

            out_movement = StockMovement(

                inventory_id=source.id,

                product_id=source.product_id,

                warehouse_id=source.warehouse_id,

                user_id=current_user.id,

                movement_type="STOCK_OUT",

                quantity=data.quantity,

                reference="TRANSFER",

                remarks=data.remarks,

            )

            in_movement = StockMovement(

                inventory_id=destination.id,

                product_id=destination.product_id,

                warehouse_id=destination.warehouse_id,

                user_id=current_user.id,

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

            raise HTTPException(

                status_code=500,

                detail="Stock transfer failed",

            )

        logger.info(

            f"{current_user.email} transferred "

            f"{data.quantity} units "

            f"from inventory {source.id} "

            f"to inventory {destination.id}"

        )

        return {

            "success": True,

            "message": "Stock transferred successfully",

            "from_inventory": source.id,

            "to_inventory": destination.id,

            "remaining_stock": source.quantity,

            "received_stock": destination.quantity,

        }

    # =====================================================
    # STOCK ADJUSTMENT
    # =====================================================

    @staticmethod
    def stock_adjustment(
        db: Session,
        data,
        current_user,
    ):
        """
        Adjust inventory quantity.
        """

        inventory = (
            db.query(Inventory)
            .filter(
                Inventory.id == data.inventory_id
            )
            .first()
        )

        if inventory is None:
            raise HTTPException(
                status_code=404,
                detail="Inventory not found",
            )

        if data.quantity < 0:
            raise HTTPException(
                status_code=400,
                detail="Quantity cannot be negative",
            )

        old_quantity = inventory.quantity

        inventory.quantity = data.quantity

        movement = StockMovement(
            inventory_id=inventory.id,
            product_id=inventory.product_id,
            warehouse_id=inventory.warehouse_id,
            user_id=current_user.id,
            movement_type="STOCK_ADJUSTMENT",
            quantity=data.quantity - old_quantity,
            reference="ADJUSTMENT",
            remarks=data.remarks,
        )

        db.add(movement)

        db.commit()

        db.refresh(inventory)

        logger.info(
            f"{current_user.email} adjusted inventory "
            f"{inventory.id} "
            f"from {old_quantity} "
            f"to {inventory.quantity}"
        )

        return {
            "success": True,
            "message": "Inventory adjusted successfully",
            "inventory_id": inventory.id,
            "previous_quantity": old_quantity,
            "current_quantity": inventory.quantity,
        }

    # =====================================================
    # STOCK HISTORY
    # =====================================================

    @staticmethod
    def get_stock_history(
        db: Session,
    ):

        history = (
            db.query(StockMovement)
            .order_by(
                StockMovement.created_at.desc()
            )
            .all()
        )

        results = []

        for movement in history:

            results.append(
                {
                    "id": movement.id,

                    "movement_type": movement.movement_type,

                    "inventory_id": movement.inventory_id,

                    "product_id": movement.product_id,

                    "product_name": (
                        movement.product.name
                        if movement.product
                        else None
                    ),

                    "warehouse_id": movement.warehouse_id,

                    "warehouse_name": (
                        movement.warehouse.name
                        if movement.warehouse
                        else None
                    ),

                    "user_id": movement.user_id,

                    "performed_by": (
                        movement.user.email
                        if movement.user
                        else None
                    ),

                    "quantity": movement.quantity,

                    "reference": movement.reference,

                    "remarks": movement.remarks,

                    "created_at": movement.created_at,
                }
            )

        return results

    # =====================================================
    # LOW STOCK
    # =====================================================

    @staticmethod
    def get_low_stock(
        db: Session,
    ):
        """
        Returns all low stock inventory.
        """

        inventory = (
            db.query(Inventory)
            .filter(
                Inventory.quantity <= Inventory.minimum_stock
            )
            .all()
        )

        results = []

        for item in inventory:

            results.append(
                {
                    "inventory_id": item.id,

                    "product_id": item.product_id,

                    "product_name": (
                        item.product.name
                        if item.product
                        else None
                    ),

                    "warehouse_id": item.warehouse_id,

                    "warehouse_name": (
                        item.warehouse.name
                        if item.warehouse
                        else None
                    ),

                    "quantity": item.quantity,

                    "minimum_stock": item.minimum_stock,

                    "maximum_stock": item.maximum_stock,
                }
            )

        return results

    # =====================================================
    # INVENTORY SUMMARY
    # =====================================================

    @staticmethod
    def get_inventory_summary(
        db: Session,
    ):

        inventories = db.query(Inventory).all()

        total_inventory = len(inventories)

        total_quantity = sum(
            item.quantity
            for item in inventories
        )

        low_stock = len(
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

        return {
            "total_inventory": total_inventory,
            "total_quantity": total_quantity,
            "low_stock": low_stock,
            "out_of_stock": out_of_stock,
        }

    # =====================================================
    # RECENT MOVEMENTS
    # =====================================================

    @staticmethod
    def get_recent_movements(
        db: Session,
        limit: int = 10,
    ):

        history = (
            db.query(StockMovement)
            .order_by(
                StockMovement.created_at.desc()
            )
            .limit(limit)
            .all()
        )

        return [
            {
                "id": movement.id,

                "movement_type": movement.movement_type,

                "product": (
                    movement.product.name
                    if movement.product
                    else None
                ),

                "warehouse": (
                    movement.warehouse.name
                    if movement.warehouse
                    else None
                ),

                "performed_by": (
                    movement.user.email
                    if movement.user
                    else None
                ),

                "quantity": movement.quantity,

                "reference": movement.reference,

                "remarks": movement.remarks,

                "created_at": movement.created_at,
            }
            for movement in history
        ]

    # =====================================================
    # STOCK STATISTICS
    # =====================================================

    @staticmethod
    def get_stock_statistics(
        db: Session,
    ):

        inventories = db.query(Inventory).all()

        total_quantity = sum(
            inventory.quantity
            for inventory in inventories
        )

        average_quantity = (
            total_quantity / len(inventories)
            if inventories
            else 0
        )

        return {
            "total_inventory_records": len(inventories),

            "total_quantity": total_quantity,

            "average_quantity": round(
                average_quantity,
                2,
            ),

            "low_stock_items": len(
                [
                    inventory
                    for inventory in inventories
                    if inventory.quantity <= inventory.minimum_stock
                ]
            ),
        }