import React, { useState } from "react";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [service, setService] = useState("");
  const [requirements, setRequirements] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", {
      name,
      email,
      contactNumber,
      service,
      requirements,
      termsAccepted,
    });
  };

  return (
    <div className="contact-us-container" id="contactUs">
      <h2 className="contact-us-title">How Can We Help?</h2>
      <p className="contact-us-subtitle">
        Share with us your requirements and we'll be in touch with you shortly.
      </p>
      <form onSubmit={handleSubmit} className="contact-us-form">
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="name">Name*</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="email">Email*</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-control"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="contactNumber">Contact Number*</label>
            <input
              id="contactNumber"
              type="tel"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="service">Select Service*</label>
            <select
              id="service"
              value={service}
              onChange={(e) => setService(e.target.value)}
              required
              className="form-control"
            >
              <option value="">Select Service</option>
              {/* Add options for services here */}
            </select>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="requirements">
            Please describe your requirements*
          </label>
          <textarea
            id="requirements"
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            required
            className="form-control"
            rows="4"
          />
        </div>
        <div className="form-group form-check">
          <label className="form-check-label">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              required
              className="form-check-input"
            />
            I agree to the Terms &amp; Conditions of Business Name.
          </label>
        </div>
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
      <p className="privacy-note">We hate spam, and we respect your privacy.</p>
    </div>
  );
};

export default ContactUs;
