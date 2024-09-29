# image_filemake.py

import os
import torch
import clip
import pickle
from PIL import Image

device = "cuda" if torch.cuda.is_available() else "cpu"
model, preprocess = clip.load("ViT-B/32", device=device)

dataset_folder = './dataset/'

with open('encoded_images.pkl', 'wb') as f:
    for root, dirs, files in os.walk(dataset_folder):
        for file in files:
            if file.endswith(('jpg', 'jpeg')):
                image_path = os.path.join(root, file)
                image = Image.open(image_path)
                preprocessed_image = preprocess(image).unsqueeze(0).to(device)
                encoded_image = model.encode_image(preprocessed_image)
                # Save the image path and the encoded image to the file
                pickle.dump((image_path, encoded_image), f)

print("Preprocessing and encoding completed.")


