import torch
import clip
from PIL import Image

device = "cuda" if torch.cuda.is_available() else "cpu"
model, preprocess = clip.load("ViT-B/32", device=device)

image1 = "images/pinkshirt1.jpg"
image2 = "images/pinkshirt1.jpg"

cos = torch.nn.CosineSimilarity(dim=0)

image1_preprocess = preprocess(Image.open(image1)).unsqueeze(0).to(device)
image1_features = model.encode_image( image1_preprocess)

image2_preprocess = preprocess(Image.open(image2)).unsqueeze(0).to(device)
image2_features = model.encode_image( image2_preprocess)

similarity = cos(image1_features[0],image2_features[0]).item()
similarity = (similarity+1)/2
print("Image similarity", similarity)