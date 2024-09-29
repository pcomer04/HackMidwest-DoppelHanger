import React from "react";
import Navbar from "../Navbar/navbar";
import "./home.css";
import hanger from "../../Assets/hero-image.svg";
import step1 from "../../Assets/step-1.svg";
import step2 from "../../Assets/step-2.svg";
import step3 from "../../Assets/step-3.svg";
import upload from "../../Assets/upload-symbol-1.svg";
import {useNavigate} from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/upload");
  }
  return (
    <div>
      <Navbar />
      <div className="home-container">
        <section className="intro-section">
          <h1 className="intro-section-title">One Pic. Three Looks.</h1>
          <h1 className="intro-section-subheading"> Endless Style.</h1>
          <img
            src={hanger}
            alt="hanger blow up"
            className="intro-section-image"
          />
        <button className="intro-section-button" onClick={handleClick}>Get Started</button>
        </section>
        <section className="explanation-section">
          <h1 className="explanation-section-title">How it Works?</h1>
          <div className="box-container">
            <div className="box">
              <img src={step1} alt="" />
              <p className="box-caption-title">Capture Your Outfit</p>
              <p className="box-caption">Take a quick photo of your outfit or favorite look.</p>
            </div>
            <div className="box">
              <img src={step2} alt="" />
              <p className="box-caption-title">Upload Your Image</p>
              <p className="box-caption">Upload your picture to start the style-matching process.</p>
            </div>
            <div className="box">
              <img src={step3} alt="" />
              <p className="box-caption-title">Get 3 Style Matches</p>
              <p className="box-caption">Receive three curated outfit recommendations just for you.</p>
            </div>
          </div>
        </section>
        <section className="upload-section">
          <p className="upload-section-text">Upload your photo now:</p>
          <a href="/upload"><img src={upload} alt="upload-symbol" className="upload-section-image" /></a>
        </section>
      </div>
    </div>
  );
};

export default Home;
