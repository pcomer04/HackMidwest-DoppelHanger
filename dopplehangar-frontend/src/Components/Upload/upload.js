import React, { useState } from "react";
import { imageUpload } from "../../API/image-api";
import Navbar from "../Navbar/navbar";
import "./upload.css";
import uploadSymbol from "../../Assets/upload-symbol-2.svg";
import spinny from "../../Assets/loading-screen.gif"; 
import { useNavigate } from "react-router-dom";

const Upload = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file && file.type === "image/jpeg") {
      setImage(file);
    } else {
      alert("Please upload a JPG file.");
    }

    try {
      const data = await imageUpload(image);
      console.log("Success:", data);
      alert("File uploaded successfully!");
      setImage(null);
    } catch (error) {
      console.error("Error:", error);
      alert("File upload failed.");
    }

  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!image) {
      alert("No file selected.");
      return;
    }

    setLoading(true);

    try {
      const data = await imageUpload(image);
      console.log("Success:", data);
      alert("File uploaded successfully!");
      setImage(null);
      navigate("/recommendations")
    } catch (error) {
      console.error("Error:", error);
      alert("File upload failed.");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="upload-page">
      <Navbar />
      <div className="image-container">
        <form onSubmit={handleSubmit} className="image-form">
          <input
            type="file"
            id="fileInput"
            accept="image/jpeg"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <label htmlFor="fileInput" className="upload-label">
            <img src={uploadSymbol} alt="Upload" className="upload-symbol" />
            <p>Drag Your Photo Here</p>
          </label>
        </form>

        {loading && (
          <div className="loading">
            <img src={spinny} alt="Loading..." className="loading-spinner" />
            <p>Uploading...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;
