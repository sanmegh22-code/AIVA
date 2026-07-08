from io import BytesIO
import tempfile
import os

from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session

from app.services.reports.analytics import ReportAnalytics
from app.services.reports.pdf_generator import PDFGenerator
from app.services.reports.excel_generator import ExcelGenerator


class ReportService:

    @staticmethod
    def get_summary(db: Session):
        """
        Returns dashboard/report summary.
        """
        return ReportAnalytics.get_summary(db)

    @staticmethod
    def export_pdf(
        db: Session,
        report_type: str = "full",
    ):
        """
        Generate enterprise PDF report.
        """

        temp_file = tempfile.NamedTemporaryFile(
            suffix=".pdf",
            delete=False,
        )

        temp_file.close()

        PDFGenerator.build_pdf(
            db,
            temp_file.name,
        )

        pdf_file = open(
            temp_file.name,
            "rb",
        )

        data = BytesIO(pdf_file.read())

        pdf_file.close()

        os.remove(temp_file.name)

        data.seek(0)

        filename = f"{report_type}_report.pdf"

        return StreamingResponse(
            data,
            media_type="application/pdf",
            headers={
                "Content-Disposition":
                f'attachment; filename="{filename}"'
            },
        )

    @staticmethod
    def export_excel(
        db: Session,
        report_type: str = "full",
    ):
        """
        Generate enterprise Excel report.
        """

        workbook = ExcelGenerator.build_excel(db)

        output = BytesIO()

        workbook.save(output)

        output.seek(0)

        filename = f"{report_type}_report.xlsx"

        return StreamingResponse(
            output,
            media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            headers={
                "Content-Disposition":
                f'attachment; filename="{filename}"'
            },
        )

    @staticmethod
    def health():
        """
        Reports service status.
        """

        return {
            "service": "Reports",
            "status": "healthy",
            "version": "2.0.0",
            "features": [
                "Analytics",
                "Professional PDF",
                "Professional Excel",
                "Charts",
                "Recommendations",
            ],
        }

    @staticmethod
    def system_statistics(db: Session):
        """
        Returns complete analytics dataset.
        """

        report = ReportAnalytics.get_complete_report(db)

        return {

            "summary":
            report["summary"],

            "categories":
            report["categories"],

            "top_products":
            [

                {
                    "id": p.id,
                    "name": p.name,
                    "sku": p.sku,
                    "price": p.price,
                    "quantity": p.total_quantity,
                    "category": p.category,
                }

                for p in report["top_products"]

            ],

            "low_stock":
            [

                {
                    "inventory_id": i.id,
                    "product": i.product.name,
                    "quantity": i.quantity,
                    "minimum_stock": i.minimum_stock,
                }

                for i in report["low_stock"]

            ],

            "movements":
            report["movements"],
        }