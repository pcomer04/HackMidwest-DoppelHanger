import React from "react";
import Navbar from "../Navbar/navbar";
import "./home.css";

const Home = () => {

  return (
    <div>
      <Navbar />
      <div className="parent">
        <div className="intro">
          <div className="explaination">
            <div className="upload-link">
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
