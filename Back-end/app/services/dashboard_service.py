from sqlalchemy.orm import Session

from app.db.models import (
    AuditLog,
    Inventory,
    Notification,
    Product,
    StockMovement,
    Supplier,
    Warehouse,
)


class DashboardService:

    # =====================================================
    # DASHBOARD SUMMARY
    # =====================================================

    @staticmethod
    def get_dashboard_summary(
        db: Session,
    ):

        total_products = db.query(Product).count()

        total_suppliers = db.query(Supplier).count()

        total_warehouses = db.query(Warehouse).count()

        total_inventory = db.query(Inventory).count()

        total_stock = sum(
            item.quantity
            for item in db.query(Inventory).all()
        )

        inventory_value = sum(
            item.quantity * item.product.price
            for item in db.query(Inventory).all()
            if item.product
        )

        low_stock = len(
            [
                item
                for item in db.query(Inventory).all()
                if item.quantity <= item.minimum_stock
            ]
        )

        out_of_stock = len(
            [
                item
                for item in db.query(Inventory).all()
                if item.quantity == 0
            ]
        )

        return {
            "products": total_products,
            "suppliers": total_suppliers,
            "warehouses": total_warehouses,
            "inventory_records": total_inventory,
            "total_stock": total_stock,
            "inventory_value": round(
                inventory_value,
                2,
            ),
            "low_stock_items": low_stock,
            "out_of_stock_items": out_of_stock,
        }

    # =====================================================
    # RECENT STOCK MOVEMENTS
    # =====================================================

    @staticmethod
    def get_recent_stock(
        db: Session,
        limit: int = 10,
    ):
        recent_stock = (
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

                "quantity": movement.quantity,

                "performed_by": (
                    movement.user.email
                    if movement.user
                    else None
                ),

                "created_at": movement.created_at,
            }
            for movement in recent_stock
        ]

    # =====================================================
    # RECENT NOTIFICATIONS
    # =====================================================

    @staticmethod
    def get_recent_notifications(
        db: Session,
        limit: int = 10,
    ):

        notifications = (
            db.query(Notification)
            .order_by(
                Notification.created_at.desc()
            )
            .limit(limit)
            .all()
        )

        return [
            {
                "id": notification.id,

                "title": notification.title,

                "message": notification.message,

                "priority": notification.priority,

                "type": notification.notification_type,

                "is_read": notification.is_read,

                "created_at": notification.created_at,
            }
            for notification in notifications
        ]

    # =====================================================
    # RECENT AUDIT LOGS
    # =====================================================

    @staticmethod
    def get_recent_audits(
        db: Session,
        limit: int = 10,
    ):

        audits = (
            db.query(AuditLog)
            .order_by(
                AuditLog.created_at.desc()
            )
            .limit(limit)
            .all()
        )

        return [
            {
                "id": audit.id,

                "module": audit.module,

                "action": audit.action,

                "description": audit.description,

                "user_id": audit.user_id,

                "created_at": audit.created_at,
            }
            for audit in audits
        ]

    # =====================================================
    # DASHBOARD CHART DATA
    # =====================================================

    @staticmethod
    def get_dashboard_charts(
        db: Session,
    ):
        # ==========================================
        # PRODUCT CATEGORY DISTRIBUTION
        # ==========================================

        products = db.query(Product).all()

        category_distribution = {}

        for product in products:

            category = product.category or "General"

            category_distribution[category] = (
                category_distribution.get(category, 0) + 1
            )

        # ==========================================
        # WAREHOUSE STOCK DISTRIBUTION
        # ==========================================

        warehouses = db.query(Warehouse).all()

        warehouse_distribution = []

        for warehouse in warehouses:

            total_stock = sum(
                inventory.quantity
                for inventory in warehouse.inventories
            )

            warehouse_distribution.append(
                {
                    "warehouse": warehouse.name,
                    "stock": total_stock,
                }
            )

        # ==========================================
        # TOP PRODUCTS
        # ==========================================

        top_products = sorted(
            products,
            key=lambda product: product.quantity,
            reverse=True,
        )[:5]

        top_products_data = []

        for product in top_products:

            top_products_data.append(
                {
                    "id": product.id,
                    "name": product.name,
                    "sku": product.sku,
                    "quantity": product.quantity,
                    "price": product.price,
                }
            )

        # ==========================================
        # LOW STOCK PRODUCTS
        # ==========================================

        low_stock_products = []

        for inventory in db.query(Inventory).all():

            if inventory.quantity <= inventory.minimum_stock:

                low_stock_products.append(
                    {
                        "inventory_id": inventory.id,
                        "product": (
                            inventory.product.name
                            if inventory.product
                            else None
                        ),
                        "warehouse": (
                            inventory.warehouse.name
                            if inventory.warehouse
                            else None
                        ),
                        "quantity": inventory.quantity,
                        "minimum_stock": inventory.minimum_stock,
                    }
                )

        return {
            "category_distribution": category_distribution,
            "warehouse_distribution": warehouse_distribution,
            "top_products": top_products_data,
            "low_stock_products": low_stock_products,
        }

    # =====================================================
    # COMPLETE DASHBOARD
    # =====================================================

    @staticmethod
    def get_complete_dashboard(
        db: Session,
    ):

        return {

            "summary":
                DashboardService.get_dashboard_summary(db),

            "recent_stock":
                DashboardService.get_recent_stock(db),

            "notifications":
                DashboardService.get_recent_notifications(db),

            "audit_logs":
                DashboardService.get_recent_audits(db),

            "charts":
                DashboardService.get_dashboard_charts(db),
        }
