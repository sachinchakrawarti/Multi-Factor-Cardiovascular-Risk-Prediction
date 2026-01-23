from fastapi import APIRouter

from src.api.svm_model_api.svm_predict import router as svm_predict_router
from src.api.svm_model_api.svm_metrics import router as svm_metrics_router
from server.src.api.v1.health_api import router as health_router

router = APIRouter()

router.include_router(svm_predict_router)
router.include_router(svm_metrics_router)
router.include_router(health_router)
