import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { CURRENT_API } from "../utils/utils";
import loginPic from "../assets/signup-pic.jpg"; // Make sure to use the correct image

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    let url = "";
    if (role === "admin") {
      url = `${CURRENT_API}/api/auth/login`;
    } else if (role === "seller") {
      url = `${CURRENT_API}/api/seller/login`;
    } else if (role === "user") {
      url = `${CURRENT_API}/api/user/login`;
    }

    try {
      const response = await axios.post(url, {
        email,
        password,
      });
      localStorage.setItem(
        "token",
        response.data.sellerId ||
          response.data.userId ||
          response.data.data[0]._id
      );
      localStorage.setItem("role", role);
      if (role === "admin" || role === "seller") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred during login."
      );
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-image-section">
        <img src={loginPic} className="login-image" alt="Login" />
      </div>
      <div className="login-form-section">
        <div className="login-form-card">
          <div className="login-role-buttons">
            <button
              className={`login-role-btn ${role === "admin" ? "active" : ""}`}
              onClick={() => setRole("admin")}
            >
              Admin
            </button>
            <button
              className={`login-role-btn ${role === "seller" ? "active" : ""}`}
              onClick={() => setRole("seller")}
            >
              Provider
            </button>
            <button
              className={`login-role-btn ${role === "user" ? "active" : ""}`}
              onClick={() => setRole("user")}
            >
              User
            </button>
          </div>
          <h2 className="login-form-title">Login</h2>
          {error && (
            <div className="login-alert login-alert-danger">{error}</div>
          )}
          <form onSubmit={handleSubmit} className="login-form">
            <div className="login-form-group">
              <label htmlFor="email" className="login-form-label">
                Email*
              </label>
              <input
                id="email"
                type="email"
                className="login-form-input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="login-form-group">
              <label htmlFor="password" className="login-form-label">
                Password*
              </label>
              <input
                id="password"
                type="password"
                className="login-form-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="login-submit-button">
              Login
            </button>
          </form>
          <div className="login-link-container">
            <Link to="/signup" className="login-signup-link">
              Don't have an account? Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
