from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from src.api.central_api import router as central_router
from pathlib import Path

# --------------------------------------------------
# Base directories
# --------------------------------------------------
BASE_DIR = Path(__file__).resolve().parent.parent  # server folder
PUBLIC_DIR = BASE_DIR / "public"                   # React build folder

# --------------------------------------------------
# FastAPI instance
# --------------------------------------------------
app = FastAPI(
    title="Multi-Factor Cardiovascular Risk Prediction API",
    version="1.0.0"
)

# --------------------------------------------------
# CORS (for React frontend)
# --------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],   # Allow all origins for dev; restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# --------------------------------------------------
# Serve React frontend
# --------------------------------------------------
if not PUBLIC_DIR.exists():
    raise RuntimeError(f"Directory {PUBLIC_DIR} does not exist! Build React app first.")

app.mount("/public", StaticFiles(directory=PUBLIC_DIR), name="public")

@app.get("/")
def home():
    """
    Serve index.html of React frontend
    """
    return FileResponse(PUBLIC_DIR / "index.html")

# --------------------------------------------------
# Include API router
# --------------------------------------------------
app.include_router(central_router)
