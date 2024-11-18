import React from "react";
import { Container } from "react-bootstrap";
import industryImage from "../assets/industryImg.png";
import pic from "../assets/rpa-concept-with-blurry-hand-touching-screen.jpg";
const Home = () => {
  return (
    <div className="home">
      <div className="industry-header">
        <div className="industry-overlay">
          <p className="industry-text">Industries</p>
        </div>
      </div>
      <img src={pic} className="pic-image" />
    </div>
  );
};

export default Home;
