import React from "react";
import ContactUs from "./ContactUs";

const LetsTalk = () => {
  return (
    <div className="lets-talk-container">
      <div className="lets-talk">
        <p style={{ textAlign: "center" }}>
          Let’s talk about your dream project
        </p>
        <h4 style={{ textAlign: "center" }}>
          End to End "IT" Solutions of Digital World
        </h4>
      </div>
      <div style={{ width: "45%" }}>
        <ContactUs />
      </div>
    </div>
  );
};

export default LetsTalk;
