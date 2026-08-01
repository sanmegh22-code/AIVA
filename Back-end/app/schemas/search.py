from typing import List

from pydantic import BaseModel


class SearchItem(BaseModel):
    id: int
    name: str
    type: str


class SearchResponse(BaseModel):
    products: List[SearchItem]
    suppliers: List[SearchItem]
    categories: List[SearchItem]
    warehouses: List[SearchItem]