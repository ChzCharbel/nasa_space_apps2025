# main.py
from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import csv
import json

from services.datasets import get_dataset_objects, select_clean_dataset
from services.analisis import analyze_observation, analyze_full_dataset



app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or specify ["http://localhost:5173"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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

@app.get("/datasets")
def fetch_datasets():
    return get_dataset_objects()

@app.get("/select-dataset/{datasetId}")
def select_dataset(datasetId: str):
    result = select_clean_dataset(datasetId)
    return result

@app.post("/analyze-dataset")
async def handle_observation():
    observation = "" # read body of request, should contain parameters in json obj

    result = analyze_observation(observation)


    return ""

@app.post("/upload-csv")
async def handle_dataset_upload(file: UploadFile = File(...)):
    contents = await file.read()

    result = analyze_full_dataset(contents)

    return ""
