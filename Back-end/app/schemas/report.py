from pydantic import BaseModel


class ReportSummary(BaseModel):
    total_products: int
    total_categories: int
    total_suppliers: int
    total_warehouses: int

    total_inventory: int

    inventory_value: float

    low_stock: int
    out_of_stock: int

    average_inventory_value: float

    average_quantity: float

    stock_health: float

    warehouse_utilization: float