// InfoCard.js
import React from "react";
import "./InfoCard.css"; // Import the CSS file

const InfoCard = ({ show, onHide, children }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onHide}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default InfoCard;
