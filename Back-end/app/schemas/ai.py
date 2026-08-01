from typing import Optional

from pydantic import BaseModel


class AIChatRequest(BaseModel):
    message: str


class AIChatResponse(BaseModel):
    response: str


class InventoryInsight(BaseModel):
    inventory_id: int
    product_id: int
    product: str
    warehouse_id: int
    quantity: int
    minimum_stock: int
    maximum_stock: int
    status: str
    recommendation: str


class RiskScore(BaseModel):
    inventory_id: int
    product: Optional[str] = None
    warehouse: Optional[str] = None
    stock_percentage: float
    risk_score: int
    risk_level: str


class RestockRecommendation(BaseModel):
    inventory_id: int
    product: Optional[str] = None
    warehouse: Optional[str] = None
    current_stock: int
    recommended_order: int
    priority: str


class DashboardSummary(BaseModel):
    inventory_health_score: int
    overall_status: str
    statistics: dict
    recommendations: list
    risk_scores: list
    inventory_insights: list