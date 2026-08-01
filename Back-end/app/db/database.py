from sqlalchemy import create_engine, inspect, text
from sqlalchemy.orm import declarative_base, sessionmaker

from app.core.config import settings

engine = create_engine(settings.DATABASE_URL)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()


def ensure_schema():
    inspector = inspect(engine)
    tables = inspector.get_table_names()

    if "products" in tables:
        columns = {column["name"] for column in inspector.get_columns("products")}

        if "quantity" not in columns:
            with engine.begin() as connection:
                connection.execute(
                    text("ALTER TABLE products ADD COLUMN quantity INTEGER NOT NULL DEFAULT 0")
                )

        if "created_at" not in columns:
            with engine.begin() as connection:
                connection.execute(
                    text("ALTER TABLE products ADD COLUMN created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP")
                )

        if "updated_at" not in columns:
            with engine.begin() as connection:
                connection.execute(
                    text("ALTER TABLE products ADD COLUMN updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP")
                )


ensure_schema()


def get_db():
    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()