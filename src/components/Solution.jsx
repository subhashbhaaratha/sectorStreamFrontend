import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import industryImage from "../assets/industryImg.png";
import { Container } from "react-bootstrap";
import addImage from "../assets/round-add-button.png";
import CustomCard from "./CustomCard";
import CustomModal from "./CustomModal";
import RealEstate from "../assets/realEstate.jpg";
import HealthCare from "../assets/healthcare.jpg";
import { CURRENT_API } from "../utils/utils";
import NoRecordFound from "./NoRecordFound";

const Solution = () => {
  console.log("solution components is working");
  const { id1, id2 } = useParams();
  const [solutions, setSolutions] = useState([]);
  const location = useLocation();
  const [openModal, setOpenModal] = useState(false);
  const [newSolution, setNewSolution] = useState({
    title: "",
    file: "",
  });
  const industryId = id2;
  const title = id1;
  const _id = location?.state?.value;

  const searchTerm = useSelector((state) => state.search.searchTerm);

  useEffect(() => {
    getSolutions();
  }, [industryId, title]);

  const getSolutions = async () => {
    const response = await axios.get(
      `${CURRENT_API}/api/industries/industry/${industryId}`
    );
    console.log("response from soultion", response);
    setSolutions(response.data.data.solutions);
  };

  const addSolution = async () => {
    try {
      const formData = new FormData();
      formData.append("name", newSolution.title);
      formData.append("industryId", industryId); // Add industryId to formData

      if (newSolution.file) {
        formData.append("image", newSolution.file);
      }

      const response = await axios.post(
        "${CURRENT_API}/api/solutions/addSolution",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200) {
        setOpenModal(false);
        getSolutions();
        setNewSolution({
          title: "",
          file: null,
        });
      }
    } catch (error) {
      console.error("Error adding solution:", error);
    }
  };

  const filteredSolutions = solutions.filter((solution) =>
    solution.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="home">
        <div className="industry-header">
          <div className="industry-overlay">
            <p className="industry-text">{title.replace("%", "")} Solutions</p>
          </div>
        </div>
        {title.replace("%", "") === "Real Estate" ? (
          <img src={RealEstate} className="solution-img" />
        ) : title.replace("%", "") === "Health Care" ? (
          <img src={HealthCare} className="solution-img" />
        ) : (
          <></>
        )}
      </div>
      <div className="our-industries">
        <Container className="industries-container">
          <h1>Solutions</h1>
          {filteredSolutions.length === 0 ? (
            <NoRecordFound />
          ) : (
            <div className="industries-cards">
              {filteredSolutions.map((solution) => (
                <Link
                  to={{
                    pathname: `/solutionPackage/${solution.name}/${industryId}/${solution._id}`,
                    state: { value: solution.name },
                  }}
                  className="industries-link"
                >
                  <CustomCard
                    cardName={solution.name}
                    cardImage={solution.image}
                    solutionNumber={solution.solutionPackage.length}
                    solutionName={Object.keys(solution)[3]}
                  />
                </Link>
              ))}
            </div>
          )}
        </Container>
      </div>
    </div>
  );
};

export default Solution;
