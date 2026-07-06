from typing import Optional

from pydantic import BaseModel, Field


# -------------------------
# Product Summary
# -------------------------

class ProductSummary(BaseModel):
    id: int
    name: str
    sku: str
    category: str
    price: float

    class Config:
        from_attributes = True


# -------------------------
# Warehouse Summary
# -------------------------

class WarehouseSummary(BaseModel):
    id: int
    name: str
    code: str

    class Config:
        from_attributes = True


# -------------------------
# Create
# -------------------------

class InventoryCreate(BaseModel):
    product_id: int
    warehouse_id: int
    quantity: int = Field(ge=0)
    minimum_stock: int = Field(default=5, ge=0)
    maximum_stock: int = Field(default=1000, ge=1)


# -------------------------
# Update
# -------------------------

class InventoryUpdate(BaseModel):
    quantity: Optional[int] = Field(default=None, ge=0)
    minimum_stock: Optional[int] = Field(default=None, ge=0)
    maximum_stock: Optional[int] = Field(default=None, ge=1)


# -------------------------
# Response
# -------------------------

class InventoryResponse(BaseModel):
    id: int

    quantity: int
    minimum_stock: int
    maximum_stock: int

    product: ProductSummary
    warehouse: WarehouseSummary

    class Config:
        from_attributes = True