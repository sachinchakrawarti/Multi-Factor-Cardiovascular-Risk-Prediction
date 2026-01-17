from pydantic import BaseModel, Field
from typing import Optional
from enum import Enum

class PatientFeatures(BaseModel):
    """Common feature schema for all heart disease prediction models"""
    
    # Symptoms
    Chest_Pain: float = Field(
        ge=0, le=3,
        description="Chest pain level: 0=None, 1=Mild, 2=Moderate, 3=Severe"
    )
    
    Shortness_of_Breath: float = Field(
        ge=0, le=1,
        description="Shortness of breath: 0=No, 1=Yes"
    )
    
    Fatigue: float = Field(
        ge=0, le=1,
        description="Fatigue: 0=No, 1=Yes"
    )
    
    Palpitations: float = Field(
        ge=0, le=1,
        description="Palpitations: 0=No, 1=Yes"
    )
    
    Dizziness: float = Field(
        ge=0, le=1,
        description="Dizziness: 0=No, 1=Yes"
    )
    
    Swelling: float = Field(
        ge=0, le=1,
        description="Swelling in legs/ankles: 0=No, 1=Yes"
    )
    
    Pain_Arms_Jaw_Back: float = Field(
        ge=0, le=1,
        description="Pain radiating to arms/jaw/back: 0=No, 1=Yes"
    )
    
    Cold_Sweats_Nausea: float = Field(
        ge=0, le=1,
        description="Cold sweats or nausea: 0=No, 1=Yes"
    )
    
    # Risk Factors
    High_BP: float = Field(
        ge=0, le=1,
        description="High blood pressure: 0=No, 1=Yes"
    )
    
    High_Cholesterol: float = Field(
        ge=0, le=1,
        description="High cholesterol: 0=No, 1=Yes"
    )
    
    Diabetes: float = Field(
        ge=0, le=1,
        description="Diabetes: 0=No, 1=Yes"
    )
    
    Smoking: float = Field(
        ge=0, le=1,
        description="Smoking: 0=No, 1=Yes"
    )
    
    Obesity: float = Field(
        ge=0, le=1,
        description="Obesity (BMI > 30): 0=No, 1=Yes"
    )
    
    Sedentary_Lifestyle: float = Field(
        ge=0, le=1,
        description="Sedentary lifestyle: 0=No, 1=Yes"
    )
    
    Family_History: float = Field(
        ge=0, le=1,
        description="Family history of heart disease: 0=No, 1=Yes"
    )
    
    Chronic_Stress: float = Field(
        ge=0, le=1,
        description="Chronic stress: 0=No, 1=Yes"
    )
    
    # Demographics
    Gender: float = Field(
        ge=0, le=1,
        description="Gender: 0=Female, 1=Male"
    )
    
    Age: float = Field(
        ge=18, le=120,
        description="Age in years"
    )
    
    class Config:
        schema_extra = {
            "example": {
                "Chest_Pain": 1.0,
                "Shortness_of_Breath": 1.0,
                "Fatigue": 0.0,
                "Palpitations": 1.0,
                "Dizziness": 0.0,
                "Swelling": 0.0,
                "Pain_Arms_Jaw_Back": 1.0,
                "Cold_Sweats_Nausea": 0.0,
                "High_BP": 1.0,
                "High_Cholesterol": 1.0,
                "Diabetes": 0.0,
                "Smoking": 1.0,
                "Obesity": 1.0,
                "Sedentary_Lifestyle": 1.0,
                "Family_History": 1.0,
                "Chronic_Stress": 1.0,
                "Gender": 1.0,
                "Age": 55.0
            }
        }