import os
import tempfile

import matplotlib

# Prevent GUI issues on server
matplotlib.use("Agg")

import matplotlib.pyplot as plt

from app.services.reports.analytics import ReportAnalytics


class ReportCharts:

    @staticmethod
    def generate_all_charts(db):

        charts = {}

        charts["category"] = ReportCharts.category_chart(db)

        charts["stock_status"] = ReportCharts.stock_status_chart(db)

        charts["top_products"] = ReportCharts.top_products_chart(db)

        charts["stock_movement"] = ReportCharts.stock_movement_chart(db)

        return charts

    @staticmethod
    def category_chart(db):

        data = ReportAnalytics.get_category_distribution(db)

        labels = [item[0] for item in data]

        values = [item[1] for item in data]

        fig, ax = plt.subplots(figsize=(7, 5))

        ax.pie(
            values,
            labels=labels,
            autopct="%1.1f%%",
            startangle=90,
        )

        ax.set_title("Products by Category")

        file = os.path.join(
            tempfile.gettempdir(),
            "category_chart.png",
        )

        plt.tight_layout()

        plt.savefig(file)

        plt.close(fig)

        return file

    @staticmethod
    def stock_status_chart(db):

        summary = ReportAnalytics.get_summary(db)

        labels = [
            "Healthy",
            "Low Stock",
            "Out Of Stock",
        ]

        healthy = (
            summary["total_inventory"]
            - summary["low_stock"]
            - summary["out_of_stock"]
        )

        values = [
            healthy,
            summary["low_stock"],
            summary["out_of_stock"],
        ]

        fig, ax = plt.subplots(figsize=(7, 5))

        ax.pie(
            values,
            labels=labels,
            autopct="%1.1f%%",
            startangle=90,
        )

        ax.set_title("Inventory Health")

        file = os.path.join(
            tempfile.gettempdir(),
            "stock_status_chart.png",
        )

        plt.tight_layout()

        plt.savefig(file)

        plt.close(fig)

        return file

    @staticmethod
    def top_products_chart(db):

        products = ReportAnalytics.get_top_products(db)

        names = [p.name for p in products]

        quantities = [p.quantity for p in products]

        fig, ax = plt.subplots(figsize=(10, 6))

        ax.bar(
            names,
            quantities,
        )

        ax.set_title("Top Products")

        ax.set_xlabel("Products")

        ax.set_ylabel("Quantity")

        plt.xticks(rotation=25)

        file = os.path.join(
            tempfile.gettempdir(),
            "top_products_chart.png",
        )

        plt.tight_layout()

        plt.savefig(file)

        plt.close(fig)

        return file

    @staticmethod
    def stock_movement_chart(db):

        movement = ReportAnalytics.get_stock_movements(db)

        labels = [
            "Stock In",
            "Stock Out",
        ]

        values = [
            movement["total_in"],
            movement["total_out"],
        ]

        fig, ax = plt.subplots(figsize=(7, 5))

        ax.bar(
            labels,
            values,
        )

        ax.set_title("Stock Movement")

        ax.set_ylabel("Quantity")

        file = os.path.join(
            tempfile.gettempdir(),
            "stock_movement_chart.png",
        )

        plt.tight_layout()

        plt.savefig(file)

        plt.close(fig)

        return file

    @staticmethod
    def cleanup(charts):

        for path in charts.values():

            if os.path.exists(path):

                os.remove(path)