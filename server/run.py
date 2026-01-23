# server\run.py

import os
from dotenv import load_dotenv
import uvicorn

# Load .env variables
load_dotenv()

HOST = os.getenv("HOST", "127.0.0.1")
PORT = int(os.getenv("PORT", 8000))

if __name__ == "__main__":
    uvicorn.run(
        "src.app.main:app",  # path to your FastAPI app
        host=HOST,
        port=PORT,
        reload=True       # auto-reload enabled
    )
