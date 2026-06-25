from dotenv import load_dotenv
import os

load_dotenv()


class Settings:
    APP_NAME = "AIVA API"
    APP_VERSION = "1.0.0"

    DATABASE_URL = os.getenv("DATABASE_URL")

    SECRET_KEY = os.getenv("SECRET_KEY")
    ALGORITHM = os.getenv("ALGORITHM")

    ACCESS_TOKEN_EXPIRE_MINUTES = 60


settings = Settings()