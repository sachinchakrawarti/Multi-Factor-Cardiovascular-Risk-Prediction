# server\src\api\logistic_regression_model_api\logistic_regression_predict.py

from fastapi import APIRouter, HTTPException
import joblib
import numpy as np
from pathlib import Path
import sys

# Add parent directory to path for imports
sys.path.append(str(Path(__file__).resolve().parents[2]))
from api.core.feature_schema import PatientFeatures

router = APIRouter(prefix="/logistic-regression", tags=["Logistic Regression"])

# --------------------------------------------------
# Absolute safe paths
# --------------------------------------------------
BASE_DIR = Path(__file__).resolve().parents[3]
MODEL_PATH = BASE_DIR / "model" / "logistic_regression_model" / "logistic_model.pkl"
SCALER_PATH = BASE_DIR / "model" / "logistic_regression_model" / "scaler.pkl"

# --------------------------------------------------
# Lazy loading (NO crash on startup)
# --------------------------------------------------
logistic_model = None
scaler = None

def load_assets():
    global logistic_model, scaler

    if logistic_model is None:
        if not MODEL_PATH.exists():
            raise HTTPException(
                status_code=500,
                detail=f"Logistic model not found at {MODEL_PATH}"
            )
        logistic_model = joblib.load(MODEL_PATH)

    if scaler is None:
        if not SCALER_PATH.exists():
            raise HTTPException(
                status_code=500,
                detail=f"Scaler not found at {SCALER_PATH}"
            )
        scaler = joblib.load(SCALER_PATH)

# --------------------------------------------------
# Prediction Endpoint
# --------------------------------------------------
@router.post("/predict")
def predict_heart_disease(data: PatientFeatures):
    """
    Predict heart disease risk using Logistic Regression model
    """
    load_assets()

    # Prepare features in the exact order from your CSV
    features = np.array([[
        data.Chest_Pain,
        data.Shortness_of_Breath,
        data.Fatigue,
        data.Palpitations,
        data.Dizziness,
        data.Swelling,
        data.Pain_Arms_Jaw_Back,
        data.Cold_Sweats_Nausea,
        data.High_BP,
        data.High_Cholesterol,
        data.Diabetes,
        data.Smoking,
        data.Obesity,
        data.Sedentary_Lifestyle,
        data.Family_History,
        data.Chronic_Stress,
        data.Gender,
        data.Age,
    ]], dtype=np.float32)

    # Scale features
    features_scaled = scaler.transform(features)

    # Get prediction
    prob = logistic_model.predict_proba(features_scaled)[0][1]
    pred = int(prob >= 0.5)
    
    # Determine risk level
    if prob < 0.3:
        risk_band = "Low"
        recommendation = "Maintain healthy lifestyle with regular checkups"
    elif prob < 0.7:
        risk_band = "Medium"
        recommendation = "Consult cardiologist, improve lifestyle factors"
    else:
        risk_band = "High"
        recommendation = "Immediate medical consultation recommended"

    return {
        "model": "logistic_regression",
        "prediction": "Heart Disease Detected" if pred == 1 else "No Heart Disease",
        "predicted_class": pred,
        "probability": round(float(prob), 4),
        "risk_level": risk_band,
        "recommendation": recommendation,
        "confidence": "high" if abs(prob - 0.5) > 0.3 else "medium"
    }

@router.get("/features")
async def get_feature_order():
    """Get the exact feature order used by the model"""
    return {
        "feature_order": [
            "Chest_Pain",
            "Shortness_of_Breath", 
            "Fatigue",
            "Palpitations",
            "Dizziness",
            "Swelling",
            "Pain_Arms_Jaw_Back",
            "Cold_Sweats_Nausea",
            "High_BP",
            "High_Cholesterol",
            "Diabetes",
            "Smoking",
            "Obesity",
            "Sedentary_Lifestyle",
            "Family_History",
            "Chronic_Stress",
            "Gender",
            "Age"
        ]
    }