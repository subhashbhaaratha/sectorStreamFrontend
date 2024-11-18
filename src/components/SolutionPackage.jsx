import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Modal, Button } from "react-bootstrap";
import SmartHome from "../assets/smartHome.jpg";
import { CURRENT_API } from "../utils/utils";
import CustomCard from "./CustomCard";
import NoRecordFound from "./NoRecordFound";

const SolutionPackage = () => {
  const { id1, id2, id3 } = useParams();
  const [solutionPackages, setSolutionPackages] = useState([]);
  const location = useLocation();
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const searchTerm = useSelector((state) => state.search.searchTerm);

  useEffect(() => {
    getSolutionPackages();
  }, [id1, id2, id3]);

  const getSolutionPackages = async () => {
    try {
      const response = await axios.get(
        `${CURRENT_API}/api/solutionPackages/${id2}/solution/${id3}`
      );
      setSolutionPackages(response.data.data);
    } catch (error) {
      console.error("Error fetching solution packages:", error);
    }
  };

  const handleCardClick = async (sellerProductId) => {
    try {
      const response = await axios.get(
        `${CURRENT_API}/api/seller/sellerSolutionPackagesById/${sellerProductId}`
      );
      setModalContent(response.data.data);
      setOpenModal(true);
    } catch (error) {
      console.error("Error fetching seller information:", error);
    }
  };

  const filteredSolutionPackages = solutionPackages.filter((solutionPackage) =>
    solutionPackage.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="home">
        <div className="industry-header">
          <div className="industry-overlay">
            <p className="industry-text">
              {id1.replace("%", "")} Solution Packages
            </p>
          </div>
        </div>
        {id1.replace("%", "") === "Smart Home" && (
          <img src={SmartHome} className="solution-img" alt="Smart Home" />
        )}
      </div>
      <div className="our-industries">
        <Container className="industries-container">
          <div className="industries-cards">
            {filteredSolutionPackages.length === 0 ? (
              <NoRecordFound />
            ) : (
              filteredSolutionPackages.map((solutionPackage) => (
                <CustomCard
                  key={solutionPackage._id}
                  cardName={solutionPackage.name}
                  cardImage={solutionPackage.image}
                  clickable={!!solutionPackage.sellerProductId}
                  onClick={() =>
                    solutionPackage.sellerProductId &&
                    handleCardClick(solutionPackage.sellerProductId)
                  }
                />
              ))
            )}
          </div>
        </Container>
      </div>

      {/* New Modal for displaying seller information */}
      <Modal
        show={openModal}
        onHide={() => setOpenModal(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Seller Information
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Company Name:</strong> {modalContent.companyName}
          </p>
          <p>
            <strong>Description:</strong> {modalContent.description}
          </p>
          <p>
            <strong>Link:</strong>{" "}
            <a
              href={modalContent.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {modalContent.link}
            </a>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setOpenModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SolutionPackage;
