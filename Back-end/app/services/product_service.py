from fastapi import HTTPException
from sqlalchemy import or_
from sqlalchemy.orm import Session

from app.core.logger import logger
from app.db.models import Product
from app.services.audit.audit_service import AuditService
from app.services.notifications.notification_service import (
    NotificationService,
)


class ProductService:

    # =====================================================
    # CREATE PRODUCT
    # =====================================================

    @staticmethod
    def create_product(
        db: Session,
        data,
        current_user,
    ):

        existing = (
            db.query(Product)
            .filter(
                Product.sku == data.sku
            )
            .first()
        )

        if existing:

            raise HTTPException(
                status_code=400,
                detail="SKU already exists",
            )

        product = Product(
            name=data.name,
            sku=data.sku,
            price=data.price,
            category=data.category,
            quantity=data.quantity,
        )

        db.add(product)

        db.commit()

        db.refresh(product)

        AuditService.log(
            db=db,
            user_id=current_user.id,
            action="CREATE",
            module="Products",
            description=(
                f"Created product "
                f"'{product.name}' "
                f"(SKU: {product.sku})"
            ),
        )

        NotificationService.create_notification(
            db=db,
            user_id=current_user.id,
            title="Product Created",
            message=f"{product.name} created successfully.",
            notification_type="success",
            priority="normal",
        )

        logger.info(
            f"{current_user.email} created "
            f"{product.name}"
        )

        return product

    # =====================================================
    # GET PRODUCTS
    # =====================================================

    @staticmethod
    def get_products(
        db: Session,
        search=None,
        category=None,
        status=None,
        page=1,
        limit=10,
        sort="id",
    ):
        query = db.query(Product)

        # ==========================================
        # SEARCH
        # ==========================================

        if search:

            query = query.filter(
                or_(
                    Product.name.ilike(f"%{search}%"),
                    Product.sku.ilike(f"%{search}%"),
                )
            )

        # ==========================================
        # CATEGORY FILTER
        # ==========================================

        if category:

            query = query.filter(
                Product.category.ilike(category)
            )

        # ==========================================
        # STATUS FILTER
        # ==========================================

        if status:

            status = status.lower()

            if status == "available":

                query = query.filter(
                    Product.quantity > 0
                )

            elif status in (
                "outofstock",
                "out_of_stock",
                "out-of-stock",
            ):

                query = query.filter(
                    Product.quantity == 0
                )

        # ==========================================
        # SORTING
        # ==========================================

        if sort == "name":

            query = query.order_by(
                Product.name
            )

        elif sort == "price":

            query = query.order_by(
                Product.price
            )

        elif sort == "quantity":

            query = query.order_by(
                Product.quantity.desc()
            )

        else:

            query = query.order_by(
                Product.id.desc()
            )

        # ==========================================
        # PAGINATION
        # ==========================================

        offset = (page - 1) * limit

        products = (
            query
            .offset(offset)
            .limit(limit)
            .all()
        )

        return products

    # =====================================================
    # GET PRODUCT
    # =====================================================

    @staticmethod
    def get_product(
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

        return product

    # =====================================================
    # UPDATE PRODUCT
    # =====================================================

    @staticmethod
    def update_product(
        db: Session,
        product_id: int,
        data,
        current_user,
    ):

        product = ProductService.get_product(
            db=db,
            product_id=product_id,
        )

        update_data = data.model_dump(
            exclude_unset=True
        )

        if "sku" in update_data:

            existing = (
                db.query(Product)
                .filter(
                    Product.sku == update_data["sku"],
                    Product.id != product_id,
                )
                .first()
            )

            if existing:

                raise HTTPException(
                    status_code=400,
                    detail="SKU already exists",
                )

        for key, value in update_data.items():

            setattr(
                product,
                key,
                value,
            )

        db.commit()

        db.refresh(product)

        AuditService.log(
            db=db,
            user_id=current_user.id,
            action="UPDATE",
            module="Products",
            description=(
                f"Updated product "
                f"'{product.name}' "
                f"(SKU: {product.sku})"
            ),
        )

        NotificationService.create_notification(
            db=db,
            user_id=current_user.id,
            title="Product Updated",
            message=(
                f"{product.name} updated successfully."
            ),
            notification_type="info",
            priority="normal",
        )

        logger.info(
            f"{current_user.email} updated "
            f"{product.name}"
        )

        return product

    # =====================================================
    # DELETE PRODUCT
    # =====================================================

    @staticmethod
    def delete_product(
        db: Session,
        product_id: int,
        current_user,
    ):
        product = ProductService.get_product(
            db=db,
            product_id=product_id,
        )

        db.delete(product)

        db.commit()

        AuditService.log(
            db=db,
            user_id=current_user.id,
            action="DELETE",
            module="Products",
            description=(
                f"Deleted product "
                f"'{product.name}' "
                f"(SKU: {product.sku})"
            ),
        )

        NotificationService.create_notification(
            db=db,
            user_id=current_user.id,
            title="Product Deleted",
            message=(
                f"{product.name} deleted successfully."
            ),
            notification_type="warning",
            priority="high",
        )

        logger.info(
            f"{current_user.email} deleted "
            f"{product.name}"
        )

        return {
            "success": True,
            "message": "Product deleted successfully",
        }

    # =====================================================
    # LOW STOCK PRODUCTS
    # =====================================================

    @staticmethod
    def get_low_stock_products(
        db: Session,
    ):

        return (
            db.query(Product)
            .filter(
                Product.quantity <= 10
            )
            .order_by(
                Product.quantity.asc()
            )
            .all()
        )

    # =====================================================
    # PRODUCT STATISTICS
    # =====================================================

    @staticmethod
    def get_product_statistics(
        db: Session,
    ):

        products = db.query(Product).all()

        total_products = len(products)

        available_products = len(
            [
                product
                for product in products
                if product.quantity > 0
            ]
        )

        out_of_stock = len(
            [
                product
                for product in products
                if product.quantity == 0
            ]
        )

        low_stock = len(
            [
                product
                for product in products
                if 0 < product.quantity <= 10
            ]
        )

        total_inventory_value = sum(
            product.price * product.quantity
            for product in products
        )

        average_price = (
            sum(
                product.price
                for product in products
            ) / total_products
            if total_products
            else 0
        )

        return {
            "total_products": total_products,
            "available_products": available_products,
            "out_of_stock_products": out_of_stock,
            "low_stock_products": low_stock,
            "total_inventory_value": round(
                total_inventory_value,
                2,
            ),
            "average_product_price": round(
                average_price,
                2,
            ),
        }

    # =====================================================
    # DASHBOARD SUMMARY
    # =====================================================

    @staticmethod
    def get_dashboard_summary(
        db: Session,
    ):

        stats = ProductService.get_product_statistics(
            db
        )

        recent_products = (
            db.query(Product)
            .order_by(
                Product.id.desc()
            )
            .limit(5)
            .all()
        )

        return {
            "statistics": stats,
            "recent_products": recent_products,
        }