from datetime import datetime

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    Image,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)

from app.services.reports.analytics import ReportAnalytics
from app.services.reports.charts import ReportCharts


class PDFGenerator:

    @staticmethod
    def build_pdf(db, filename):

        report = ReportAnalytics.get_complete_report(db)

        charts = ReportCharts.generate_all_charts(db)

        doc = SimpleDocTemplate(filename)

        styles = getSampleStyleSheet()

        title_style = styles["Heading1"]
        title_style.alignment = TA_CENTER

        heading_style = styles["Heading2"]

        normal = styles["BodyText"]

        story = []

        # ---------------------------------------------------
        # Title
        # ---------------------------------------------------

        story.append(
            Paragraph(
                "AIVA Inventory Management System",
                title_style,
            )
        )

        story.append(
            Paragraph(
                "Enterprise Inventory Report",
                heading_style,
            )
        )

        story.append(
            Paragraph(
                f"Generated : {datetime.now().strftime('%d-%m-%Y %H:%M:%S')}",
                normal,
            )
        )

        story.append(Spacer(1, 0.3 * inch))

        # ---------------------------------------------------
        # Executive Summary
        # ---------------------------------------------------

        story.append(
            Paragraph(
                "Executive Summary",
                heading_style,
            )
        )

        summary = report["summary"]

        summary_table = Table(
            [
                ["Metric", "Value"],
                ["Products", summary["total_products"]],
                ["Categories", summary["total_categories"]],
                ["Suppliers", summary["total_suppliers"]],
                ["Warehouses", summary["total_warehouses"]],
                ["Inventory", summary["total_inventory"]],
                [
                    "Inventory Value",
                    f"₹ {summary['inventory_value']:,.2f}",
                ],
                ["Low Stock", summary["low_stock"]],
                ["Out Of Stock", summary["out_of_stock"]],
                [
                    "Stock Health",
                    f"{summary['stock_health']} %",
                ],
                [
                    "Warehouse Utilization",
                    f"{summary['warehouse_utilization']} %",
                ],
            ]
        )

        summary_table.setStyle(
            TableStyle(
                [
                    ("BACKGROUND", (0, 0), (-1, 0), colors.black),
                    ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                    ("GRID", (0, 0), (-1, -1), 1, colors.grey),
                    ("BACKGROUND", (0, 1), (-1, -1), colors.beige),
                    ("BOTTOMPADDING", (0, 0), (-1, 0), 10),
                ]
            )
        )

        story.append(summary_table)

        story.append(Spacer(1, 0.35 * inch))

        # ---------------------------------------------------
        # Charts
        # ---------------------------------------------------

        story.append(
            Paragraph(
                "Business Analytics",
                heading_style,
            )
        )

        for chart in charts.values():

            story.append(Image(chart, width=6.5 * inch, height=4 * inch))

            story.append(Spacer(1, 0.2 * inch))

        # ---------------------------------------------------
        # Top Products
        # ---------------------------------------------------

        story.append(
            Paragraph(
                "Top Products",
                heading_style,
            )
        )

        product_data = [["Product", "Quantity", "Price"]]

        for product in report["top_products"]:

            product_data.append(
                [
                    product.name,
                    product.total_quantity,
                    f"₹ {product.price:,.2f}",
                ]
            )

        product_table = Table(product_data)

        product_table.setStyle(
            TableStyle(
                [
                    ("BACKGROUND", (0, 0), (-1, 0), colors.darkblue),
                    ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                    ("GRID", (0, 0), (-1, -1), 1, colors.grey),
                    ("BACKGROUND", (0, 1), (-1, -1), colors.whitesmoke),
                ]
            )
        )

        story.append(product_table)

        story.append(Spacer(1, 0.4 * inch))

        # ---------------------------------------------------
        # Recommendations
        # ---------------------------------------------------

        story.append(
            Paragraph(
                "System Recommendations",
                heading_style,
            )
        )

        recommendations = []

        if summary["low_stock"] > 0:

            recommendations.append(
                f"• {summary['low_stock']} products require replenishment."
            )

        if summary["out_of_stock"] > 0:

            recommendations.append(
                f"• {summary['out_of_stock']} products are currently out of stock."
            )

        if summary["stock_health"] >= 90:

            recommendations.append(
                "• Inventory health is excellent."
            )

        elif summary["stock_health"] >= 70:

            recommendations.append(
                "• Inventory health is satisfactory."
            )

        else:

            recommendations.append(
                "• Inventory health requires attention."
            )

        if summary["inventory_value"] > 100000:

            recommendations.append(
                "• Inventory value exceeds ₹100,000."
            )

        recommendations.append(
            "• Continue monitoring stock movements regularly."
        )

        for item in recommendations:

            story.append(
                Paragraph(item, normal)
            )

        story.append(Spacer(1, 0.3 * inch))

        # ---------------------------------------------------
        # Footer
        # ---------------------------------------------------

        story.append(
            Paragraph(
                "Generated automatically by AIVA Inventory Management System",
                normal,
            )
        )

        doc.build(story)

        ReportCharts.cleanup(charts)