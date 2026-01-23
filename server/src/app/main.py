from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from server.src.api.v1.central_api import router as central_router

app = FastAPI(
    title="Multi-Factor Cardiovascular Risk Prediction API",
    description="Predict cardiovascular disease risk using multiple ML models",
    version="1.0.0"
)

# --------------------------------------------------
# CORS (for React frontend)
# --------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # add local host for React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --------------------------------------------------
# Register all APIs
# --------------------------------------------------
app.include_router(central_router)

# --------------------------------------------------
# Health Check
# --------------------------------------------------
@app.get("/")
def health_check():
    return {
        "status": "running",
        "message": "Cardiovascular Risk Prediction API is live"
    }
