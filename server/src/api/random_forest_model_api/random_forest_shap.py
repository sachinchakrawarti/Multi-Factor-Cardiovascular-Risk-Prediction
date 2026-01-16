from fastapi import APIRouter
from pydantic import BaseModel
import numpy as np
import joblib
import shap
import os

router = APIRouter(
    prefix="/random-forest",
    tags=["Random Forest Explainability"]
)

MODEL_PATH = os.path.join(
    "server", "src", "model", "random_forest_model",
    "random_forest_heart_risk.pkl"
)

random_forest_model = joblib.load(MODEL_PATH)
explainer = shap.TreeExplainer(random_forest_model)

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

@router.post("/shap")
def shap_explanation(data: RandomForestInput):

    X = np.array([[getattr(data, f) for f in FEATURE_NAMES]])

    shap_values = explainer.shap_values(X)[1]

    ranked_features = sorted(
        zip(FEATURE_NAMES, shap_values),
        key=lambda x: abs(x[1]),
        reverse=True
    )[:5]

    return {
        "model": "Random Forest",
        "top_risk_factors": [
            {
                "feature": feature,
                "impact": round(float(value), 4)
            }
            for feature, value in ranked_features
        ]
    }
