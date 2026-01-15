from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent  # src folder

app = FastAPI(title="Multi-Factor Cardiovascular Risk Prediction API")

# Serve public folder
public_dir = BASE_DIR / "public"
if not public_dir.exists():
    raise RuntimeError(f"Directory {public_dir} does not exist!")

app.mount("/public", StaticFiles(directory=public_dir), name="public")

@app.get("/")
def home():
    return FileResponse(public_dir / "index.html")
