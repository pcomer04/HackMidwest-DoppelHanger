import React, { useEffect, useState } from "react"; 
import Navbar from "../Navbar/navbar"; 
import "./recommendations.css"; 
import { getImageDatabase } from "../../API/image-api-get-database"; 
import ImageDisplay from "../ImageDisplay/imagedisplay"; // Ensure the correct import

const Recommendations = () => {
    const [imageData, setImageData] = useState({
        uploaded_image: null,
        returned_1: null,
        returned_2: null,
        returned_3: null
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchImageData = async () => {
            try {
                console.log("Fetching image data...");
                const data = await getImageDatabase();
                console.log("Fetched data:", data.uploaded_image?.value);

                // Check if data has the expected structure
                if (data && typeof data === 'object') {
                    const {
                        uploaded_image = null,
                        returned_1 = null,
                        returned_2 = null,
                        returned_3 = null
                    } = data;

                    // Log the destructured values to see what they are
                    console.log("Destructured values:", { uploaded_image, returned_1, returned_2, returned_3 });
                    const up_val = uploaded_image.value;
                    const r1_val = returned_1.value;
                    const r2_val = returned_2.value;
                    const r3_val = returned_3.value;
                    // Update state with structured data
                    setImageData({
                        up_val,
                        r1_val,
                        r2_val,
                        r3_val,
                    });
                } else {
                    console.error("Unexpected data structure:", data);
                }
            } catch (error) {
                console.error("Error fetching image data:", error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchImageData();
    }, []);

    // Log the image data after it has been set
    useEffect(() => {
        console.log("Image data updated:", imageData);
    }, [imageData]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error fetching data: {error.message}</p>;
    }

    return (
        <div>
            <Navbar />
            <div className="recommendations-container">
                <div className="user-photo-container">
                    <p>Your Photo</p>
                    {(
                        <ImageDisplay cid={imageData.up_val} />
                    )}
                </div>
                <div className="add-to-gallery">
                    <button type="button">Add to Gallery</button>
                </div>
                <div className="recommended-outfits1">
                    {(
                        <div className="recommended-outfit">
                            <ImageDisplay cid={imageData.r1_val} />
                            <p className="recommendation-display-text">Recommended Outfit 1</p>
                        </div>
                    )}
                    {(
                        <div className="recommended-outfit2">
                            <ImageDisplay cid={imageData.r2_val} />
                            <p className="recommendation-display-text">Recommended Outfit 2</p>
                        </div>
                    )}
                    {(
                        <div className="recommended-outfit3">
                            <ImageDisplay cid={imageData.r3_val} />
                            <p className="recommendation-display-text">Recommended Outfit 3</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Recommendations;
