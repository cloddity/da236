from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np

with open("trained_mnist_model.pkl", "rb") as f:
    model = pickle.load(f, encoding='latin1') 

app = Flask(__name__)
CORS(app)

@app.route("/predict", methods=["POST"])
def predict_digit():
    data = request.get_json()

    pixels = data.get("pixels")
    if not pixels or len(pixels) != 784:
        return jsonify({
            "error": "Must provide a list of 784 pixel values."
        }), 400

    try:
        features = np.array(pixels, dtype=np.float32).reshape(1, -1)
        prediction = model.predict(features)[0]
    except Exception as e:
        return jsonify({"error": f"Prediction failed: {str(e)}"}), 500

    return jsonify({
        "input_shape": [1, 784],
        "predicted_digit": int(prediction)
    })

if __name__ == "__main__":
    app.run(debug=True)