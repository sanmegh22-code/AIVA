import { apiFetch } from "./api";

interface CategoryPayload {
  name: string;
  description?: string | null;
}

export function getCategories() {
  return apiFetch("/categories/");
}

export function getCategory(id: number) {
  return apiFetch(`/categories/${id}`);
}

export function createCategory(data: CategoryPayload) {
  return apiFetch("/categories/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateCategory(id: number, data: CategoryPayload) {
  return apiFetch(`/categories/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function deleteCategory(id: number) {
  return apiFetch(`/categories/${id}`, {
    method: "DELETE",
  });
}
