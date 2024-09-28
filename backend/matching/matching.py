import torch
import clip
import pandas as pd
import requests
from PIL import Image
from io import BytesIO
from typing import List, Tuple

device = "cuda" if torch.cuda.is_available() else "cpu"
model, preprocess = clip.load("ViT-B/32", device=device)
cos = torch.nn.CosineSimilarity(dim=1)


def encode_image_from_url(url: str) -> torch.Tensor:
    response = requests.get(url)
    if response.status_code != 200:
        raise ValueError(f"Unable to retrieve image from {url}, status code: {response.status_code}")
    if not response.headers['content-type'].startswith('image/'):
        raise ValueError(f"URL does not point to an image: {url}")
    img = Image.open(BytesIO(response.content))
    preprocessed_img = preprocess(img).unsqueeze(0).to(device)
    return model.encode_image(preprocessed_img)


def calculate_similarity(image1: torch.Tensor, images: List[torch.Tensor]) -> List[Tuple[float, str]]:
    similarities = []
    for i, image2 in enumerate(images):
        similarity = cos(image1, image2).item()
        similarity = (similarity + 1) / 2
        similarities.append((similarity, urls[i]))
    return similarities


# Read the CSV file and get the URLs
df = pd.read_csv('out.csv', nrows=400)
urls = df.iloc[:, 18].tolist()

# URL of the image you want to compare
image_url = "https://cdni.llbean.net/is/image/wim/517588_35336_41?hei=1092&wid=950&resMode=sharp2&defaultImage=llbprod/517588_35336_41"
# https://cdni.llbean.net/is/image/wim/517588_35336_41?hei=1092&wid=950&resMode=sharp2&defaultImage=llbprod/517588_35336_41

image_to_compare = encode_image_from_url(image_url)
# Encode each image
encoded_images = [encode_image_from_url(url) for url in urls]

# Calculate the similarity with the first image
similarities = calculate_similarity(image_to_compare, encoded_images)

# Sort by similarity and get the top 3
similarities.sort(key=lambda x: x[0], reverse=True)
top_3 = similarities[0:4]  # Exclude the first one (it's the same image)

for sim, url in top_3:
    print(f"Similarity: {sim}, URL: {url}")

