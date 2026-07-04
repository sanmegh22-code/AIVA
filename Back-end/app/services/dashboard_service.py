from sqlalchemy.orm import Session

from app.db.models import (
    Product,
    Category,
    Warehouse,
    Inventory,
    StockMovement,
)


class DashboardService:

    @staticmethod
    def get_summary(db: Session):

        total_products = db.query(Product).count()

        total_categories = db.query(Category).count()

        total_warehouses = db.query(Warehouse).count()

        total_inventory = db.query(Inventory).count()

        low_stock = (
            db.query(Inventory)
            .filter(
                Inventory.quantity <= Inventory.minimum_stock
            )
            .count()
        )
        inventory_value = 0

        inventories = (
            db.query(Inventory)
            .all()
        )

        healthy_inventory = 0
        out_of_stock = 0

        for item in inventories:

            if item.product is not None:
                inventory_value += (
                    item.quantity *
                    item.product.price
                )

            if item.quantity == 0:
                out_of_stock += 1

            elif item.quantity > item.minimum_stock:
                healthy_inventory += 1

        return {
            "total_products": total_products,
            "total_categories": total_categories,
            "total_warehouses": total_warehouses,
            "total_inventory": total_inventory,
            "low_stock": low_stock,
            "inventory_value": inventory_value,
            "healthy_inventory": healthy_inventory,
            "out_of_stock": out_of_stock,
        }

    @staticmethod
    def get_recent_movements(db: Session):

        movements = (
            db.query(StockMovement)
            .order_by(
                StockMovement.created_at.desc()
            )
            .limit(10)
            .all()
        )

        results = []

        for movement in movements:

            results.append({
                "id": movement.id,
                "movement_type": movement.movement_type,
                "product_id": movement.product_id,
                "warehouse_id": movement.warehouse_id,
                "quantity": movement.quantity,
                "reference": movement.reference,
                "remarks": movement.remarks,
                "created_at": movement.created_at,
            })

        return results

    @staticmethod
    def get_chart_data(db: Session):
        category_data = []
        categories = db.query(Category).all()
        for category in categories:
            count = (
                db.query(Product)
                .filter(
                    Product.category == category.name
                )
                .count()
            )
            category_data.append({
                "category": category.name,
                "count": count,
            })

        warehouse_data = []
        warehouses = db.query(Warehouse).all()
        for warehouse in warehouses:
            count = (
                db.query(Inventory)
                .filter(
                    Inventory.warehouse_id == warehouse.id
                )
                .count()
            )
            warehouse_data.append({
                "warehouse": warehouse.name,
                "count": count,
            })

        return {
            "inventory_by_category": category_data,
            "inventory_by_warehouse": warehouse_data,
        }