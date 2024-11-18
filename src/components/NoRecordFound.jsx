import React from "react";

const NoRecordFound = () => {
  return (
    <div className="no-record-found">
      <h2>Search Your Perfect Solution</h2>
      <div className="message-box">
        <h3>Sorry, No Record Found</h3>
        <p>
          There is no record found in our system matching with your search
          query. Please provide us more details about what you are looking for.
          Our team will review it and get back to you with available options.
        </p>
      </div>
    </div>
  );
};

export default NoRecordFound;
