from datetime import datetime

from sqlalchemy import (
    Boolean,
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

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    name = Column(
        String,
        nullable=False,
    )

    email = Column(
        String,
        unique=True,
        nullable=False,
    )

    hashed_password = Column(
        String,
        nullable=False,
    )

    role = Column(
        String,
        default="staff",
    )

    notifications = relationship(
        "Notification",
        back_populates="user",
        cascade="all, delete-orphan",
    )

    stock_movements = relationship(
        "StockMovement",
        back_populates="user",
    )

    audit_logs = relationship(
        "AuditLog",
        back_populates="user",
    )


class Category(Base):
    __tablename__ = "categories"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    name = Column(
        String,
        unique=True,
        nullable=False,
    )

    description = Column(
        String,
        nullable=True,
    )


class Warehouse(Base):
    __tablename__ = "warehouses"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    name = Column(
        String,
        nullable=False,
    )

    code = Column(
        String,
        unique=True,
        nullable=False,
    )

    address = Column(
        String,
        nullable=False,
    )

    manager = Column(
        String,
        nullable=False,
    )

    phone = Column(
        String,
        nullable=False,
    )

    status = Column(
        String,
        default="Active",
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
    )

    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
    )

    inventories = relationship(
        "Inventory",
        back_populates="warehouse",
    )

    stock_movements = relationship(
        "StockMovement",
        back_populates="warehouse",
    )
# ==========================================================
# Supplier
# ==========================================================

class Supplier(Base):
    __tablename__ = "suppliers"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    name = Column(
        String,
        nullable=False,
    )

    email = Column(
        String,
        unique=True,
        nullable=False,
    )

    phone = Column(
        String,
        nullable=False,
    )

    gst_number = Column(
        String,
        nullable=True,
    )

    address = Column(
        Text,
        nullable=True,
    )

    city = Column(
        String,
        nullable=True,
    )

    state = Column(
        String,
        nullable=True,
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
    )

    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
    )


# ==========================================================
# Product
# ==========================================================

class Product(Base):
    __tablename__ = "products"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    name = Column(
        String,
        nullable=False,
    )

    sku = Column(
        String,
        unique=True,
        nullable=False,
    )

    price = Column(
        Float,
        default=0,
    )

    category = Column(
        String,
        default="General",
    )

    quantity = Column(
        Integer,
        default=0,
        nullable=False,
    )

    image_url = Column(
        String,
        nullable=True,
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
    )

    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
    )

    inventories = relationship(
        "Inventory",
        back_populates="product",
        cascade="all, delete-orphan",
    )

    stock_movements = relationship(
        "StockMovement",
        back_populates="product",
    )
# ==========================================================
# Inventory
# ==========================================================

class Inventory(Base):
    __tablename__ = "inventory"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    product_id = Column(
        Integer,
        ForeignKey("products.id", ondelete="CASCADE"),
        nullable=False,
    )

    warehouse_id = Column(
        Integer,
        ForeignKey("warehouses.id", ondelete="CASCADE"),
        nullable=False,
    )

    quantity = Column(
        Integer,
        default=0,
        nullable=False,
    )

    minimum_stock = Column(
        Integer,
        default=5,
        nullable=False,
    )

    maximum_stock = Column(
        Integer,
        default=1000,
        nullable=False,
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
    )

    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
    )

    product = relationship(
        "Product",
        back_populates="inventories",
    )

    warehouse = relationship(
        "Warehouse",
        back_populates="inventories",
    )

    stock_movements = relationship(
        "StockMovement",
        back_populates="inventory",
        cascade="all, delete-orphan",
    )


# ==========================================================
# Stock Movement
# ==========================================================

class StockMovement(Base):
    __tablename__ = "stock_movements"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    inventory_id = Column(
        Integer,
        ForeignKey("inventory.id", ondelete="CASCADE"),
        nullable=False,
    )

    product_id = Column(
        Integer,
        ForeignKey("products.id", ondelete="CASCADE"),
        nullable=False,
    )

    warehouse_id = Column(
        Integer,
        ForeignKey("warehouses.id", ondelete="CASCADE"),
        nullable=False,
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id", ondelete="SET NULL"),
        nullable=True,
    )

    movement_type = Column(
        String(50),
        nullable=False,
    )

    quantity = Column(
        Integer,
        nullable=False,
    )

    reference = Column(
        String(100),
        nullable=True,
    )

    remarks = Column(
        Text,
        nullable=True,
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
    )

    inventory = relationship(
        "Inventory",
        back_populates="stock_movements",
    )

    product = relationship(
        "Product",
        back_populates="stock_movements",
    )

    warehouse = relationship(
        "Warehouse",
        back_populates="stock_movements",
    )

    user = relationship(
        "User",
        back_populates="stock_movements",
    )
# ==========================================================
# Notification
# ==========================================================

class Notification(Base):
    __tablename__ = "notifications"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    title = Column(
        String(150),
        nullable=False,
    )

    message = Column(
        Text,
        nullable=False,
    )

    notification_type = Column(
        String(50),
        default="system",
        nullable=False,
    )

    priority = Column(
        String(20),
        default="normal",
        nullable=False,
    )

    is_read = Column(
        Boolean,
        default=False,
        nullable=False,
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )

    user = relationship(
        "User",
        back_populates="notifications",
    )


# ==========================================================
# Audit Log
# ==========================================================

class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id", ondelete="SET NULL"),
        nullable=True,
    )

    action = Column(
        String(50),
        nullable=False,
    )

    module = Column(
        String(100),
        nullable=False,
    )

    description = Column(
        Text,
        nullable=False,
    )

    ip_address = Column(
        String(50),
        nullable=True,
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )

    user = relationship(
        "User",
        back_populates="audit_logs",
    )