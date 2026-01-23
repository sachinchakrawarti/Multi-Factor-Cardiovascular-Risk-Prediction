from fastapi import APIRouter, HTTPException
import joblib
from pathlib import Path

router = APIRouter(prefix="/svm", tags=["SVM Metrics"])

# --------------------------------------------------
# Correct path to metrics
# --------------------------------------------------
BASE_DIR = Path(__file__).resolve().parents[2]
METRICS_PATH = BASE_DIR / "model" / "Model_3_SVM" / "svm_metrics.pkl"

# --------------------------------------------------
# Metrics Endpoint
# --------------------------------------------------
@router.get("/metrics")
def get_svm_metrics():
    """
    Get detailed SVM metrics including:
    - accuracy, precision, recall, f1_score, ROC-AUC
    - confusion matrix components: TP, TN, FP, FN
    - full confusion matrix, support, training time
    """
    if not METRICS_PATH.exists():
        raise HTTPException(
            status_code=500,
            detail=f"SVM metrics file not found at {METRICS_PATH}"
        )

    metrics = joblib.load(METRICS_PATH)

    # Ensure we return all expected keys (frontend consistency)
    expected_keys = [
        "model_name", "accuracy", "precision", "recall", "f1_score", "roc_auc",
        "true_positive", "true_negative", "false_positive", "false_negative",
        "confusion_matrix", "support", "training_time_minutes"
    ]

    # Fill missing keys with None (in case older metrics file exists)
    for key in expected_keys:
        if key not in metrics:
            metrics[key] = None

    return {
        "model": "svm",
        "metrics": metrics
    }
