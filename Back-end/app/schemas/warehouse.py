from typing import Optional

from pydantic import BaseModel, field_validator


class WarehouseCreate(BaseModel):
    name: str
    code: str
    address: str
    manager: str
    phone: str
    status: str = "Active"

    @field_validator("name", "code", "address", "manager", "phone")
    @classmethod
    def validate_fields(cls, value: str):
        value = value.strip()

        if not value:
            raise ValueError("Field cannot be empty")

        return value


class WarehouseUpdate(BaseModel):
    name: Optional[str] = None
    code: Optional[str] = None
    address: Optional[str] = None
    manager: Optional[str] = None
    phone: Optional[str] = None
    status: Optional[str] = None

    @field_validator("name", "code", "address", "manager", "phone")
    @classmethod
    def validate_fields(cls, value):

        if value is None:
            return value

        value = value.strip()

        if not value:
            raise ValueError("Field cannot be empty")

        return value


class WarehouseResponse(BaseModel):
    id: int
    name: str
    code: str
    address: str
    manager: str
    phone: str
    status: str

    class Config:
        from_attributes = True