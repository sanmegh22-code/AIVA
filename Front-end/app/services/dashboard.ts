import { apiFetch } from "./api";

export function getDashboardSummary() {
  return apiFetch("/dashboard/summary");
}

export function getRecentMovements() {
  return apiFetch("/dashboard/recent-movements");
}

export function getDashboardCharts() {
  return apiFetch("/dashboard/charts");
}