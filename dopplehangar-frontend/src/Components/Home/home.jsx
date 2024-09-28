import React, { useState } from "react";
import { imageUpload } from "../../API/image-api";
import Navbar  from "../Navbar/navbar";
import "./home.css";

const Home = () => {
  const [image, setImage] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "image/jpeg") {
      setImage(file);
    } else {
      alert("Please upload a JPG file.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!image) {
      alert("No file selected.");
      return;
    }

    try {
      const data = await imageUpload(image);
      console.log("Success:", data);
      alert("File uploaded successfully!");
      setImage(null); // Reset the file input
    } catch (error) {
      console.error("Error:", error);
      alert("File upload failed.");
    }
  };

  return (
    <div className="homepage">
    <Navbar />
    <div className="image-container">
      <form onSubmit={handleSubmit} className="image-form">
        <div className="input-group">
          <label htmlFor="fileInput">Upload JPG Image:</label>
          <input
            type="file"
            id="fileInput"
            accept="image/jpeg"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">Upload</button>
      </form>
    </div>
    </div>
  );
};

export default Home;
