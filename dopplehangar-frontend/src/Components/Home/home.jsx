import React from "react";
import Navbar from "../Navbar/navbar";
import "./home.css";

const Home = () => {
  return (
    <div>
    <Navbar />
    <div className="home-container">
      <section className="intro-section">
        <h1 className="intro-section__title">Find a New You</h1>
      </section>
      <section className="explanation-section">
        <div className="box-container">
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
        </div>
      </section>
      <section className="upload-section">
        <p className="upload-section__text">Upload your photo now:</p>
      </section>
    </div>
    </div>
  );
};

export default Home;
