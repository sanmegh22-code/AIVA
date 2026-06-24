from pydantic import BaseModel


class ProductCreate(BaseModel):
    name: str
    sku: str
    quantity: int
    price: float
    category: str


class ProductResponse(BaseModel):
    id: int
    name: str
    sku: str
    quantity: int
    price: float
    category: str

    class Config:
        from_attributes = True