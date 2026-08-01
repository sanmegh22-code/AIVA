import os

import google.generativeai as genai

from dotenv import load_dotenv

load_dotenv()


class GeminiService:

    @staticmethod
    def _get_model():
        api_key = os.getenv("GEMINI_API_KEY", "").strip()

        if not api_key or api_key == "YOUR_GEMINI_API_KEY":
            raise ValueError(
                "GEMINI_API_KEY is missing or still using the placeholder value. "
                "Add a valid Gemini API key to Back-end/.env to enable chat responses."
            )

        genai.configure(api_key=api_key)

        return genai.GenerativeModel(
            "gemini-2.5-flash"
        )

    @staticmethod
    def generate(prompt: str):

        model = GeminiService._get_model()

        response = model.generate_content(
            prompt
        )

        return response.text