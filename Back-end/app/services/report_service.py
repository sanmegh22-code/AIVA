from io import BytesIO

from fastapi.responses import StreamingResponse
from openpyxl import Workbook
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from sqlalchemy.orm import Session

from app.db.models import (
    Product,
    Category,
    Supplier,
    Warehouse,
    Inventory,
)


class ReportService:

    @staticmethod
    def get_summary(db: Session):

        total_products = db.query(Product).count()
        total_categories = db.query(Category).count()
        total_suppliers = db.query(Supplier).count()
        total_warehouses = db.query(Warehouse).count()

        inventories = db.query(Inventory).all()

        total_inventory = len(inventories)

        inventory_value = 0
        low_stock = 0
        out_of_stock = 0

        for item in inventories:

            if item.product:
                inventory_value += (
                    item.quantity * item.product.price
                )

            if item.quantity == 0:
                out_of_stock += 1

            elif item.quantity <= item.minimum_stock:
                low_stock += 1

        return {
            "total_products": total_products,
            "total_categories": total_categories,
            "total_suppliers": total_suppliers,
            "total_warehouses": total_warehouses,
            "total_inventory": total_inventory,
            "inventory_value": inventory_value,
            "low_stock": low_stock,
            "out_of_stock": out_of_stock,
            "monthly_growth": 18.0,
        }

    @staticmethod
    def export_excel(
        db: Session,
        report_type: str = "full",
    ):

        summary = ReportService.get_summary(db)

        workbook = Workbook()
        worksheet = workbook.active
        worksheet.title = "AIVA Summary"

        rows = [
            ["Report Type", report_type],
            [],
            ["Metric", "Value"],
            ["Products", summary["total_products"]],
            ["Categories", summary["total_categories"]],
            ["Suppliers", summary["total_suppliers"]],
            ["Warehouses", summary["total_warehouses"]],
            ["Inventory", summary["total_inventory"]],
            ["Inventory Value", summary["inventory_value"]],
            ["Low Stock", summary["low_stock"]],
            ["Out of Stock", summary["out_of_stock"]],
            ["Monthly Growth", f"{summary['monthly_growth']}%"],
        ]

        for row in rows:
            worksheet.append(row)

        buffer = BytesIO()
        workbook.save(buffer)
        buffer.seek(0)

        return StreamingResponse(
            buffer,
            media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            headers={
                "Content-Disposition": f'attachment; filename="{report_type}_report.xlsx"'
            },
        )

    @staticmethod
    def export_pdf(
        db: Session,
        report_type: str = "full",
    ):

        summary = ReportService.get_summary(db)

        buffer = BytesIO()

        pdf = canvas.Canvas(buffer, pagesize=A4)

        titles = {
            "full": "Complete Inventory Report",
            "products": "Product Report",
            "suppliers": "Supplier Report",
            "warehouses": "Warehouse Report",
            "revenue": "Revenue Report",
        }

        pdf.setTitle(titles.get(report_type, "Inventory Report"))

        pdf.setFont("Helvetica-Bold", 20)
        pdf.drawString(
            120,
            800,
            titles.get(report_type, "Inventory Report"),
        )

        pdf.setFont("Helvetica", 12)

        y = 760

        if report_type == "products":

            rows = [
                ("Total Products", summary["total_products"]),
                ("Categories", summary["total_categories"]),
                ("Inventory", summary["total_inventory"]),
                (
                    "Inventory Value",
                    f"Rs. {summary['inventory_value']:,.2f}",
                ),
            ]

        elif report_type == "suppliers":

            rows = [
                ("Suppliers", summary["total_suppliers"]),
                ("Products", summary["total_products"]),
                (
                    "Inventory Value",
                    f"Rs. {summary['inventory_value']:,.2f}",
                ),
            ]

        elif report_type == "warehouses":

            rows = [
                ("Warehouses", summary["total_warehouses"]),
                ("Inventory", summary["total_inventory"]),
                ("Low Stock", summary["low_stock"]),
            ]

        elif report_type == "revenue":

            rows = [
                (
                    "Inventory Value",
                    f"Rs. {summary['inventory_value']:,.2f}",
                ),
                ("Products", summary["total_products"]),
                ("Growth", f"{summary['monthly_growth']}%"),
            ]

        else:

            rows = [
                ("Products", summary["total_products"]),
                ("Categories", summary["total_categories"]),
                ("Suppliers", summary["total_suppliers"]),
                ("Warehouses", summary["total_warehouses"]),
                ("Inventory", summary["total_inventory"]),
                (
                    "Inventory Value",
                    f"Rs. {summary['inventory_value']:,.2f}",
                ),
                ("Low Stock", summary["low_stock"]),
                ("Out Of Stock", summary["out_of_stock"]),
            ]

        for title, value in rows:

            pdf.drawString(60, y, str(title))
            pdf.drawString(330, y, str(value))

            y -= 25

        pdf.line(50, y, 550, y)

        y -= 40

        pdf.setFont("Helvetica-Bold", 14)

        pdf.drawString(
            60,
            y,
            "Generated by AIVA Inventory Management System",
        )

        pdf.save()

        buffer.seek(0)

        return StreamingResponse(
            buffer,
            media_type="application/pdf",
            headers={
                "Content-Disposition": f'attachment; filename="{report_type}_report.pdf"'
            },
        )