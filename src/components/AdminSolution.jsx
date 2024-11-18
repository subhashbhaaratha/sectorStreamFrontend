import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { Container, Table, Button, Modal } from "react-bootstrap";
import CustomModal from "./CustomModal";
import industryImage from "../assets/industryImg.png";
import { CURRENT_API } from "../utils/utils";
import DeleteModal from "./DeleteModal";
import CustomTable from "./CustomTable";
import { useSelector } from "react-redux"; // Import useSelector

const role = localStorage.getItem("role");

const AdminSolution = () => {
  const { id1, id2 } = useParams();
  const [solutions, setSolutions] = useState([]);
  const location = useLocation();
  const [openModal, setOpenModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [newSolution, setNewSolution] = useState({
    title: "",
    file: "",
  });
  const [selectedSolution, setSelectedSolution] = useState(null);
  const industryId = id2;
  const title = id1;
  const _id = location?.state?.value;

  // Get the search term from Redux store
  const searchTerm = useSelector((state) => state.search.searchTerm);

  useEffect(() => {
    getSolutions();
  }, []);

  const getSolutions = async () => {
    try {
      const response = await axios.get(
        `${CURRENT_API}/api/industries/industry/${industryId}`
      );
      console.log("response from solution", response);
      setSolutions(response.data.data.solutions);
    } catch (error) {
      console.error("Error fetching solutions:", error);
    }
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
        CURRENT_API + "/api/solutions/addSolution",
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

  const handleDeleteButtonClick = (solutionId) => {
    setSelectedSolution(solutionId);
    setDeleteModal(true);
  };

  const handleDeleteSolution = async () => {
    try {
      const response = await axios.delete(
        `${CURRENT_API}/api/solutions/deleteSolution`,
        { data: { industryId: industryId, solutionId: selectedSolution } }
      );
      console.log("response from delete solution", response);
      getSolutions();
      setDeleteModal(false);
      setSelectedSolution(null);
    } catch (error) {
      console.error("Error deleting solution:", error);
    }
  };

  const handleCloseModal = () => {
    setDeleteModal(false);
    setSelectedSolution(null);
  };

  // Filter solutions based on search term
  const filteredSolutions = solutions.filter((solution) =>
    solution?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log("solutions is here ", solutions);
  return (
    <div>
      <div className="home">
        <div className="industry-header">
          <div className="industry-overlay">
            <p className="industry-text">{title.replace("%", "")} Solutions</p>
          </div>
        </div>
      </div>
      <div className="our-industries">
        <div className="admin-container">
          <h1>Solutions</h1>
          {role === "admin" && (
            <div className="category-button-container">
              <button
                className="add-category"
                onClick={() => setOpenModal(true)}
              >
                Add Category
              </button>
            </div>
          )}
          <CustomTable
            solutions={filteredSolutions} // Use filtered solutions here
            handleDeleteButtonClick={(solutionId) =>
              handleDeleteButtonClick(solutionId)
            }
            industryId={industryId}
          />
        </div>
        <CustomModal
          onSubmit={addSolution}
          title={"Add Solution"}
          isOpen={openModal}
          currentValue={newSolution}
          setNewValue={(value) => setNewSolution(value)}
          onClose={() => {
            setOpenModal(false);
            setNewSolution({
              title: "",
              file: "",
            });
          }}
        />
      </div>

      <DeleteModal
        onConfirm={handleDeleteSolution}
        show={deleteModal}
        onHide={handleCloseModal}
      />
    </div>
  );
};

export default AdminSolution;
