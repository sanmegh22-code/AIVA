from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session

from app.core.logger import logger
from app.core.security import (
    create_access_token,
    hash_password,
    verify_password,
    verify_token,
)
from app.db.database import get_db
from app.db.models import User
from app.schemas.user import UserLogin, UserRegister

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

security = HTTPBearer()


@router.post("/register")
def register(
    user: UserRegister,
    db: Session = Depends(get_db)
):

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing_user:
        logger.warning(
            f"Registration failed - Email already exists: {user.email}"
        )

        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    new_user = User(
        name=user.name,
        email=user.email,
        hashed_password=hash_password(
            user.password
        )
    )

    db.add(new_user)
    db.commit()

    logger.info(
        f"New user registered: {user.email}"
    )

    return {
        "message": "User registered"
    }


@router.post("/login")
def login(
    user: UserLogin,
    db: Session = Depends(get_db)
):

    db_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if not db_user:

        logger.warning(
            f"Login failed - User not found: {user.email}"
        )

        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    if not verify_password(
        user.password,
        db_user.hashed_password
    ):

        logger.warning(
            f"Login failed - Wrong password: {user.email}"
        )

        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    token = create_access_token(
        {"sub": db_user.email}
    )

    logger.info(
        f"User logged in: {db_user.email}"
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }


@router.get("/me")
def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):

    email = verify_token(
        credentials.credentials
    )

    user = db.query(User).filter(
        User.email == email
    ).first()

    if not user:

        logger.warning(
            f"Profile not found: {email}"
        )

        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    logger.info(
        f"Profile accessed: {user.email}"
    )

    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "role": user.role
    }