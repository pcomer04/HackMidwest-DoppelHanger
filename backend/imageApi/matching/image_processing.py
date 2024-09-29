import pandas as pd
import requests
from PIL import Image
from io import BytesIO
import torch
import clip
import pickle

device = "cuda" if torch.cuda.is_available() else "cpu"
model, preprocess = clip.load("ViT-B/32", device=device)

def preprocess_unsqueeze_encode_image_from_url(url: str) -> torch.Tensor:
    try:
        response = requests.get(url)
        img = Image.open(BytesIO(response.content))
        preprocessed_img = preprocess(img).unsqueeze(0).to(device)
        encoded_img = model.encode_image(preprocessed_img)
        return encoded_img
    except Exception as e:
        print(f"Error processing {url}: {e}")
        return None

# Read the CSV file and get the URLs
df = pd.read_csv('OUT.csv', nrows=400)
urls = df.iloc[:, 18].tolist()  # Now reading from column 19

# Preprocess, unsqueeze, and encode each image and store the results
results = []
for url in urls:
    encoded_img = preprocess_unsqueeze_encode_image_from_url(url)
    if encoded_img is not None:
        results.append((url, encoded_img))

# Write the results to a new .pkl file
with open('encoded_images.pkl', 'wb') as f:
    pickle.dump(results, f)