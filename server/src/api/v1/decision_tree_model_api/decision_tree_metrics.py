from fastapi import APIRouter, HTTPException
import joblib
from pathlib import Path

router = APIRouter(
    prefix="/decision-tree",
    tags=["Decision Tree"]
)

# --------------------------------------------------
# Metrics file path
# --------------------------------------------------
BASE_DIR = Path(__file__).resolve().parents[3]
METRICS_PATH = BASE_DIR / "model" / "Model_2_Decision_Tree" / "decision_tree_metrics.pkl"


@router.get("/metrics")
def get_decision_tree_metrics():
    """
    Return Decision Tree evaluation metrics
    """
    if not METRICS_PATH.exists():
        raise HTTPException(
            status_code=404,
            detail=f"Decision Tree metrics file not found at {METRICS_PATH}"
        )

    try:
        metrics = joblib.load(METRICS_PATH)
        return {
            "model": "Decision Tree",
            "metrics": metrics
        }
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )
