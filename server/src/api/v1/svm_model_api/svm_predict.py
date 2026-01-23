from fastapi import APIRouter, HTTPException
import joblib
import numpy as np
from pathlib import Path
import sys

# Add root path for imports
sys.path.append(str(Path(__file__).resolve().parents[2]))
from api.core.feature_schema import PatientFeatures

router = APIRouter(prefix="/svm", tags=["SVM"])

# --------------------------------------------------
# Paths
# --------------------------------------------------
BASE_DIR = Path(__file__).resolve().parents[2]
MODEL_PATH = BASE_DIR / "model" / "Model_3_SVM" / "svm_model.pkl"
SCALER_PATH = BASE_DIR / "model" / "Model_3_SVM" / "svm_scaler.pkl"

# --------------------------------------------------
# Lazy loading
# --------------------------------------------------
svm_model = None
scaler = None

def load_assets():
    global svm_model, scaler

    if svm_model is None:
        if not MODEL_PATH.exists():
            raise HTTPException(
                status_code=500,
                detail=f"SVM model not found at {MODEL_PATH}"
            )
        svm_model = joblib.load(MODEL_PATH)

    if scaler is None:
        if not SCALER_PATH.exists():
            raise HTTPException(
                status_code=500,
                detail=f"SVM scaler not found at {SCALER_PATH}"
            )
        scaler = joblib.load(SCALER_PATH)

# --------------------------------------------------
# Prediction Endpoint
# --------------------------------------------------
@router.post("/predict")
def predict_heart_disease(data: PatientFeatures):
    """
    Predict heart disease risk using the trained SVM model.
    Returns only the main prediction.
    """
    load_assets()

    # Prepare features in the exact order
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
        data.Age
    ]], dtype=np.float32)

    # Scale features
    features_scaled = scaler.transform(features)

    # Make prediction
    pred = int(svm_model.predict(features_scaled)[0])

    return {
        "model": "svm",
        "prediction": "Heart Disease Detected" if pred == 1 else "No Heart Disease",
        "predicted_class": pred
    }
