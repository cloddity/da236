import pytest
import joblib
import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from fastapi.testclient import TestClient
from app import app

def test_model_loading():
    model = joblib.load('model.pkl')
    assert model is not None

def test_predict_endpoint():
    client = TestClient(app)
    response = client.post("/predict", json={
        "SepalLengthCm": 5.1,
        "SepalWidthCm": 3.5,
        "PetalLengthCm": 1.4,
        "PetalWidthCm": 0.2
    })
    assert response.status_code == 200
    assert "prediction" in response.json()
    assert "predicted_class" in response.json()