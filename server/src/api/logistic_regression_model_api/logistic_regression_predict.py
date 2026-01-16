# server/src/api/logistic_regression_model_api/logistic_regression_predict.py

import joblib
from fastapi import APIRouter
from pydantic import BaseModel
from pathlib import Path

# Router
router = APIRouter(prefix="/logistic/predict", tags=["Logistic Regression"])

# Paths
BASE_DIR = Path(__file__).resolve().parent.parent.parent
MODEL_PATH = BASE_DIR / "model" / "logistic_regression_model" / "logistic_model_heart_risk.pkl"
SCALER_PATH = BASE_DIR / "model" / "logistic_regression_model" / "age_scaler.pkl"

# Load model and scaler
logistic_model = joblib.load(MODEL_PATH)
age_scaler = joblib.load(SCALER_PATH)

# Define expected input schema
class PatientData(BaseModel):
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

# Feature order for prediction
FEATURE_ORDER = [
    "Chest_Pain", "Shortness_of_Breath", "Fatigue", "Palpitations", "Dizziness",
    "Swelling", "Pain_Arms_Jaw_Back", "Cold_Sweats_Nausea", "High_BP", "High_Cholesterol",
    "Diabetes", "Smoking", "Obesity", "Sedentary_Lifestyle", "Family_History",
    "Chronic_Stress", "Gender", "Age"
]

# Risk bands
def risk_band(prob: float) -> str:
    if prob < 0.3:
        return "Low"
    elif prob < 0.7:
        return "Medium"
    else:
        return "High"

# Prediction endpoint
@router.post("/patient")
def predict_patient(data: PatientData):
    # Convert input to model features in correct order
    input_features = [[
        getattr(data, f) for f in FEATURE_ORDER
    ]]

    # Scale Age only
    input_features[0][-1] = age_scaler.transform([[input_features[0][-1]]])[0][0]

    # Predict probability
    prob = logistic_model.predict_proba(input_features)[0][1]  # probability of class 1
    pred_class = int(prob >= 0.5)

    return {
        "predicted_class": pred_class,
        "predicted_probability": round(prob, 4),
        "risk_band": risk_band(prob)
    }
