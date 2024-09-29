// src/API/image-api.js
import axios from "axios";

const PINATA_API_KEY = 'your_pinata_api_key';  // Replace with your Pinata API Key
const PINATA_SECRET_API_KEY = 'your_pinata_secret_api_key';  // Replace with your Pinata Secret API Key

// src/API/image-api.js

export const pinataUpload = async (imageFile) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          IpfsHash: "QmTestHash1234567890", // Mock IPFS hash
          PinSize: 12345,
          Timestamp: new Date().toISOString(),
        });
      }, 1000); // Simulate a 1-second network delay
    });
};
  
