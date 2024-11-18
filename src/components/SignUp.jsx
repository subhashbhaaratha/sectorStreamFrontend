import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { CURRENT_API } from "../utils/utils";
import signupPic from "../assets/signup-pic.jpg";

const SignupPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [error, setError] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        `${CURRENT_API}/api/${role === "admin" ? "auth" : role}/signup`,
        {
          email,
          phoneNumber,
          password,
        }
      );
      console.log(`Response from ${role} signup:`, response.data);
      navigate("/login", { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred during signup."
      );
    }
  };

  return (
    <div className="signup-page-wrapper">
      <div className="signup-image-section">
        <img src={signupPic} className="signup-image" alt="Sign Up" />
      </div>
      <div className="signup-form-section">
        <div className="signup-form-card">
          <div className="signup-role-buttons">
            <button
              className={`signup-role-btn ${role === "admin" ? "active" : ""}`}
              onClick={() => setRole("admin")}
            >
              Admin
            </button>
            <button
              className={`signup-role-btn ${role === "seller" ? "active" : ""}`}
              onClick={() => setRole("seller")}
            >
              Provider
            </button>
            <button
              className={`signup-role-btn ${role === "user" ? "active" : ""}`}
              onClick={() => setRole("user")}
            >
              User
            </button>
          </div>
          <h2 className="signup-form-title">Sign Up</h2>
          {error && (
            <div className="signup-alert signup-alert-danger">{error}</div>
          )}
          <form onSubmit={handleSubmit} className="signup-form">
            <div className="signup-form-group">
              <label htmlFor="email" className="signup-form-label">
                Email*
              </label>
              <input
                id="email"
                type="email"
                className="signup-form-input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="signup-form-group">
              <label htmlFor="phoneNumber" className="signup-form-label">
                Phone Number
              </label>
              <input
                id="phoneNumber"
                type="tel"
                className="signup-form-input"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="signup-form-group">
              <label htmlFor="password" className="signup-form-label">
                Password*
              </label>
              <input
                id="password"
                type="password"
                className="signup-form-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="signup-form-group">
              <label htmlFor="confirmPassword" className="signup-form-label">
                Confirm Password*
              </label>
              <input
                id="confirmPassword"
                type="password"
                className="signup-form-input"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="signup-form-checkbox">
              <input
                type="checkbox"
                id="termsCheck"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                required
              />
              <label
                htmlFor="termsCheck"
                className="signup-form-checkbox-label"
              >
                I hereby provide my consent to SectorStream INC to gather, store
                and use my Email ID for business purposes only. By creating an
                account, I agree to the Terms of Service and Privacy Policy. I
                may unsubscribe at any time. In order to register an account, I
                understand that I am required to adhere to the Terms and
                Conditions and Privacy Policy.
              </label>
            </div>
            <button
              type="submit"
              className="signup-submit-button"
              disabled={!termsAccepted}
            >
              Sign Up
            </button>
          </form>
          <div className="signup-link-container">
            <Link to="/login" className="signup-login-link">
              Already have an account? Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
