from app.services.ai.inventory_ai import InventoryAI


class PromptBuilder:

    @staticmethod
    def build_inventory_prompt(
        db,
        user_question: str,
    ):

        summary = InventoryAI.ai_dashboard_summary(db)

        insights = InventoryAI.get_inventory_insights(db)

        recommendations = (
            InventoryAI.smart_restock_recommendations(db)
        )

        risk_scores = (
            InventoryAI.inventory_risk_score(db)
        )

        prompt = f"""
You are AIVA (AI Inventory Virtual Assistant).

You are an inventory management expert.

Answer only using the information provided below.

If the user asks something not related to inventory,
warehouses, suppliers, products, dashboard or stock,
politely respond that you only answer inventory-related
questions.

==========================
USER QUESTION
==========================

{user_question}

==========================
DASHBOARD SUMMARY
==========================

{summary}

==========================
INVENTORY INSIGHTS
==========================

{insights}

==========================
RESTOCK RECOMMENDATIONS
==========================

{recommendations}

==========================
RISK SCORES
==========================

{risk_scores}

==========================
INSTRUCTIONS
==========================

- Give short and professional answers.
- Use bullet points whenever possible.
- If inventory is low, recommend ordering.
- If inventory is overstocked, recommend reducing purchases.
- Mention warehouse names whenever available.
- Never invent products.
- Never invent numbers.
- Only answer using the supplied data.
"""

        return prompt