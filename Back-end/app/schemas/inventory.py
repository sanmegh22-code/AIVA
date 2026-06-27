from typing import Optional

from pydantic import BaseModel, Field


class InventoryCreate(BaseModel):
    product_id: int
    warehouse_id: int
    quantity: int = Field(ge=0)
    minimum_stock: int = Field(default=5, ge=0)
    maximum_stock: int = Field(default=1000, ge=1)


class InventoryUpdate(BaseModel):
    quantity: Optional[int] = Field(default=None, ge=0)
    minimum_stock: Optional[int] = Field(default=None, ge=0)
    maximum_stock: Optional[int] = Field(default=None, ge=1)


class InventoryResponse(BaseModel):
    id: int
    product_id: int
    warehouse_id: int
    quantity: int
    minimum_stock: int
    maximum_stock: int

    class Config:
        from_attributes = True