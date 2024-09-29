import torch
import clip
from PIL import Image
import os
import itertools
import torch.nn as nn

device = "cuda" if torch.cuda.is_available() else "cpu"
model, preprocess = clip.load("ViT-B/32", device=device)

print(device)

dataset_folder = './dataset/'


def compare_image(input_image_path):
    # Load and preprocess the input image
    input_image = preprocess(Image.open(input_image_path)).unsqueeze(0).to(device)
    input_image_features = model.encode_image(input_image)

    images = []
    for root, dirs, files in os.walk(dataset_folder):
        for file in files:
            if file.endswith(('jpg', 'jpeg')):
                images.append(root + '/' + file)

    result = {}
    for img in images:
        with torch.no_grad():
            image_preprocess = preprocess(Image.open(img)).unsqueeze(0).to(device)
            image_features = model.encode_image(image_preprocess)
            cos = torch.nn.CosineSimilarity(dim=0)
            sim = cos(image_features[0], input_image_features[0]).item()
            sim = (sim + 1) / 2
            result[img] = sim

    sorted_value = sorted(result.items(), key=lambda x: x[1], reverse=True)
    sorted_res = dict(sorted_value)

    top_3 = dict(itertools.islice(sorted_res.items(), 3))

    return top_3
