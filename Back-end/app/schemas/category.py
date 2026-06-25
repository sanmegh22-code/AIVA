from typing import Optional

from pydantic import BaseModel, field_validator


class CategoryCreate(BaseModel):
    name: str
    description: Optional[str] = None

    @field_validator("name")
    @classmethod
    def validate_name(cls, value: str):
        value = value.strip()

        if not value:
            raise ValueError("Category name cannot be empty")

        return value


class CategoryUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None

    @field_validator("name")
    @classmethod
    def validate_name(cls, value):

        if value is None:
            return value

        value = value.strip()

        if not value:
            raise ValueError("Category name cannot be empty")

        return value


class CategoryResponse(BaseModel):
    id: int
    name: str
    description: Optional[str]

    class Config:
        from_attributes = True