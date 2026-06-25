from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.core.config import settings
from app.db.database import Base, engine
from app.db.models import User, Product, Category

from app.routes.auth import router as auth_router
from app.routes.products import router as product_router
from app.routes.users import router as users_router
from app.routes.categories import router as category_router
from app.routes.product_images import router as product_image_router

from app.exceptions.handlers import register_exception_handlers

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION
)

register_exception_handlers(app)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve uploaded images
app.mount(
    "/uploads",
    StaticFiles(directory="uploads"),
    name="uploads"
)

# Routers
app.include_router(auth_router)
app.include_router(product_router)
app.include_router(users_router)
app.include_router(category_router)
app.include_router(product_image_router)


@app.get("/")
def home():
    return {
        "message": "AIVA Backend Running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }