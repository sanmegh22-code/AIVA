from io import BytesIO
from pathlib import Path

from fastapi import UploadFile

from app.utils.file_upload import save_image


def test_save_image_creates_upload_directory(tmp_path, monkeypatch):
    upload_dir = tmp_path / "uploads" / "products"
    monkeypatch.setattr("app.utils.file_upload.UPLOAD_DIR", str(upload_dir))

    file = UploadFile(filename="test.png", file=BytesIO(b"fake-image-bytes"))

    saved_path = save_image(file)

    assert upload_dir.exists()
    assert Path(saved_path).exists()
    assert Path(saved_path).suffix == ".png"
