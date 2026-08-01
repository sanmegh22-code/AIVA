from collections import defaultdict

from sqlalchemy.orm import Session

from app.services.ai.gemini_service import GeminiService
from app.services.ai.inventory_ai import InventoryAI
from app.services.ai.prompt_builder import PromptBuilder


class ChatService:

    @staticmethod
    def _fallback_inventory_response(
        db: Session,
        message: str,
    ):

        user_message = message.lower()
        summary = InventoryAI.ai_dashboard_summary(db)
        insights = InventoryAI.get_inventory_insights(db)
        risk_scores = InventoryAI.inventory_risk_score(db)

        low_stock_items = [
            item for item in insights
            if item["status"] in {"Out of Stock", "Low Stock"}
        ]
        overstock_items = [
            item for item in insights
            if item["status"] == "Overstock"
        ]
        critical_items = [
            item for item in risk_scores
            if item["risk_level"] == "Critical"
        ]

        if any(
            keyword in user_message
            for keyword in ["summary", "overview", "health"]
        ):
            return (
                f"Inventory health score is {summary['inventory_health_score']}/100 "
                f"({summary['overall_status']}). "
                f"Total inventory items: {summary['statistics']['total_inventory']}. "
                f"Critical items: {summary['statistics']['critical_items']}. "
                f"High risk items: {summary['statistics']['high_risk_items']}. "
                f"Low stock items: {summary['statistics']['low_stock_items']}. "
                f"Overstock items: {summary['statistics']['overstock_items']}."
            )

        if any(
            keyword in user_message
            for keyword in ["low stock", "low in stock", "restock", "reorder"]
        ):
            if low_stock_items:
                details = ", ".join(
                    f"{item['product']} ({item['quantity']} units)"
                    for item in low_stock_items[:5]
                )
                return f"Low-stock products: {details}."

            return "No low-stock products are currently flagged."

        if any(
            keyword in user_message
            for keyword in ["overstock", "overstocked"]
        ):
            if overstock_items:
                details = ", ".join(
                    f"{item['product']} ({item['quantity']} units)"
                    for item in overstock_items[:5]
                )
                return f"Overstocked products: {details}."

            return "No overstocked products are currently flagged."

        if any(
            keyword in user_message
            for keyword in ["risk", "risk analysis", "danger"]
        ):
            if critical_items:
                details = ", ".join(
                    f"{item['product']} in {item['warehouse']}"
                    for item in critical_items[:5]
                )
                return (
                    f"Critical risk items: {details}. "
                    f"Overall risk summary indicates {summary['statistics']['critical_items']} critical, "
                    f"{summary['statistics']['high_risk_items']} high, "
                    f"{summary['statistics']['medium_risk_items']} medium, "
                    f"and {summary['statistics']['low_risk_items']} low-risk items."
                )

            return "No critical risk items are currently flagged."

        if "warehouse" in user_message and "highest" in user_message:
            warehouse_totals = defaultdict(int)

            for item in db.query(Inventory).all():
                if item.warehouse and item.product:
                    warehouse_totals[item.warehouse.name] += item.quantity

            if warehouse_totals:
                warehouse_name, total_quantity = max(
                    warehouse_totals.items(),
                    key=lambda pair: pair[1],
                )
                return (
                    f"The warehouse with the highest current stock is {warehouse_name} "
                    f"with {total_quantity} total units."
                )

            return "Warehouse totals are not available right now."

        return (
            "I can answer inventory questions using the current stock data. "
            "Try asking for a summary, low-stock items, overstocked items, risk analysis, or warehouse stock."
        )

    @staticmethod
    def chat(
        db: Session,
        message: str,
    ):

        if not message.strip():

            return {
                "response": "Please enter a valid question."
            }

        prompt = PromptBuilder.build_inventory_prompt(
            db=db,
            user_question=message,
        )

        try:

            response = GeminiService.generate(
                prompt
            )

            return {
                "response": response
            }

        except Exception:

            return {
                "response": ChatService._fallback_inventory_response(
                    db=db,
                    message=message,
                )
            }

    # =====================================================
    # QUICK SUGGESTIONS
    # =====================================================

    @staticmethod
    def suggestions():

        return [
            "Which products are low in stock?",
            "Show inventory summary.",
            "Which warehouse has the highest stock?",
            "Recommend products to reorder.",
            "Show inventory health.",
            "Which products are overstocked?",
            "Summarize today's inventory.",
            "Show inventory risk analysis.",
        ]