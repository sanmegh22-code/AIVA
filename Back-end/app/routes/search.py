from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user
from app.db.database import get_db
from app.db.models import User
from app.schemas.search import SearchResponse
from app.services.search.search_service import SearchService

router = APIRouter(
    prefix="/search",
    tags=["Search"],
)


@router.get(
    "/",
    response_model=SearchResponse,
)
def global_search(
    q: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Global search across Products, Suppliers,
    Categories and Warehouses.
    """

    return SearchService.global_search(
        db=db,
        query=q,
    )