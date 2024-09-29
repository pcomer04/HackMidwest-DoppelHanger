import requests
from PIL import Image
from io import BytesIO
import torch
import clip
from typing import List, Tuple
import pickle


device = "cuda" if torch.cuda.is_available() else "cpu"
model, preprocess = clip.load("ViT-B/32", device=device)
cos = torch.nn.CosineSimilarity(dim=0)

def encode_image_from_url(img: str) -> torch.Tensor:
    preprocessed_img = preprocess(img).unsqueeze(0).to(device)
    return model.encode_image(preprocessed_img)

def calculate_similarity(image1: torch.Tensor, images: List[torch.Tensor]) -> List[Tuple[float, int]]:
    similarities = []
    for i, image2 in enumerate(images):
        similarity = cos(image1[0], image2[0]).item()
        similarity = (similarity + 1) / 2
        similarities.append((similarity, i))
    return similarities

# Load the encoded images from the .pkl file
with open('../matching/encoded_images.pkl', 'rb') as f:
    encoded_images = pickle.load(f)

def process(image):
    image_to_compare = encode_image_from_url(image)

    # Calculate the similarity with the first image
    similarities = calculate_similarity(image_to_compare, [torch.tensor(img[1]) for img in encoded_images])

    # Sort by similarity and get the top 3
    similarities.sort(key=lambda x: x[0], reverse=True)
    top_3 = similarities[:4]

    for sim, index in top_3:
        print(f"Similarity: {sim}, Index: {index + 2}")