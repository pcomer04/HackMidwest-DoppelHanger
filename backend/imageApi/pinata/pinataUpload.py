import requests
from dotenv import load_dotenv
import os

load_dotenv()

api_key = os.getenv('API-KEY')
secret_key = os.getenv('API-SECRET')
PINATA_URL = "https://api.pinata.cloud/pinning/pinFileToIPFS"

def uploadToPinata(image_file):
    headers = {
        "pinata_api_key": str(api_key),
        "pinata_secret_api_key": str(secret_key)  
    }
    files = {'file': image_file}
    response = requests.post(PINATA_URL, files=files, headers=headers)

    if response.status_code == 200:
        response_data = response.json()
        ipfs_hash = response_data['IpfsHash']
        return ipfs_hash
    else:
        raise Exception(f"Error uploading to Pinata: {response.text}")
