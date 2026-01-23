from fastapi import APIRouter
from pathlib import Path

router = APIRouter(prefix="/health", tags=["Health"])

BASE_DIR = Path(__file__).resolve().parents[2] / "model"

MODELS = {
    "svm": {
        "model": BASE_DIR / "Model_3_SVM" / "svm_model.pkl",
        "metrics": BASE_DIR / "Model_3_SVM" / "svm_metrics.pkl",
    },
  
    # you can add more models here later
}

@router.get("/models")
def health_models():
    status = {}

    for model_name, paths in MODELS.items():
        status[model_name] = {
            "model": "ready" if paths["model"].exists() else "missing",
            "metrics": "ready" if paths["metrics"].exists() else "missing",
        }

    return {
        "status": "ok",
        "models": status
    }
