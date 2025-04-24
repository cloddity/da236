import pickle
import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split

with open("mnist.pkl", "rb") as f:
    data_tuple = pickle.load(f, encoding='latin1')

train_data, train_labels = data_tuple[0]
test_data, test_labels = data_tuple[1]

model = LogisticRegression(max_iter=1000)
model.fit(train_data, train_labels)

with open("trained_mnist_model.pkl", "wb") as f:
    pickle.dump(model, f)

print("Model trained and saved successfully!")