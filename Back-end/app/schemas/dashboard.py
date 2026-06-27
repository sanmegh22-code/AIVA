from pydantic import BaseModel


class DashboardSummary(BaseModel):
    total_products: int
    total_categories: int
    total_warehouses: int
    total_inventory: int
    low_stock: int