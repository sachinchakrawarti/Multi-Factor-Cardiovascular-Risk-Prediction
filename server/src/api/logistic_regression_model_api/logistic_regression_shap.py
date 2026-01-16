# server/src/api/logistic_regression_model_api/logistic_regression_shap.py

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import pandas as pd
import numpy as np
import joblib
import shap
from pathlib import Path

# Router
router = APIRouter(prefix="/logistic/shap", tags=["Logistic Regression SHAP"])

# Paths
BASE_DIR = Path(__file__).resolve().parent.parent.parent  # server/src
MODEL_PATH = BASE_DIR / "model" / "logistic_regression_model" / "logistic_model_heart_risk.pkl"
SCALER_PATH = BASE_DIR / "model" / "logistic_regression_model" / "age_scaler.pkl"

# Load model and scaler
try:
    logistic_model = joblib.load(MODEL_PATH)
except FileNotFoundError:
    raise RuntimeError(f"Model not found at {MODEL_PATH}")

try:
    age_scaler = joblib.load(SCALER_PATH)
except FileNotFoundError:
    raise RuntimeError(f"Scaler not found at {SCALER_PATH}")

# Define feature names
FEATURE_NAMES = [
    'Chest_Pain', 'Shortness_of_Breath', 'Fatigue', 'Palpitations', 'Dizziness',
    'Swelling', 'Pain_Arms_Jaw_Back', 'Cold_Sweats_Nausea', 'High_BP', 'High_Cholesterol',
    'Diabetes', 'Smoking', 'Obesity', 'Sedentary_Lifestyle', 'Family_History',
    'Chronic_Stress', 'Gender', 'Age'
]

# For SHAP, we need some background data (use a small random sample)
# In production, you could save a sample of X_train as a CSV and load it here
BACKGROUND_SAMPLE = np.zeros((1, len(FEATURE_NAMES)))  # fallback if no training sample available
masker = shap.maskers.Independent(BACKGROUND_SAMPLE)

explainer = shap.LinearExplainer(
    logistic_model,
    masker=masker,
    feature_names=FEATURE_NAMES
)

# Pydantic model for input
class PatientFeatures(BaseModel):
    Chest_Pain: int
    Shortness_of_Breath: int
    Fatigue: int
    Palpitations: int
    Dizziness: int
    Swelling: int
    Pain_Arms_Jaw_Back: int
    Cold_Sweats_Nausea: int
    High_BP: int
    High_Cholesterol: int
    Diabetes: int
    Smoking: int
    Obesity: int
    Sedentary_Lifestyle: int
    Family_History: int
    Chronic_Stress: int
    Gender: int
    Age: float

@router.post("/patient")
def explain_patient(features: PatientFeatures):
    # Convert input to dataframe
    X_patient = pd.DataFrame([features.dict()])

    # Scale age
    X_patient['Age'] = age_scaler.transform(X_patient[['Age']])

    # Compute SHAP values
    try:
        shap_values = explainer.shap_values(X_patient.to_numpy())[0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"SHAP computation failed: {str(e)}")

    # Return as dict
    shap_dict = dict(zip(FEATURE_NAMES, shap_values.tolist()))
    return {
        "shap_values": shap_dict,
        "predicted_risk": int(logistic_model.predict(X_patient)[0])
    }
