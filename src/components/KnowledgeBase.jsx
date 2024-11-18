import React from "react";

const KnowledgeBase = () => {
  const caseStudies = [
    {
      title: "Cloud & Colocation Data Center Development",
      text: "A reputed and established Telecom Services & Systems Integrator with global presence. Having presence in key geographies like Mid East, Singapore, India, Africa and Europe.",
    },
    {
      title: "Smart City/Townships",
      text: "A large Real Estate developer of India with major focus on IT Parks, Commercial real estate & ResidentialData Security and Data Monetization. Using Data for creating better avenues for efficient Citizen services smart governance.Africa and Europe",
    },
    {
      title: "Data Analytics",
      text: "A mid-east country envisions a Data Enabled Smart Nation with focus on Data Consolidation, Data Security and Data Monetization. Using Data for creating better avenues for efficient Citizen services, smart governance and securing data.",
    },
    {
      title: "Digital Strategy & Vision Development",
      text: "A Saudi Arabian Financial company with focus on Real Estate Lending, Corporate Loans and Personal Finance.Data Security and Data Monetization. Using Data for creating better avenues for efficient Citizen services",
    },
  ];

  return (
    <div className="knowledge-base">
      <h2 className="text-center my-4">Knowledge Base</h2>
      <h3 className="text-center mb-4">Our Case Studies</h3>
      <div className="container">
        <div className="row">
          {caseStudies.map((study, index) => (
            <div className="col-md-3 d-flex align-items-stretch" key={index}>
              <div className="card case-study-card">
                <div className="card-body">
                  <h5 className="card-title">{study.title}</h5>
                  <p className="card-text">{study.text}</p>
                  <button className="btn btn-outline-secondary">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBase;
