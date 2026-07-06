from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class StockMovementCreate(BaseModel):
    inventory_id: int
    product_id: int
    warehouse_id: int
    movement_type: str
    quantity: int
    reference: Optional[str] = None
    remarks: Optional[str] = None


class StockMovementResponse(BaseModel):
    id: int
    inventory_id: int
    product_id: int
    warehouse_id: int
    movement_type: str
    quantity: int
    reference: Optional[str]
    remarks: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True