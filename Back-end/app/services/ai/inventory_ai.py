from sqlalchemy.orm import Session

from app.db.models import (
    Inventory,
    Product,
)


class InventoryAI:

    # =====================================================
    # INVENTORY INSIGHTS
    # =====================================================

    @staticmethod
    def get_inventory_insights(
        db: Session,
    ):

        inventory = db.query(
            Inventory
        ).all()

        insights = []

        for item in inventory:

            product = item.product

            if product is None:
                continue

            if item.quantity == 0:

                status = "Out of Stock"

                recommendation = (
                    "Restock immediately."
                )

            elif item.quantity <= item.minimum_stock:

                status = "Low Stock"

                recommendation = (
                    "Order new stock soon."
                )

            elif item.quantity >= item.maximum_stock:

                status = "Overstock"

                recommendation = (
                    "Reduce purchasing."
                )

            else:

                status = "Healthy"

                recommendation = (
                    "Inventory level is healthy."
                )

            insights.append(
                {
                    "inventory_id": item.id,
                    "product_id": product.id,
                    "product": product.name,
                    "warehouse_id": item.warehouse_id,
                    "quantity": item.quantity,
                    "minimum_stock": item.minimum_stock,
                    "maximum_stock": item.maximum_stock,
                    "status": status,
                    "recommendation": recommendation,
                }
            )

        return insights

    # =====================================================
    # LOW STOCK PREDICTION
    # =====================================================

    @staticmethod
    def get_low_stock_prediction(
        db: Session,
    ):

        inventory = db.query(
            Inventory
        ).all()

        predictions = []

        for item in inventory:

            product = item.product

            if product is None:
                continue

            if item.quantity <= item.minimum_stock:

                urgency = "HIGH"

                days_remaining = max(
                    1,
                    item.quantity,
                )

            elif item.quantity <= (
                item.minimum_stock * 2
            ):

                urgency = "MEDIUM"

                days_remaining = item.quantity

            else:

                urgency = "LOW"

                days_remaining = item.quantity

            predictions.append(
                {
                    "inventory_id": item.id,
                    "product": product.name,
                    "current_stock": item.quantity,
                    "minimum_stock": item.minimum_stock,
                    "predicted_days_remaining": days_remaining,
                    "urgency": urgency,
                    "recommended_order_quantity": max(
                        item.maximum_stock - item.quantity,
                        0,
                    ),
                }
            )

        return predictions

    # =====================================================
    # OVERSTOCK DETECTION
    # =====================================================

    @staticmethod
    def detect_overstock(
        db: Session,
    ):

        inventory = db.query(
            Inventory
        ).all()

        results = []

        for item in inventory:

            if item.quantity >= item.maximum_stock:

                results.append(
                    {
                        "inventory_id": item.id,
                        "product": (
                            item.product.name
                            if item.product
                            else None
                        ),
                        "warehouse": (
                            item.warehouse.name
                            if item.warehouse
                            else None
                        ),
                        "quantity": item.quantity,
                        "maximum_stock": item.maximum_stock,
                        "recommendation": (
                            "Reduce purchasing or increase sales."
                        ),
                    }
                )

        return results

    # =====================================================
    # INVENTORY RISK SCORE
    # =====================================================

    @staticmethod
    def inventory_risk_score(
        db: Session,
    ):

        inventory = db.query(
            Inventory
        ).all()

        results = []

        for item in inventory:

            if item.maximum_stock == 0:

                stock_percentage = 0

                risk_score = 100

            else:

                stock_percentage = (
                    item.quantity /
                    item.maximum_stock
                ) * 100

                if stock_percentage <= 10:

                    risk_score = 100

                elif stock_percentage <= 25:

                    risk_score = 80

                elif stock_percentage <= 50:

                    risk_score = 50

                elif stock_percentage <= 75:

                    risk_score = 20

                else:

                    risk_score = 5

            if risk_score >= 80:

                risk_level = "Critical"

            elif risk_score >= 50:

                risk_level = "High"

            elif risk_score >= 20:

                risk_level = "Medium"

            else:

                risk_level = "Low"

            results.append(
                {
                    "inventory_id": item.id,
                    "product": (
                        item.product.name
                        if item.product
                        else None
                    ),
                    "warehouse": (
                        item.warehouse.name
                        if item.warehouse
                        else None
                    ),
                    "stock_percentage": round(
                        stock_percentage,
                        2,
                    ),
                    "risk_score": risk_score,
                    "risk_level": risk_level,
                }
            )

        return results

    # =====================================================
    # SMART RESTOCK RECOMMENDATIONS
    # =====================================================

    @staticmethod
    def smart_restock_recommendations(
        db: Session,
    ):

        inventory = db.query(
            Inventory
        ).all()

        recommendations = []

        for item in inventory:

            if item.quantity <= item.minimum_stock:

                recommended_order = (
                    item.maximum_stock -
                    item.quantity
                )

                recommendations.append(
                    {
                        "inventory_id": item.id,
                        "product": (
                            item.product.name
                            if item.product
                            else None
                        ),
                        "warehouse": (
                            item.warehouse.name
                            if item.warehouse
                            else None
                        ),
                        "current_stock": item.quantity,
                        "recommended_order": recommended_order,
                        "priority": (
                            "High"
                            if item.quantity == 0
                            else "Medium"
                        ),
                    }
                )

        return recommendations

    # =====================================================
    # AI DASHBOARD SUMMARY
    # =====================================================

    @staticmethod
    def ai_dashboard_summary(
        db: Session,
    ):

        insights = InventoryAI.get_inventory_insights(db)

        low_stock = InventoryAI.get_low_stock_prediction(db)

        overstock = InventoryAI.detect_overstock(db)

        risk_scores = InventoryAI.inventory_risk_score(db)

        recommendations = (
            InventoryAI.smart_restock_recommendations(db)
        )

        total_items = len(insights)

        critical_items = len(
            [
                item
                for item in risk_scores
                if item["risk_level"] == "Critical"
            ]
        )

        high_items = len(
            [
                item
                for item in risk_scores
                if item["risk_level"] == "High"
            ]
        )

        medium_items = len(
            [
                item
                for item in risk_scores
                if item["risk_level"] == "Medium"
            ]
        )

        low_items = len(
            [
                item
                for item in risk_scores
                if item["risk_level"] == "Low"
            ]
        )

        if total_items == 0:

            health_score = 100

        else:

            deductions = (
                (critical_items * 25)
                + (high_items * 10)
                + (medium_items * 5)
            )

            health_score = max(
                0,
                100 - deductions,
            )

        if health_score >= 90:

            overall_status = "Excellent"

        elif health_score >= 75:

            overall_status = "Good"

        elif health_score >= 50:

            overall_status = "Needs Attention"

        else:

            overall_status = "Critical"

        return {
            "inventory_health_score": health_score,
            "overall_status": overall_status,
            "statistics": {
                "total_inventory": total_items,
                "critical_items": critical_items,
                "high_risk_items": high_items,
                "medium_risk_items": medium_items,
                "low_risk_items": low_items,
                "low_stock_items": len(low_stock),
                "overstock_items": len(overstock),
            },
            "recommendations": recommendations,
            "risk_scores": risk_scores,
            "inventory_insights": insights,
        }