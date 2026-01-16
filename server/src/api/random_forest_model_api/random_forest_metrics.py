from fastapi import APIRouter
from pydantic import BaseModel
import numpy as np
import joblib
import os

router = APIRouter(
    prefix="/random-forest",
    tags=["Random Forest Model"]
)

MODEL_PATH = os.path.join(
    "server", "src", "model", "random_forest_model",
    "random_forest_heart_risk.pkl"
)

random_forest_model = joblib.load(MODEL_PATH)

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

class RandomForestInput(BaseModel):
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

@router.post("/metrics")
def per_test_metrics(data: RandomForestInput):

    X = np.array([[getattr(data, f) for f in FEATURE_NAMES]])

    prediction = int(random_forest_model.predict(X)[0])
    probabilities = random_forest_model.predict_proba(X)[0]

    return {
        "model": "Random Forest",
        "prediction": prediction,
        "probability_low_risk": round(float(probabilities[0]), 4),
        "probability_high_risk": round(float(probabilities[1]), 4),
        "confidence": round(float(max(probabilities)), 4),
        "explanation": (
            "Precision, recall, and F1-score are dataset-level metrics "
            "and cannot be computed for a single test instance."
        )
    }
