from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sys
from pathlib import Path

# Add the server/src directory to Python path
BASE_DIR = Path(__file__).resolve().parent.parent
sys.path.append(str(BASE_DIR))

# Import routers from both model APIs
try:
    from api.logistic_regression_model_api.logistic_regression_predict import router as logistic_predict_router
    from api.logistic_regression_model_api.logistic_regression_metrics import router as logistic_metrics_router
    from api.random_forest_model_api.random_forest_predict import router as random_forest_predict_router
    from api.random_forest_model_api.random_forest_metrics import router as random_forest_metrics_router
    from api.core.feature_schema import PatientFeatures
except ImportError as e:
    print(f"Import error: {e}")
    # Create dummy routers for testing
    from fastapi import APIRouter
    logistic_predict_router = APIRouter()
    logistic_metrics_router = APIRouter()
    random_forest_predict_router = APIRouter()
    random_forest_metrics_router = APIRouter()

app = FastAPI(
    title="Heart Disease Prediction API",
    description="API for predicting heart disease risk using multiple machine learning models",
    version="2.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configure CORS
# Update the CORS origins to include port 5174
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5174",    # Vite default port
        "http://localhost:5173",    # Vite alternative port
        "http://127.0.0.1:5174",
        "http://127.0.0.1:5173",
        "http://localhost:3000",    # Create React App default
        "http://127.0.0.1:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)
# Include all routers
app.include_router(logistic_predict_router)
app.include_router(logistic_metrics_router)
app.include_router(random_forest_predict_router)
app.include_router(random_forest_metrics_router)

@app.get("/")
async def root():
    return {
        "message": "Heart Disease Prediction API",
        "version": "2.0.0",
        "description": "Predict heart disease risk using Logistic Regression and Random Forest models",
        "models_available": ["logistic_regression", "random_forest"],
        "endpoints": {
            "logistic_regression": {
                "predict": "POST /logistic-regression/predict",
                "metrics": "GET /logistic-regression/metrics",
                "model_info": "GET /logistic-regression/model-info",
                "features": "GET /logistic-regression/features"
            },
            "random_forest": {
                "predict": "POST /random-forest/predict",
                "metrics": "GET /random-forest/metrics",
                "model_info": "GET /random-forest/model-info"
            }
        },
        "example_request": {
            "Chest_Pain": 1.0,
            "Shortness_of_Breath": 1.0,
            "Fatigue": 0.0,
            "Palpitations": 1.0,
            "Dizziness": 0.0,
            "Swelling": 0.0,
            "Pain_Arms_Jaw_Back": 1.0,
            "Cold_Sweats_Nausea": 0.0,
            "High_BP": 1.0,
            "High_Cholesterol": 1.0,
            "Diabetes": 0.0,
            "Smoking": 1.0,
            "Obesity": 1.0,
            "Sedentary_Lifestyle": 1.0,
            "Family_History": 1.0,
            "Chronic_Stress": 1.0,
            "Gender": 1.0,
            "Age": 55.0
        }
    }

@app.get("/health")
async def health_check():
    return {
        "status": "healthy", 
        "service": "heart-disease-prediction-api",
        "timestamp": "2024-01-15T10:30:00Z"
    }

@app.get("/features")
async def get_all_features():
    """Get all available features with descriptions"""
    return {
        "features": [
            {"name": "Chest_Pain", "type": "float", "range": "0-3", "description": "Chest pain level"},
            {"name": "Shortness_of_Breath", "type": "float", "range": "0-1", "description": "Shortness of breath"},
            {"name": "Fatigue", "type": "float", "range": "0-1", "description": "Fatigue"},
            {"name": "Palpitations", "type": "float", "range": "0-1", "description": "Palpitations"},
            {"name": "Dizziness", "type": "float", "range": "0-1", "description": "Dizziness"},
            {"name": "Swelling", "type": "float", "range": "0-1", "description": "Swelling in legs/ankles"},
            {"name": "Pain_Arms_Jaw_Back", "type": "float", "range": "0-1", "description": "Pain radiating to arms/jaw/back"},
            {"name": "Cold_Sweats_Nausea", "type": "float", "range": "0-1", "description": "Cold sweats or nausea"},
            {"name": "High_BP", "type": "float", "range": "0-1", "description": "High blood pressure"},
            {"name": "High_Cholesterol", "type": "float", "range": "0-1", "description": "High cholesterol"},
            {"name": "Diabetes", "type": "float", "range": "0-1", "description": "Diabetes"},
            {"name": "Smoking", "type": "float", "range": "0-1", "description": "Smoking"},
            {"name": "Obesity", "type": "float", "range": "0-1", "description": "Obesity (BMI > 30)"},
            {"name": "Sedentary_Lifestyle", "type": "float", "range": "0-1", "description": "Sedentary lifestyle"},
            {"name": "Family_History", "type": "float", "range": "0-1", "description": "Family history of heart disease"},
            {"name": "Chronic_Stress", "type": "float", "range": "0-1", "description": "Chronic stress"},
            {"name": "Gender", "type": "float", "range": "0-1", "description": "Gender (0=Female, 1=Male)"},
            {"name": "Age", "type": "float", "range": "18-120", "description": "Age in years"}
        ]
    }