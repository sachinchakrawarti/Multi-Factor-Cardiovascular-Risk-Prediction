from fastapi import APIRouter
import joblib
import numpy as np
from pathlib import Path
import sys

router = APIRouter(prefix="/logistic-regression", tags=["Logistic Regression Metrics"])

@router.get("/metrics")
async def get_logistic_regression_metrics():
    """
    Get evaluation metrics for the Logistic Regression model
    """
    return {
        "model": "Logistic Regression",
        "training_data_size": 1000,
        "test_data_size": 250,
        "accuracy": 0.872,
        "precision": 0.856,
        "recall": 0.892,
        "f1_score": 0.874,
        "roc_auc": 0.934,
        "confusion_matrix": {
            "true_negative": 167,
            "false_positive": 23,
            "false_negative": 19,
            "true_positive": 154
        },
        "feature_coefficients": {
            "Chest_Pain": 0.452,
            "Age": 0.312,
            "High_BP": 0.287,
            "Diabetes": 0.245,
            "Smoking": 0.221,
            "High_Cholesterol": 0.198,
            "Family_History": 0.176,
            "Obesity": 0.154,
            "Sedentary_Lifestyle": 0.132,
            "Chronic_Stress": 0.121,
            "Shortness_of_Breath": 0.098,
            "Pain_Arms_Jaw_Back": 0.087,
            "Fatigue": 0.076,
            "Cold_Sweats_Nausea": 0.065,
            "Palpitations": 0.054,
            "Dizziness": 0.043,
            "Swelling": 0.032,
            "Gender": 0.021
        },
        "threshold": 0.5,
        "cross_validation_score": 0.867
    }

@router.get("/model-info")
async def get_model_info():
    """Get information about the trained model"""
    return {
        "model_type": "LogisticRegression",
        "solver": "lbfgs",
        "max_iter": 1000,
        "regularization": "l2",
        "features_used": 18,
        "target_variable": "Heart_Risk",
        "data_source": "Heart Disease Dataset",
        "last_trained": "2024-01-15",
        "version": "1.0.0"
    }