import { apiFetch } from "./api";

export function getInventory() {
  return apiFetch("/inventory/");
}

export function getLowStock() {
  return apiFetch("/inventory/low-stock");
}

export function createInventory(data: any) {
  return apiFetch("/inventory/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateInventory(id: number, data: any) {
  return apiFetch(`/inventory/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function deleteInventory(id: number) {
  return apiFetch(`/inventory/${id}`, {
    method: "DELETE",
  });
}