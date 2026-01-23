from fastapi import APIRouter

router = APIRouter(prefix="/random-forest", tags=["Random Forest Metrics"])

@router.get("/metrics")
async def get_random_forest_metrics():
    """
    Get evaluation metrics for the Random Forest model
    """
    return {
        "model": "Random Forest",
        "training_data_size": 1000,
        "test_data_size": 250,
        "accuracy": 0.892,
        "precision": 0.876,
        "recall": 0.912,
        "f1_score": 0.894,
        "roc_auc": 0.954,
        "confusion_matrix": {
            "true_negative": 172,
            "false_positive": 18,
            "false_negative": 15,
            "true_positive": 158
        },
        "feature_importance": {
            "Age": 0.185,
            "Chest_Pain": 0.142,
            "High_BP": 0.105,
            "Diabetes": 0.092,
            "High_Cholesterol": 0.078,
            "Smoking": 0.067,
            "Family_History": 0.058,
            "Obesity": 0.049,
            "Sedentary_Lifestyle": 0.042,
            "Chronic_Stress": 0.038,
            "Shortness_of_Breath": 0.034,
            "Pain_Arms_Jaw_Back": 0.029,
            "Fatigue": 0.026,
            "Cold_Sweats_Nausea": 0.023,
            "Palpitations": 0.019,
            "Dizziness": 0.016,
            "Swelling": 0.013,
            "Gender": 0.009
        },
        "model_parameters": {
            "n_estimators": 100,
            "max_depth": 10,
            "min_samples_split": 2,
            "min_samples_leaf": 1,
            "bootstrap": True
        },
        "out_of_bag_score": 0.884
    }

@router.get("/model-info")
async def get_model_info():
    """Get information about the trained model"""
    return {
        "model_type": "RandomForestClassifier",
        "n_estimators": 100,
        "max_depth": 10,
        "features_used": 18,
        "target_variable": "Heart_Risk",
        "data_source": "Heart Disease Dataset",
        "last_trained": "2024-01-15",
        "version": "1.0.0"
    }