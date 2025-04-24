import streamlit as st
import numpy as np
from PIL import Image
import pickle

with open("trained_mnist_model.pkl", "rb") as f:
    model = pickle.load(f)

st.title("MNIST Digit Classifier")

st.write("""
    Upload a 28x28 image of a handwritten digit to yield a prediction (0-9), trained on the MNIST dataset.
    """)
    
uploaded_image = st.file_uploader("Upload an Image", type=["jpg", "png", "jpeg"])

if uploaded_image is not None:
    st.image(uploaded_image, caption="Uploaded Image", use_container_width=True)
    image = Image.open(uploaded_image).convert("L") 
    image = image.resize((28, 28))

    image_array = np.array(image).astype(np.float32)
    image_array = image_array.reshape(1, -1)

    st.write("Image array shape:", image_array.shape)
    
    if st.button("Predict"):
        try:
            prediction = model.predict(image_array)[0]
            st.success(f"The predicted digit is: {prediction}")
        
        except Exception as e:
            st.error(f"Prediction failed: {str(e)}")
