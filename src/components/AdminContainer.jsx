import React, { useState } from "react";
import Admin from "./Admin";
import SupportDisplay from "./SupportDisplay";
import SolutionPackagesToApprove from "./SolutionPackagesToApprove";

const AdminContainer = () => {
  const [selected, setSelected] = useState("industries");
  const role = localStorage.getItem("role");

  return (
    <div className="admin-container">
      {role === "admin" && (
        <div className="button-group">
          <button
            className={`button ${selected === "industries" ? "active" : ""}`}
            onClick={() => setSelected("industries")}
          >
            Industries
          </button>
          <button
            className={`button ${selected === "support" ? "active" : ""}`}
            onClick={() => setSelected("support")}
          >
            Support
          </button>
          <button
            className={`button ${selected === "provider" ? "active" : ""}`}
            onClick={() => setSelected("provider")}
          >
            Provider
          </button>
        </div>
      )}
      <div>
        {selected === "industries" && <Admin />}
        {selected === "support" && <SupportDisplay />}
        {selected === "provider" && role === "admin" && (
          <SolutionPackagesToApprove />
        )}
      </div>
    </div>
  );
};

export default AdminContainer;
