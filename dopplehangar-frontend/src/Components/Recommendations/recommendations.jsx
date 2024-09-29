import React from "react";
import Navbar from "../Navbar/navbar";
import "./recommendations.css";

const Recommendations = () => {
  return (
    <div>
        <Navbar />
    <div className="recommendations-container">
        <div className="user-photo-container">
            <p> Your Photo</p>
        </div>
        <div className="add-to-gallery">
            <button type="submit" /*todo add on click */>Add to Gallery</button>
        </div>
        <div className="recommended-outfits1">
            <p className="recommendation-display">Recommended Outfit #1</p>
        </div>
        <div className="recommended-outfits2">
        <p className="recommendation-display">Recommended Outfit #2</p>
        </div>
        <div className="recommended-outfits3">
        <p className="recommendation-display">Recommended Outfit #3</p>
        </div>
    </div>
    </div>
  );
};

export default Recommendations;
