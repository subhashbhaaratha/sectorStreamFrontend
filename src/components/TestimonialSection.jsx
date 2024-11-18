import React from "react";
import image from "../assets/hand-shake.png";
const TestimonialSection = ({ imageUrl, title, description }) => {
  return (
    <div className="testimonial-section">
      <img src={imageUrl} alt="akjdf" style={{ width: 90 }} />
      <h4>{title}</h4>
      <p style={{ textAlign: "center" }}>{description}</p>
    </div>
  );
};

export default TestimonialSection;
