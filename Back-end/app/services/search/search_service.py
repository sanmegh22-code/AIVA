from sqlalchemy import or_
from sqlalchemy.orm import Session

from app.db.models import (
    Product,
    Supplier,
    Category,
    Warehouse,
)


class SearchService:

    @staticmethod
    def global_search(
        db: Session,
        query: str,
    ):

        query = query.strip()

        if not query:
            return {
                "products": [],
                "suppliers": [],
                "categories": [],
                "warehouses": [],
            }

        search = f"%{query}%"

        products = (
            db.query(Product)
            .filter(
                or_(
                    Product.name.ilike(search),
                    Product.sku.ilike(search),
                    Product.category.ilike(search),
                )
            )
            .order_by(Product.name)
            .limit(20)
            .all()
        )

        suppliers = (
            db.query(Supplier)
            .filter(
                or_(
                    Supplier.name.ilike(search),
                    Supplier.email.ilike(search),
                    Supplier.phone.ilike(search),
                    Supplier.city.ilike(search),
                    Supplier.state.ilike(search),
                )
            )
            .order_by(Supplier.name)
            .limit(20)
            .all()
        )

        categories = (
            db.query(Category)
            .filter(
                or_(
                    Category.name.ilike(search),
                    Category.description.ilike(search),
                )
            )
            .order_by(Category.name)
            .limit(20)
            .all()
        )

        warehouses = (
            db.query(Warehouse)
            .filter(
                or_(
                    Warehouse.name.ilike(search),
                    Warehouse.code.ilike(search),
                    Warehouse.address.ilike(search),
                    Warehouse.manager.ilike(search),
                )
            )
            .order_by(Warehouse.name)
            .limit(20)
            .all()
        )

        return {
            "products": [
                {
                    "id": p.id,
                    "name": p.name,
                    "type": "Product",
                }
                for p in products
            ],
            "suppliers": [
                {
                    "id": s.id,
                    "name": s.name,
                    "type": "Supplier",
                }
                for s in suppliers
            ],
            "categories": [
                {
                    "id": c.id,
                    "name": c.name,
                    "type": "Category",
                }
                for c in categories
            ],
            "warehouses": [
                {
                    "id": w.id,
                    "name": w.name,
                    "type": "Warehouse",
                }
                for w in warehouses
            ],
        }