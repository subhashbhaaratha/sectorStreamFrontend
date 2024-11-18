import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CURRENT_API } from "../utils/utils";
import supportPic from "../assets/signup-pic.jpg"; // You'll need to add this image

const SupportPage = () => {
  const navigate = useNavigate();
  const [supportContent, setSupportContent] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await axios.post(CURRENT_API + "/api/support/addSupport", supportContent);
      setSuccess("Support request submitted successfully.");
      setSupportContent({
        name: "",
        phone: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      setError(
        err.response ? err.response.data.error : "An unexpected error occurred."
      );
    }
  };

  return (
    <div className="support-page-wrapper">
      <div className="support-image-section">
        <img src={supportPic} className="support-image" alt="Support" />
      </div>
      <div className="support-form-section">
        <div className="support-form-card">
          <h2 className="support-form-title">Support</h2>
          {error && (
            <div className="support-alert support-alert-danger">{error}</div>
          )}
          {success && (
            <div className="support-alert support-alert-success">{success}</div>
          )}
          <form onSubmit={handleSubmit} className="support-form">
            <div className="support-form-group">
              <label htmlFor="name" className="support-form-label">
                Name
              </label>
              <input
                type="text"
                className="support-form-input"
                id="name"
                value={supportContent.name}
                onChange={(e) =>
                  setSupportContent({
                    ...supportContent,
                    name: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="support-form-group">
              <label htmlFor="phone" className="support-form-label">
                Phone
              </label>
              <input
                type="tel"
                className="support-form-input"
                id="phone"
                value={supportContent.phone}
                onChange={(e) =>
                  setSupportContent({
                    ...supportContent,
                    phone: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="support-form-group">
              <label htmlFor="email" className="support-form-label">
                Email address
              </label>
              <input
                type="email"
                className="support-form-input"
                id="email"
                value={supportContent.email}
                onChange={(e) =>
                  setSupportContent({
                    ...supportContent,
                    email: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="support-form-group">
              <label htmlFor="subject" className="support-form-label">
                Subject
              </label>
              <input
                type="text"
                className="support-form-input"
                id="subject"
                value={supportContent.subject}
                onChange={(e) =>
                  setSupportContent({
                    ...supportContent,
                    subject: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="support-form-group">
              <label htmlFor="message" className="support-form-label">
                Message
              </label>
              <textarea
                id="message"
                className="support-form-input support-form-textarea"
                value={supportContent.message}
                onChange={(e) =>
                  setSupportContent({
                    ...supportContent,
                    message: e.target.value,
                  })
                }
                required
              />
            </div>
            <button type="submit" className="support-submit-button">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
