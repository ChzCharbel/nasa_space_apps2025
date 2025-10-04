# main.py
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

# Define a data model (for POST requests)
class ExoplanetInput(BaseModel):
    brightness: float
    mass: float
    temperature: float

@app.get("/")
def root():
    return {"message": "Exoplanet API is running!"}

@app.post("/predict")
def predict(data: ExoplanetInput):
    # Placeholder: your ML model would go here
    if data.mass > 5 and data.brightness < 0.8:
        return {"is_exoplanet": True}
    return {"is_exoplanet": False}
