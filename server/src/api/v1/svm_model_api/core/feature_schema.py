from pydantic import BaseModel, Field

class PatientFeatures(BaseModel):
    # -------------------------
    # Symptoms (Binary: 0 / 1)
    # -------------------------
    Chest_Pain: int = Field(..., ge=0, le=1, description="Chest pain present")
    Shortness_of_Breath: int = Field(..., ge=0, le=1)
    Fatigue: int = Field(..., ge=0, le=1)
    Palpitations: int = Field(..., ge=0, le=1)
    Dizziness: int = Field(..., ge=0, le=1)
    Swelling: int = Field(..., ge=0, le=1)
    Pain_Arms_Jaw_Back: int = Field(..., ge=0, le=1)
    Cold_Sweats_Nausea: int = Field(..., ge=0, le=1)

    # -------------------------
    # Medical Conditions
    # -------------------------
    High_BP: int = Field(..., ge=0, le=1)
    High_Cholesterol: int = Field(..., ge=0, le=1)
    Diabetes: int = Field(..., ge=0, le=1)

    # -------------------------
    # Lifestyle Factors
    # -------------------------
    Smoking: int = Field(..., ge=0, le=1)
    Obesity: int = Field(..., ge=0, le=1)
    Sedentary_Lifestyle: int = Field(..., ge=0, le=1)

    # -------------------------
    # Background
    # -------------------------
    Family_History: int = Field(..., ge=0, le=1)
    Chronic_Stress: int = Field(..., ge=0, le=1)

    # -------------------------
    # Demographics
    # -------------------------
    Gender: int = Field(..., ge=0, le=1, description="0 = Female, 1 = Male")
    Age: float = Field(..., ge=1, le=120)

    class Config:
        json_schema_extra = {
            "example": {
                "Chest_Pain": 1,
                "Shortness_of_Breath": 0,
                "Fatigue": 1,
                "Palpitations": 0,
                "Dizziness": 0,
                "Swelling": 0,
                "Pain_Arms_Jaw_Back": 1,
                "Cold_Sweats_Nausea": 0,
                "High_BP": 1,
                "High_Cholesterol": 1,
                "Diabetes": 0,
                "Smoking": 1,
                "Obesity": 0,
                "Sedentary_Lifestyle": 1,
                "Family_History": 1,
                "Chronic_Stress": 1,
                "Gender": 1,
                "Age": 55
            }
        }
