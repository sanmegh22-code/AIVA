import { API_BASE_URL, apiFetch } from "./api";

export async function getReportSummary() {
    return apiFetch("/reports/summary");
}

export async function exportExcelReport(type: string) {
    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API_BASE_URL}/reports/export/excel?type=${type}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    if (!response.ok) {
        throw new Error("Failed to export Excel report");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${type}_report.xlsx`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
}

export async function exportReport(type: string) {

    const token = localStorage.getItem("token");

    const response = await fetch(

        `${API_BASE_URL}/reports/export/pdf?type=${type}`,

        {

            headers: {

                Authorization: `Bearer ${token}`,

            },

        }

    );

    if (!response.ok) {

        throw new Error("Failed to export report");

    }

    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = `${type}_report.pdf`;

    document.body.appendChild(link);

    link.click();

    link.remove();

    window.URL.revokeObjectURL(url);

}