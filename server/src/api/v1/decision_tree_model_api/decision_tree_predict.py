from fastapi import APIRouter, HTTPException
import joblib
import numpy as np
from pathlib import Path

from src.api.core.feature_schema import HeartDiseaseFeatures

router = APIRouter(
    prefix="/decision-tree",
    tags=["Decision Tree"]
)

# --------------------------------------------------
# Model & Scaler paths
# --------------------------------------------------
BASE_DIR = Path(__file__).resolve().parents[3]

MODEL_PATH = BASE_DIR / "model" / "Model_2_Decision_Tree" / "decision_tree_model.pkl"
SCALER_PATH = BASE_DIR / "model" / "Model_2_Decision_Tree" / "decision_tree_scaler.pkl"


@router.post("/predict")
def predict_decision_tree(data: HeartDiseaseFeatures):
    """
    Predict heart disease risk using Decision Tree model
    """
    if not MODEL_PATH.exists():
        raise HTTPException(
            status_code=500,
            detail=f"Decision Tree model not found at {MODEL_PATH}"
        )

    if not SCALER_PATH.exists():
        raise HTTPException(
            status_code=500,
            detail=f"Decision Tree scaler not found at {SCALER_PATH}"
        )

    try:
        model = joblib.load(MODEL_PATH)
        scaler = joblib.load(SCALER_PATH)

        input_data = np.array([list(data.dict().values())])
        input_scaled = scaler.transform(input_data)

        prediction = model.predict(input_scaled)[0]
        probability = model.predict_proba(input_scaled)[0][1]

        return {
            "model": "Decision Tree",
            "prediction": "Heart Disease" if prediction == 1 else "No Heart Disease",
            "predicted_class": int(prediction),
            "probability": round(float(probability), 4)
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )
