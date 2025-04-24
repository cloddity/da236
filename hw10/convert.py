import json
import numpy as np
from PIL import Image

def image_to_payload(image_path):
    img = Image.open(image_path).convert("L")
    img = img.resize((28, 28))

    pixels = np.array(img).flatten().tolist()
    pixels = [int(p) for p in pixels]

    payload = {"pixels": pixels}
    json_str = json.dumps(payload, indent=2)
    print(json_str)

if __name__ == "__main__":
    image_path = "digit.png"  
    image_to_payload(image_path)
