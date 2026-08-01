from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user
from app.db.database import get_db
from app.db.models import User
from app.schemas.ai import (
    AIChatRequest,
    AIChatResponse,
)
from app.services.ai.chat_service import ChatService
from app.services.ai.inventory_ai import InventoryAI

router = APIRouter(
    prefix="/ai",
    tags=["Artificial Intelligence"],
)


# =====================================================
# AI CHAT
# =====================================================

@router.post(
    "/chat",
    response_model=AIChatResponse,
)
def chat(
    request: AIChatRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    ),
):
    return ChatService.chat(
        db=db,
        message=request.message,
    )


# =====================================================
# INVENTORY INSIGHTS
# =====================================================

@router.get("/insights")
def inventory_insights(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    ),
):
    return InventoryAI.get_inventory_insights(db)


# =====================================================
# LOW STOCK PREDICTION
# =====================================================

@router.get("/prediction")
def low_stock_prediction(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    ),
):
    return InventoryAI.get_low_stock_prediction(db)


# =====================================================
# OVERSTOCK DETECTION
# =====================================================

@router.get("/overstock")
def overstock_detection(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    ),
):
    return InventoryAI.detect_overstock(db)


# =====================================================
# INVENTORY RISK SCORE
# =====================================================

@router.get("/risk")
def inventory_risk(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    ),
):
    return InventoryAI.inventory_risk_score(db)


# =====================================================
# RESTOCK RECOMMENDATIONS
# =====================================================

@router.get("/recommendations")
def restock_recommendations(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    ),
):
    return InventoryAI.smart_restock_recommendations(db)


# =====================================================
# AI DASHBOARD SUMMARY
# =====================================================

@router.get("/summary")
def ai_summary(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    ),
):
    return InventoryAI.ai_dashboard_summary(db)


# =====================================================
# AI SUGGESTIONS
# =====================================================

@router.get("/suggestions")
def suggestions():

    return ChatService.suggestions()