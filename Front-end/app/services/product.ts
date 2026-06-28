import { apiFetch } from "./api";

const API_BASE_URL = "http://127.0.0.1:8000";

interface ProductPayload {
  [key: string]: unknown;
}

export function getProducts() {
  return apiFetch("/products/");
}

export function getProduct(id: number) {
  return apiFetch(`/products/${id}`);
}

export function createProduct(data: ProductPayload) {
  return apiFetch("/products/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateProduct(id: number, data: ProductPayload) {
  return apiFetch(`/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function deleteProduct(id: number) {
  return apiFetch(`/products/${id}`, {
    method: "DELETE",
  });
}

export async function uploadProductImage(
  productId: number,
  image: File
) {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("image", image);

  const response = await fetch(
    `${API_BASE_URL}/products/${productId}/image`,
    {
      method: "POST",
      headers: {
        ...(token && {
          Authorization: `Bearer ${token}`,
        }),
      },
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Failed to upload image");
  }

  return response.json();
}

export async function deleteProductImage(productId: number) {
  return apiFetch(`/products/${productId}/image`, {
    method: "DELETE",
  });
}