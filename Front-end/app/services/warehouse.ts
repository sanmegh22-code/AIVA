import { apiFetch } from "./api";

export function getSuppliers() {
  return apiFetch("/suppliers/");
}

export function getSupplier(id: number) {
  return apiFetch(`/suppliers/${id}`);
}

export function createSupplier(data: any) {
  return apiFetch("/suppliers/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateSupplier(id: number, data: any) {
  return apiFetch(`/suppliers/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function deleteSupplier(id: number) {
  return apiFetch(`/suppliers/${id}`, {
    method: "DELETE",
  });
}