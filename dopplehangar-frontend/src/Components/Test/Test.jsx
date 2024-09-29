import React, { useEffect, useState } from 'react';

const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI1MTVkNzYwNy01NmNjLTQ1YzItYjYzYS1hNDUwZTZmMjE0ODgiLCJlbWFpbCI6InBjb21lcjJAaHVza2Vycy51bmwuZWR1IiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImRmZjNiNmE3ZjM3MTgzN2M0OWZjIiwic2NvcGVkS2V5U2VjcmV0IjoiZDlkNzIzNmE1NzVmY2I5OWVhMzlmZTM3MTYwMWExMzY0M2M3ZGJjN2U2ZTRlNmU3OTEwMjgyNDg0ZGQyNmZlNSIsImV4cCI6MTc1OTEzMDIxMn0.o8irAjoY8huR719_X3QbmME2zk7cyIEiccQF8LAunYE";
const CID = "QmVSFfoqm4e6RK7mHDH3AWuwobFsee2kDPzZWp4evbqRx6";

const Test = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        // First, we'll check if the file exists and get its details
        const response = await fetch(`https://api.pinata.cloud/data/pinList?status=pinned&hashContains=${CID}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${JWT}`
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Pinata API response:", data);

        if (data.rows.length > 0) {
          // If the file exists, we'll construct the URL using the default Pinata gateway
          const imageUrl = `https://gateway.pinata.cloud/ipfs/${CID}`;
          console.log("Image URL:", imageUrl);
          
          // Let's check if we can access the image
          const imageResponse = await fetch(imageUrl);
          if (!imageResponse.ok) {
            throw new Error(`Failed to fetch image: ${imageResponse.status} ${imageResponse.statusText}`);
          }
          
          setImageUrl(imageUrl);
        } else {
          setError("File not found in Pinata");
        }
      } catch (error) {
        console.error("Error fetching image:", error);
        setError(error.message || "An error occurred while fetching the image");
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>IPFS Image Viewer</h1>
      {loading ? (
        <p>Loading image...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : imageUrl ? (
        <>
          <img src={imageUrl} alt="IPFS Content" style={{ maxWidth: '100%', height: 'auto' }} />
          <p>Image URL: {imageUrl}</p>
        </>
      ) : (
        <p>No image found for the provided CID.</p>
      )}
    </div>
  );
};

export default Test;