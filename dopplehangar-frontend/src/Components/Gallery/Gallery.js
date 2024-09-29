// src/components/Gallery/Gallery.js

import React, { useState } from 'react';
import Navbar from '../Navbar/navbar'; // Adjusted import path to match folder structure
import './Gallery.css';

const Gallery = () => {
  // Initialize with two rows
  const [imageRows, setImageRows] = useState([{}, {}]);

  const addImageRow = () => {
    setImageRows([...imageRows, {}]);
  };

  const handleImageChange = (e, rowIndex, imgIndex) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const updatedRows = [...imageRows];
        updatedRows[rowIndex] = {
          ...updatedRows[rowIndex],
          [imgIndex]: reader.result,
        };
        setImageRows(updatedRows);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="gallery-container">
      {/* Navbar added without any changes */}
      <Navbar />
      {/* Gallery Section */}
      <div className="explanation-section">
        <div className="box-container">
          {imageRows.map((row, rowIndex) => (
            <div key={rowIndex} className="image-row">
              {[0, 1, 2].map((imgIndex) => (
                <div key={imgIndex} className="image-placeholder">
                  {row[imgIndex] ? (
                    <img
                      src={row[imgIndex]}
                      alt={`Gallery ${rowIndex + 1}-${imgIndex + 1}`}
                      className="uploaded-image"
                    />
                  ) : (
                    <div className="empty-placeholder" />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
