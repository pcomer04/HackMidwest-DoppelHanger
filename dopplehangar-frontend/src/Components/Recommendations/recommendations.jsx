import React, { useEffect, useState } from "react"; // Import useEffect and useState
import Navbar from "../Navbar/navbar";
import "./recommendations.css";
import { getImagePinata } from "../../API/image-api-get-pinata"; // Ensure this is the correct import
import { getImageDatabase } from "../../API/image-api-get-database"; // Ensure this is the correct import

const Recommendations = () => {
    const [imageUrls, setImageUrls] = useState([]); // Changed to use an array for multiple images
    const [imageData, setImageData] = useState({ uploaded_image: '', returned_image: [] }); // State for image data

    useEffect(() => {
        const fetchImageData = async () => {
            try {
                const data = await getImageDatabase(); // Fetch image data asynchronously
                console.log(data);
                setImageData(data); // Set the fetched data to state
            } catch (error) {
                console.error("Error fetching image data:", error);
            }
        };
        fetchImageData();
    }, []); // Run once on component mount

    useEffect(() => {
        const fetchImages = async () => {
            const urls = [];

            // Fetch the original uploaded image
            if (imageData.uploaded_image) {
                try {
                    const originalBlob = await getImagePinata(imageData.uploaded_image); // Fetch image from Pinata
                    const originalUrl = URL.createObjectURL(originalBlob); // Create a URL for the blob
                    urls.push(originalUrl);
                } catch (error) {
                    console.error('Error fetching original image:', error);
                }
            }

            // Fetch returned images
            for (const cid of imageData.returned_image) {
                try {
                    const blob = await getImagePinata(cid); // Fetch image by CID
                    const url = URL.createObjectURL(blob); // Create a URL for the blob
                    urls.push(url);
                } catch (error) {
                    console.error(`Error fetching image with CID ${cid}:`, error);
                }
            }

            setImageUrls(urls); // Set the fetched URLs to state
        };

        if (imageData.returned_image.length > 0 || imageData.uploaded_image) { // Check if there's anything to fetch
            fetchImages();
        }
        console.log(imageUrls);
        // Clean up URL objects on component unmount
        return () => {
            imageUrls.forEach(url => URL.revokeObjectURL(url));
        };
    }, [imageData]); // Dependency on imageData

    return (
        <div>
            <Navbar />
            <div className="recommendations-container">
                <div className="user-photo-container">
                    <p>Your Photo</p>
                    {imageUrls[0] && <img src={imageUrls[0]} alt="Uploaded" />}
                </div>
                <div className="add-to-gallery">
                    <button type="button" /* Add onClick handler here */>Add to Gallery</button>
                </div>
                {imageUrls.slice(1).map((url, index) => ( 
                    <div key={index} className={`recommended-outfits${index + 1}`}>
                        <img src={url} alt={`Recommended Outfit #${index + 1}`} />
                        <p className="recommendation-display-text">Recommended Outfit #{index + 1}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Recommendations;
