# url_to_jpg.py

import os
import pandas as pd
import requests
from PIL import Image
from io import BytesIO

# Read the CSV file and get the URLs
df = pd.read_csv('OUT.csv')
urls = df.iloc[:, 18].tolist()[:5000]  # Now reading from column 19 and only taking the first 5000 URLs

# Create the dataset directory if it doesn't exist
if not os.path.exists('dataset'):
    os.makedirs('dataset')

count = 0
# Download and save each image
for i, url in enumerate(urls):
    count += 1
    print(count)
    try:
        response = requests.get(url)
        img = Image.open(BytesIO(response.content))
        img.save(f'dataset/image_{i}.jpg')
    except Exception as e:
        print(f"Error processing {url}: {e}")