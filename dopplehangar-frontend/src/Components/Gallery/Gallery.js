import React, { useState } from "react";
import Navbar from "../Navbar/navbar";
import "./Gallery.css";

const Gallery = () => {
  const [imageUrls, setImageUrls] = useState([]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "image/jpeg") {
      const url = URL.createObjectURL(file);
      setImageUrls([...imageUrls, url]);
    } else {
      alert("Please upload a JPG image.");
    }
  };

  return (
    <div className="gallery-page">
      <Navbar />
      <div className="image-container">
        <form className="image-form">
          <input
            type="file"
            id="fileInput"
            accept="image/jpeg"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
          <label htmlFor="fileInput" className="upload-label">
            <div className="upload-symbol-placeholder">+</div>
            <p>Add an Image to the Gallery</p>
          </label>
        </form>
      </div>

      <div className="gallery-section">
        {imageUrls.length > 0 ? (
          imageUrls.map((url, index) => (
            <img key={index} src={url} alt={`Uploaded ${index}`} className="gallery-image" />
          ))
        ) : (
          <p>No images uploaded yet.</p>
        )}
      </div>
    </div>
  );
};

export default Gallery;
