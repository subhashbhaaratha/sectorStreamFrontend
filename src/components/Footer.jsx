import React, { useEffect, useState } from "react";
import axios from "axios";
import LogoNew from "../assets/logoNew.jpg";
import { CURRENT_API } from "../utils/utils"; // Adjust the path as needed

const Footer = () => {
  const [industries, setIndustries] = useState([]);

  const fetchAllIndustries = async () => {
    try {
      const res = await axios.get(
        CURRENT_API + "/api/industries/getIndustries"
      );
      setIndustries(res.data);
      console.log("response from footer", res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAllIndustries();
  }, []);

  return (
    <div>
      <div className="bottom-container">
        <div className="blue-container">
          <p>Let's talk about your dream project</p>
          <h2>End to End Infrastructure support </h2>
        </div>
      </div>
      <footer className="footer">
        <div className="container">
          <div className="logo-section">
            <img src={LogoNew} alt="Goraddal Logo" className="logo" />
            <h3>
              World's First Digital Solutions For building futuristic townships
            </h3>
            <ul>
              <li>
                Digital Transformation Realized and infrastructure
                transformation: Faster, Economical and Automated.
              </li>
              <li>Enabling High potential ideas for your planned townships</li>
            </ul>
          </div>
          <div className="content-section">
            <div className="industries">
              <h4>Industries</h4>
              <ul>
                {industries?.data?.map((industry) => (
                  <li key={industry._id}>
                    <a href={`/solution/${industry.name}/${industry._id}`}>
                      {industry.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {/* You can keep or remove this part depending on your needs */}
            <div className="industries-right">
              {/* The right side industries can be dynamically added similarly if needed */}
            </div>
            <div className="domains">
              <h4>Domains</h4>
              <ul>
                <a>Artificial Intelligence</a>
                <a>Automation</a>
                <a>Augmentive Reality</a>
                <a>Analytics</a>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
