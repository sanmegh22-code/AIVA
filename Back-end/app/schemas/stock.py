from typing import Optional

from pydantic import BaseModel, Field


class StockIn(BaseModel):
    inventory_id: int
    quantity: int = Field(gt=0)
    reference: Optional[str] = None
    remarks: Optional[str] = None


class StockOut(BaseModel):
    inventory_id: int
    quantity: int = Field(gt=0)
    reference: Optional[str] = None
    remarks: Optional[str] = None


class StockTransfer(BaseModel):
    from_inventory_id: int
    to_inventory_id: int
    quantity: int = Field(gt=0)
    remarks: Optional[str] = None


class StockAdjustment(BaseModel):
    inventory_id: int
    quantity: int
    remarks: Optional[str] = None