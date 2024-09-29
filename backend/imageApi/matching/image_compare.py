# image_compare.py

import torch
import clip
import pickle
import itertools
from PIL import Image
import os

device = "cuda" if torch.cuda.is_available() else "cpu"
model, preprocess = clip.load("ViT-B/32", device=device)
from django.conf import settings




def compare_image(input_image_path):
    # Preprocess and encode the input image
    pkl_file_path = os.path.join(settings.BASE_DIR, 'imageApi', 'matching', 'encoded_images.pkl')

    input_image = preprocess(Image.open(input_image_path)).unsqueeze(0).to(device)
    input_image_features = model.encode_image(input_image)
    result = {}
    count = 0

    # Load and compare the encoded images one by one
    if not os.path.exists(pkl_file_path):
        raise FileNotFoundError(f"Pickle file not found at {pkl_file_path}")

    with open(pkl_file_path, 'rb') as f:
        try:
            while count < 500:
                count += 1
                print(count)
                img_path, encoded_image = pickle.load(f)
                cos = torch.nn.CosineSimilarity(dim=0)
                sim = cos(encoded_image[0], input_image_features[0]).item()
                sim = (sim + 1) / 2  # Normalize the similarity to [0, 1]
                result[img_path] = sim
        except EOFError:
            pass

    # Sort the results by similarity
    sorted_results = sorted(result.items(), key=lambda x: x[1], reverse=True)

    # Get the top 3 results
    top_3 = dict(itertools.islice(sorted_results, 3))

    return top_3

