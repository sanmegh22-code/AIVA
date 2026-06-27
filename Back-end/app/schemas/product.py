from typing import Optional

from pydantic import BaseModel, Field, field_validator


class ProductCreate(BaseModel):
    name: str
    sku: str
    price: float = Field(gt=0)
    category: str

    @field_validator("name", "sku", "category")
    @classmethod
    def validate_strings(cls, value: str):
        value = value.strip()

        if not value:
            raise ValueError("Field cannot be empty")

        return value


class ProductUpdate(BaseModel):
    name: Optional[str] = None
    sku: Optional[str] = None
    price: Optional[float] = Field(default=None, gt=0)
    category: Optional[str] = None

    @field_validator("name", "sku", "category")
    @classmethod
    def validate_optional_strings(cls, value):

        if value is None:
            return value

        value = value.strip()

        if not value:
            raise ValueError("Field cannot be empty")

        return value


class ProductResponse(BaseModel):
    id: int
    name: str
    sku: str
    price: float
    category: str

    class Config:
        from_attributes = True