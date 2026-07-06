import pytest
from pydantic import ValidationError

from app.schemas.product import ProductCreate, ProductUpdate


def test_product_create_accepts_quantity():
    product = ProductCreate(
        name="Widget",
        sku="W-001",
        price=10.5,
        category="General",
        quantity=5,
    )

    assert product.quantity == 5


def test_product_create_rejects_negative_quantity():
    with pytest.raises(ValidationError):
        ProductCreate(
            name="Widget",
            sku="W-001",
            price=10.5,
            category="General",
            quantity=-1,
        )


def test_product_update_allows_quantity_reset():
    payload = ProductUpdate(quantity=0)

    assert payload.quantity == 0
