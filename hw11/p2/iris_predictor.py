import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import joblib
import os

data_dir = 'data'
iris_path = os.path.join(data_dir, 'Iris.csv')
print(f"Loading dataset from {iris_path}")

df = pd.read_csv(iris_path)
print("Column names in CSV:", df.columns.tolist())
print(f"Dataset shape: {df.shape}")
print("First 3 rows:")
print(df.head(3))

X = df.drop('Species', axis=1)
y = df['Species']
print(f"Features: {X.columns.tolist()}")

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

print("Training the model...")
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"Model accuracy: {accuracy:.2f}")
print("\nClassification Report:")
print(classification_report(y_test, y_pred))

joblib.dump(model, 'model.pkl')
print("Model saved as model.pkl")

feature_importances = pd.DataFrame(
    model.feature_importances_,
    index=X.columns,
    columns=['Importance']
).sort_values('Importance', ascending=False)

print("\nFeature Importances:")
print(feature_importances)