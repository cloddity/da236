from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import numpy as np
import uvicorn

# Load the trained model
model = joblib.load('model.pkl')

# Create the FastAPI app
app = FastAPI(title="Iris Flower Classifier API")

# Define the input data model
class IrisFeatures(BaseModel):
    SepalLengthCm: float
    SepalWidthCm: float
    PetalLengthCm: float
    PetalWidthCm: float

class PredictionResponse(BaseModel):
    prediction: str
    predicted_class: str
    probability: float

class_names = {
    0: 'Iris-setosa',
    1: 'Iris-versicolor',
    2: 'Iris-virginica'
}

@app.get("/")
def read_root():
    return {"message": "Welcome to the Iris Flower Classifier API"}

@app.post("/predict", response_model=PredictionResponse)
def predict(features: IrisFeatures):
    try:
        features_array = np.array([[
            features.SepalLengthCm,
            features.SepalWidthCm,
            features.PetalLengthCm,
            features.PetalWidthCm
        ]])
        
        prediction = model.predict(features_array)[0]
        prediction_proba = model.predict_proba(features_array)[0].max()
        
        return {
            "prediction": str(prediction),
            "predicted_class": class_names.get(int(prediction)) if isinstance(prediction, (int, np.integer)) else prediction,
            "probability": float(prediction_proba)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)