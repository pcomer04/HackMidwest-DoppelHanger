import React, { useState } from "react";
import { pinataUpload } from "../../API/image-api";  // Import the Pinata upload function
import Navbar from "../Navbar/navbar";
import "./upload.css";
import uploadSymbol from "../../Assets/upload-symbol-2.svg";

const Upload = () => {
  const [image, setImage] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file && file.type === "image/jpeg") {
      setImage(file);

      try {
        const data = await pinataUpload(file);  // Trigger upload immediately
        console.log("Upload Success");
        console.log("File uploaded to IPFS:", data);  // Optional: log the IPFS data for debugging
      } catch (error) {
        console.error("Error during upload:", error);
        alert("File upload failed.");
      }
    } else {
      alert("Please upload a JPG file.");
    }
  };

  return (
    <div className="upload-page">
      <Navbar />
      <div className="image-container">
        <form className="image-form">
          <input
            type="file"
            id="fileInput"
            accept="image/jpeg"
            onChange={handleFileChange} // Trigger upload on file selection
            style={{ display: "none" }}
          />
          <label htmlFor="fileInput" className="upload-label">
            <img src={uploadSymbol} alt="Upload" className="upload-symbol" />
            <p>Drag Your Photo Here</p>
          </label>
        </form>
      </div>
    </div>
  );
};

export default Upload;
