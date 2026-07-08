from sqlalchemy import func
from sqlalchemy.orm import Session

from app.db.models import (
    Category,
    Inventory,
    Product,
    StockMovement,
    Supplier,
    Warehouse,
)


class ReportAnalytics:

    @staticmethod
    def get_summary(db: Session):

        total_products = db.query(Product).count()
        total_categories = db.query(Category).count()
        total_suppliers = db.query(Supplier).count()
        total_warehouses = db.query(Warehouse).count()

        inventories = db.query(Inventory).all()

        total_inventory = len(inventories)

        inventory_value = 0
        low_stock = 0
        out_of_stock = 0
        total_quantity = 0

        for item in inventories:

            total_quantity += item.quantity

            if item.product:
                inventory_value += (
                    item.quantity * item.product.price
                )

            if item.quantity == 0:
                out_of_stock += 1

            elif item.quantity <= item.minimum_stock:
                low_stock += 1

        average_inventory_value = (
            inventory_value / total_products
            if total_products
            else 0
        )

        average_quantity = (
            total_quantity / total_products
            if total_products
            else 0
        )

        stock_health = (
            (
                total_inventory
                - low_stock
                - out_of_stock
            )
            / total_inventory
            * 100
            if total_inventory
            else 0
        )

        warehouse_utilization = (
            total_inventory / total_warehouses
            if total_warehouses
            else 0
        )

        return {
            "total_products": total_products,
            "total_categories": total_categories,
            "total_suppliers": total_suppliers,
            "total_warehouses": total_warehouses,
            "total_inventory": total_inventory,
            "inventory_value": inventory_value,
            "low_stock": low_stock,
            "out_of_stock": out_of_stock,
            "average_inventory_value": round(
                average_inventory_value,
                2,
            ),
            "average_quantity": round(
                average_quantity,
                2,
            ),
            "stock_health": round(
                stock_health,
                2,
            ),
            "warehouse_utilization": round(
                warehouse_utilization,
                2,
            ),
        }

    @staticmethod
    def get_category_distribution(db: Session):

        categories = (
            db.query(
                Product.category,
                func.count(Product.id),
            )
            .group_by(Product.category)
            .all()
        )

        return categories

    @staticmethod
    def get_top_products(db: Session):

        products = (
            db.query(
                Product,
                func.coalesce(
                    func.sum(Inventory.quantity),
                    0,
                ).label("total_quantity"),
            )
            .outerjoin(
                Inventory,
                Product.id == Inventory.product_id,
            )
            .group_by(Product.id)
            .order_by(
                func.coalesce(
                    func.sum(Inventory.quantity),
                    0,
                ).desc()
            )
            .limit(10)
            .all()
        )

        result = []

        for product, total_quantity in products:

            product.total_quantity = total_quantity

            result.append(product)

        return result

    @staticmethod
    def get_low_stock_products(db: Session):

        return (
            db.query(Inventory)
            .join(Product)
            .filter(
                Inventory.quantity
                <= Inventory.minimum_stock
            )
            .order_by(
                Inventory.quantity.asc()
            )
            .all()
        )

    @staticmethod
    def get_stock_movements(db: Session):

        total_in = (
            db.query(
                func.sum(
                    StockMovement.quantity
                )
            )
            .filter(
                StockMovement.movement_type == "IN"
            )
            .scalar()
            or 0
        )

        total_out = (
            db.query(
                func.sum(
                    StockMovement.quantity
                )
            )
            .filter(
                StockMovement.movement_type == "OUT"
            )
            .scalar()
            or 0
        )

        return {
            "total_in": total_in,
            "total_out": total_out,
            "net_stock": total_in - total_out,
        }

    @staticmethod
    def get_complete_report(db: Session):

        return {
            "summary": ReportAnalytics.get_summary(db),
            "categories": ReportAnalytics.get_category_distribution(db),
            "top_products": ReportAnalytics.get_top_products(db),
            "low_stock": ReportAnalytics.get_low_stock_products(db),
            "movements": ReportAnalytics.get_stock_movements(db),
        }