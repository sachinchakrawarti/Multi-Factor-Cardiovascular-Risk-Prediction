from fastapi import APIRouter, HTTPException
import joblib
import numpy as np
from pathlib import Path
import sys

# Add parent directory to path for imports
sys.path.append(str(Path(__file__).resolve().parents[2]))
from api.core.feature_schema import PatientFeatures

router = APIRouter(prefix="/random-forest", tags=["Random Forest"])

# --------------------------------------------------
# Absolute safe paths
# --------------------------------------------------
BASE_DIR = Path(__file__).resolve().parents[3]
MODEL_PATH = BASE_DIR / "model" / "random_forest_model" / "random_forest_heart_risk.pkl"

# --------------------------------------------------
# Lazy loading (NO crash on startup)
# --------------------------------------------------
random_forest_model = None

def load_model():
    global random_forest_model
    
    if random_forest_model is None:
        if not MODEL_PATH.exists():
            raise HTTPException(
                status_code=500,
                detail=f"Random Forest model not found at {MODEL_PATH}"
            )
        random_forest_model = joblib.load(MODEL_PATH)

# --------------------------------------------------
# Prediction Endpoint
# --------------------------------------------------
@router.post("/predict")
def predict_heart_disease(data: PatientFeatures):
    """
    Predict heart disease risk using Random Forest model
    """
    load_model()

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

    # Get prediction (Random Forest doesn't need scaling)
    prob = random_forest_model.predict_proba(features)[0][1]
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
        "model": "random_forest",
        "prediction": "Heart Disease Detected" if pred == 1 else "No Heart Disease",
        "predicted_class": pred,
        "probability": round(float(prob), 4),
        "risk_level": risk_band,
        "recommendation": recommendation,
        "confidence": "high" if abs(prob - 0.5) > 0.3 else "medium",
        "trees_used": random_forest_model.n_estimators
    }