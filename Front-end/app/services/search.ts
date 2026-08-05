import { apiFetch } from "./api";

export interface SearchItem {
  id: number;
  name: string;
  type: string;
}

export interface SearchResponse {
  products: SearchItem[];
  suppliers: SearchItem[];
  categories: SearchItem[];
  warehouses: SearchItem[];
}

export function globalSearch(query: string): Promise<SearchResponse> {
  return apiFetch(`/search/?q=${encodeURIComponent(query)}`);
}
