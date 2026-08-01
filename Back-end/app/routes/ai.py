from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user
from app.db.database import get_db
from app.db.models import User
from app.schemas.ai import AIChatRequest, AIChatResponse
from app.services.ai.chat_service import ChatService
from app.services.ai.inventory_ai import InventoryAI

router = APIRouter(
    prefix="/ai",
    tags=["Artificial Intelligence"],
)


@router.post("/chat")
def chat(
    request: AIChatRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    try:
        return ChatService.chat(
            db=db,
            message=request.message,
        )
    except Exception as e:
        import traceback

        traceback.print_exc()

        return {
            "error": str(e)
        }


@router.get("/summary")
def summary(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    try:
        return InventoryAI.ai_dashboard_summary(db)
    except Exception as e:
        import traceback

        traceback.print_exc()

        return {
            "error": str(e)
        }


@router.get("/insights")
def insights(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return InventoryAI.get_inventory_insights(db)


@router.get("/prediction")
def prediction(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return InventoryAI.get_low_stock_prediction(db)


@router.get("/overstock")
def overstock(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return InventoryAI.detect_overstock(db)


@router.get("/risk")
def risk(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return InventoryAI.inventory_risk_score(db)


@router.get("/recommendations")
def recommendations(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return InventoryAI.smart_restock_recommendations(db)


@router.get("/suggestions")
def suggestions():
    return ChatService.suggestions()