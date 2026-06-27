from datetime import datetime

from sqlalchemy import (
    Column,
    DateTime,
    Float,
    ForeignKey,
    Integer,
    String,
    Text,
)
from sqlalchemy.orm import relationship

from .database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(String, default="staff")


class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)
    description = Column(String, nullable=True)


class Warehouse(Base):
    __tablename__ = "warehouses"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(
        String,
        nullable=False
    )

    code = Column(
        String,
        unique=True,
        nullable=False
    )

    address = Column(
        String,
        nullable=False
    )

    manager = Column(
        String,
        nullable=False
    )

    phone = Column(
        String,
        nullable=False
    )

    status = Column(
        String,
        default="Active"
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )

    inventories = relationship(
        "Inventory",
        back_populates="warehouse"
    )


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(
        String,
        nullable=False
    )

    sku = Column(
        String,
        unique=True,
        nullable=False
    )

    price = Column(
        Float,
        default=0
    )

    category = Column(
        String,
        default="General"
    )

    image_url = Column(
        String,
        nullable=True
    )

    inventories = relationship(
        "Inventory",
        back_populates="product"
    )


class Inventory(Base):
    __tablename__ = "inventory"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    product_id = Column(
        Integer,
        ForeignKey("products.id"),
        nullable=False
    )

    warehouse_id = Column(
        Integer,
        ForeignKey("warehouses.id"),
        nullable=False
    )

    quantity = Column(
        Integer,
        default=0
    )

    minimum_stock = Column(
        Integer,
        default=5
    )

    maximum_stock = Column(
        Integer,
        default=1000
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )

    product = relationship(
        "Product",
        back_populates="inventories"
    )

    warehouse = relationship(
        "Warehouse",
        back_populates="inventories"
    )

    stock_movements = relationship(
        "StockMovement",
        back_populates="inventory",
        cascade="all, delete-orphan"
    )


class StockMovement(Base):
    __tablename__ = "stock_movements"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    inventory_id = Column(
        Integer,
        ForeignKey("inventory.id"),
        nullable=False
    )

    product_id = Column(
        Integer,
        ForeignKey("products.id"),
        nullable=False
    )

    warehouse_id = Column(
        Integer,
        ForeignKey("warehouses.id"),
        nullable=False
    )

    movement_type = Column(
        String,
        nullable=False
    )

    quantity = Column(
        Integer,
        nullable=False
    )

    reference = Column(
        String,
        nullable=True
    )

    remarks = Column(
        Text,
        nullable=True
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    inventory = relationship(
        "Inventory",
        back_populates="stock_movements"
    )

    product = relationship(
        "Product"
    )

    warehouse = relationship(
        "Warehouse"
    )