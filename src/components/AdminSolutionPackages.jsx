import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import CustomModal from "./CustomModal";
import DeleteModal from "./DeleteModal";
import industryImage from "../assets/industryImg.png";
import { CURRENT_API } from "../utils/utils";
import { useSelector } from "react-redux";
import NoRecordFound from "./NoRecordFound";

const AdminSolutionPackages = () => {
  const role = localStorage.getItem("role");
  const { id1, id2, id3 } = useParams();
  const location = useLocation();
  const [solutionPackages, setSolutionPackages] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [newSolutionPackage, setNewSolutionPackage] = useState({
    title: "",
    file: "",
    description: "",
    company: "",
    link: "",
  });
  const [selectedSolutionPackage, setSelectedSolutionPackage] = useState(null);
  const title = id1;
  const industryId = id2;
  const solutionId = id3;
  const _id = location?.state?.value;

  // Get the search term from Redux store
  const searchTerm = useSelector((state) => state.search.searchTerm);

  useEffect(() => {
    getSolutionPackages();
  }, []);

  const getSolutionPackages = async () => {
    try {
      const response = await axios.get(
        `${CURRENT_API}/api/solutionPackages/${industryId}/solution/${solutionId}`
      );
      setSolutionPackages(response.data.data);
    } catch (error) {
      console.error("Error fetching solution packages:", error);
    }
  };

  const addSolutionPackage = async () => {
    try {
      const formData = new FormData();
      formData.append("name", newSolutionPackage.title);
      formData.append("industryId", industryId);
      formData.append("solutionId", solutionId);
      if (newSolutionPackage.file) {
        formData.append("image", newSolutionPackage.file);
      }

      const response =
        role === "seller"
          ? await axios.post(
              CURRENT_API + "/api/seller/sellerSolutionPackages",
              {
                name: newSolutionPackage.title,
                industryId: industryId,
                solutionId: solutionId,
                link: newSolutionPackage.link,
                companyName: newSolutionPackage.company,
                description: newSolutionPackage.description,
              },
              {
                headers: { "Content-Type": "application/json" },
              }
            )
          : await axios.post(
              CURRENT_API + "/api/solutionPackages/addSolutionPackage",
              formData,
              {
                headers: { "Content-Type": "multipart/form-data" },
              }
            );

      if (response.status === (role === "seller" ? 201 : 200)) {
        setOpenModal(false);
        getSolutionPackages();
        setNewSolutionPackage({
          title: "",
          file: null,
        });
      }
    } catch (error) {
      console.error("Error adding solution package:", error);
    }
  };

  const handleDeleteButtonClick = (solutionId) => {
    setSelectedSolutionPackage(solutionId);
    setDeleteModal(true);
  };

  const handleDeleteSolution = async () => {
    try {
      const response = await axios.delete(
        `${CURRENT_API}/api/solutionPackages/deleteSolutionPackage`,
        {
          data: {
            industryId: industryId,
            solutionId: solutionId,
            packageId: selectedSolutionPackage,
          },
        }
      );
      if (response.status === 200) {
        getSolutionPackages();
        setDeleteModal(false);
        setSelectedSolutionPackage(null);
      }
    } catch (error) {
      console.error("Error deleting solution:", error);
    }
  };

  const handleCloseModal = () => {
    setDeleteModal(false);
    setSelectedSolutionPackage(null);
  };

  // Filter solution packages based on search term

  const filteredPackages = solutionPackages.filter((solution) =>
    solution.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log("solution packages", solutionPackages);
  return (
    <div>
      <div className="home">
        <div className="industry-header">
          <div className="industry-overlay">
            <p className="industry-text">
              {title.replace("%", "")} Solution packages
            </p>
          </div>
        </div>
        {title.replace("%", "") === "Real Estate" ? (
          <img
            src={RealEstate}
            style={{ width: "70rem", height: "400px", objectFit: "cover" }}
          />
        ) : title.replace("%", "") === "Health Care" ? (
          <img
            src={HealthCare}
            style={{ width: "70rem", height: "400px", objectFit: "cover" }}
          />
        ) : (
          <></>
        )}
      </div>
      <div className="our-industries">
        <div className="admin-container">
          <h1 className="text-center mb-4">Solutions Packages</h1>
          <div className="d-flex justify-content-center mb-3">
            <button
              style={{
                border: "none",
                background: "transparent",
                backgroundColor: "black",
                color: "white",
                padding: "15px",
                borderRadius: "10px",
              }}
              onClick={() => setOpenModal(true)}
            >
              Add Category
            </button>
          </div>
          {filteredPackages.length === 0 ? (
            <NoRecordFound /> // Show NoRecordFound component when no records are present
          ) : (
            <Table className="custom-table">
              <thead>
                <tr>
                  <th className="table-header">Name</th>
                  <th className="table-header">Image</th>
                  {role !== "seller" && (
                    <th className="table-header">Action</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {filteredPackages.map((solution) => (
                  <tr key={solution._id}>
                    <td>{solution.name}</td>
                    <td>
                      <img
                        src={`${CURRENT_API}${solution.image}`}
                        alt={solution.name}
                        className="solution-image"
                      />
                    </td>
                    {role !== "seller" && (
                      <td>
                        <Button
                          variant="danger"
                          onClick={() => handleDeleteButtonClick(solution._id)}
                        >
                          Delete
                        </Button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
        <CustomModal
          onSubmit={addSolutionPackage}
          isSellerModal={role === "seller"}
          isOpen={openModal}
          currentValue={newSolutionPackage}
          setNewValue={(value) => setNewSolutionPackage(value)}
          onClose={() => {
            setOpenModal(false);
            setNewSolutionPackage({
              title: "",
              file: null,
              description: "",
              company: "",
              link: "",
            });
          }}
        />
      </div>

      <DeleteModal
        onConfirm={handleDeleteSolution}
        onHide={handleCloseModal}
        show={deleteModal}
      />
    </div>
  );
};

export default AdminSolutionPackages;
