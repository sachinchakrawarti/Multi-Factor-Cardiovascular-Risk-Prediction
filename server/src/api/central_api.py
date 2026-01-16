from fastapi import APIRouter

# --------------------------------------------------
# Logistic Regression APIs
# --------------------------------------------------
from src.api.logistic_regression_model_api.logistic_regression_predict import (
    router as logistic_regression_predict_router
)
from src.api.logistic_regression_model_api.logistic_regression_metrics import (
    router as logistic_regression_metrics_router
)
from src.api.logistic_regression_model_api.logistic_regression_shap import (
    router as logistic_regression_shap_router
)

# --------------------------------------------------
# Random Forest APIs
# --------------------------------------------------
# from src.api.random_forest_model_api.random_forest_predict import (
#     router as random_forest_predict_router
# )
# from src.api.random_forest_model_api.random_forest_metrics import (
#     router as random_forest_metrics_router
# )
# from src.api.random_forest_model_api.random_forest_shap import (
#     router as random_forest_shap_router
# )

# --------------------------------------------------
# Central Router
# --------------------------------------------------
router = APIRouter()

# Logistic Regression routes
router.include_router(logistic_regression_predict_router)
router.include_router(logistic_regression_metrics_router)
router.include_router(logistic_regression_shap_router)

# # Random Forest routes
# router.include_router(random_forest_predict_router)
# router.include_router(random_forest_metrics_router)
# router.include_router(random_forest_shap_router)
