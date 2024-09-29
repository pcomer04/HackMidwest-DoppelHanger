# image_comparer.py

import torch
import clip
import pickle
import itertools
from PIL import Image

device = "cuda" if torch.cuda.is_available() else "cpu"
model, preprocess = clip.load("ViT-B/32", device=device)

def compare_image(input_image_path):
    # Preprocess and encode the input image
    input_image = preprocess(Image.open(input_image_path)).unsqueeze(0).to(device)
    input_image_features = model.encode_image(input_image)

    result = {}
    # Load and compare the encoded images one by one
    with open('encoded_images.pkl', 'rb') as f:
        try:
            while True:
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

