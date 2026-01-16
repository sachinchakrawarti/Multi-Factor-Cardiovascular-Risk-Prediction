from fastapi import APIRouter
from pydantic import BaseModel
import numpy as np
import joblib
import os
from pathlib import Path

router = APIRouter(
    prefix="/logistic-regression",
    tags=["Logistic Regression Model"]
)

# --------------------------------------------------
# Load model & scaler
# --------------------------------------------------
BASE_DIR = Path(__file__).resolve().parent.parent.parent  # server/src
MODEL_PATH = BASE_DIR / "model" / "logistic_regression_model" / "logistic_model_heart_risk.pkl"
SCALER_PATH = BASE_DIR / "model" / "logistic_regression_model" / "age_scaler.pkl"

logistic_model = joblib.load(MODEL_PATH)
age_scaler = joblib.load(SCALER_PATH)

# --------------------------------------------------
# Feature order (MUST match training)
# --------------------------------------------------
FEATURE_NAMES = [
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

# --------------------------------------------------
# Input schema
# --------------------------------------------------
class LogisticRegressionInput(BaseModel):
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

# --------------------------------------------------
# Prediction endpoint
# --------------------------------------------------
@router.post("/predict")
def predict_heart_risk(data: LogisticRegressionInput):

    X = np.array([[getattr(data, f) for f in FEATURE_NAMES]])

    # Scale Age
    X[:, -1] = age_scaler.transform(X[:, -1].reshape(-1, 1)).ravel()

    probability = logistic_model.predict_proba(X)[0][1]

    if probability < 0.30:
        risk_band = "Low Risk"
    elif probability < 0.60:
        risk_band = "Medium Risk"
    else:
        risk_band = "High Risk"

    return {
        "model": "Logistic Regression",
        "heart_risk_probability": round(float(probability), 4),
        "risk_band": risk_band
    }
