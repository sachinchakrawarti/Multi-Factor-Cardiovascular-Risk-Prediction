import uvicorn
import sys
from pathlib import Path

# Add the server/src directory to Python path
BASE_DIR = Path(__file__).resolve().parent.parent
sys.path.append(str(BASE_DIR))

from api.central_api import app

if __name__ == "__main__":
    print("Starting Heart Disease Prediction API...")
    print(f"Base directory: {BASE_DIR}")
    print("Available endpoints:")
    print("  - http://localhost:8000/")
    print("  - http://localhost:8000/docs")
    print("  - http://localhost:8000/health")
    print("  - http://localhost:8000/features")
    print("  - http://localhost:8000/logistic-regression/predict")
    print("  - http://localhost:8000/random-forest/predict")
    
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=8000,
        reload=True  # Enable auto-reload during development
    )