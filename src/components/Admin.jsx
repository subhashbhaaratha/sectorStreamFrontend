import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "./Header";
import industryImage from "../assets/industryImg.png";
import { CURRENT_API } from "../utils/utils";
import { useSelector } from "react-redux";
import CustomModal from "./CustomModal";
import DeleteModal from "./DeleteModal";
import NoRecordFound from "./NoRecordFound";

const Admin = () => {
  const role = localStorage.getItem("role");
  const searchTerm = useSelector((state) => state.search.searchTerm);
  const [allIndustries, setAllIndustries] = useState([]);
  const [allDataNeedsToApprove, setAllDataNeedsToApprove] = useState([]);
  const [newIndustry, setNewIndustry] = useState({
    title: "",
    file: "",
  });
  const [openModal, setOpenModal] = useState(false);
  const [seletctedIndustryId, setSelectedIndustryId] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  useEffect(() => {
    fetchAllIndustries();
    if (role === "admin") {
      fetchAllDataNeedsToApprove();
    }
  }, [role]);

  const fetchAllIndustries = async () => {
    try {
      const res = await axios.get(
        `${CURRENT_API}/api/industries/getIndustries`
      );
      console.log("res from axios", res);
      setAllIndustries(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAllDataNeedsToApprove = async () => {
    try {
      const res = await axios.get(
        `${CURRENT_API}/api/seller/sellerSolutionPackages`
      );
      console.log("res from axios", res);
      setAllDataNeedsToApprove(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleApprove = async (packageId) => {
    try {
      const packageToApprove = allDataNeedsToApprove.find(
        (item) => item._id === packageId
      );
      if (!packageToApprove) {
        return;
      }

      const approvedData = {
        id: packageToApprove._id,
        name: packageToApprove.name,
        image: packageToApprove.image,
        industryId: packageToApprove.industryId,
        solutionId: packageToApprove.solutionId,
        isApproved: "true",
      };
      const response = await axios.post(
        `${CURRENT_API}/api/seller/approveOrder`,
        approvedData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        // Refresh the data
        fetchAllDataNeedsToApprove();
      }
    } catch (error) {
      console.error("Error approving solution package:", error);
    }
  };

  // Filter industries based on search term
  const filteredIndustries = allIndustries.filter((industry) =>
    industry.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addIndustry = async () => {
    const formData = new FormData();
    console.log("adding new industry file", newIndustry.file);
    formData.append("name", newIndustry.title);
    if (newIndustry.file) {
      formData.append("image", newIndustry.file);
    }

    try {
      const res = await axios.post(
        `${CURRENT_API}/api/industries/addIndustry`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("res from axios", res);
      if (res.status === 200) {
        setOpenModal(false);
        fetchAllIndustries();
        setNewIndustry({
          title: "",
          file: null,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteIndustry = async () => {
    console.log("delete industry");
    try {
      const response = await axios.delete(
        `${CURRENT_API}/api/industries/industry/${seletctedIndustryId}`
      );
      console.log("response from delete solution", response);
      fetchAllIndustries();
      setDeleteModal(false);
      setSelectedSolution(null);
    } catch (error) {
      console.error("Error deleting solution:", error);
    }
  };

  const handleDeleteButtonClick = (solutionId) => {
    setSelectedIndustryId(solutionId);
    setDeleteModal(true);
    console.log("inside delete");
  };

  const handleCloseModal = () => {
    setDeleteModal(false);
    setSelectedIndustryId("");
  };

  return (
    <>
      <div className="admin-container">
        <div className="industry-header">
          <div className="industry-overlay">
            <p className="industry-text"> Industries</p>
          </div>
        </div>
        {role === "admin" && (
          <div className="category-button-container">
            <button className="add-category" onClick={() => setOpenModal(true)}>
              Add Category
            </button>
          </div>
        )}
        <table className="custom-table">
          <thead>
            <tr>
              <th className="table-header">Industries</th>
              <th className="table-header">Image</th>
              {role === "admin" && <th className="table-header">Action</th>}
            </tr>
          </thead>
          <tbody>
            {filteredIndustries.length > 0 ? (
              filteredIndustries.map((industry) => (
                <tr key={industry._id}>
                  <td>
                    <Link
                      to={{
                        pathname: `/adminsolution/${industry.name}/${industry._id}`,
                        state: { value: industry.name },
                      }}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      {industry.name}
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={{
                        pathname: `/adminsolution/${industry.name}/${industry._id}`,
                        state: { value: industry.name },
                      }}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <img
                        src={`${CURRENT_API}${industry.image}`}
                        alt={industry.name}
                        className="solution-image"
                      />
                    </Link>
                  </td>
                  {role === "admin" && (
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => handleDeleteButtonClick(industry._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <>
                <td colSpan="2" className="text-center">
                  <NoRecordFound />
                </td>
              </>
            )}
          </tbody>
        </table>
        <DeleteModal
          onConfirm={handleDeleteIndustry}
          show={deleteModal}
          onHide={handleCloseModal}
        />
        <CustomModal
          onSubmit={addIndustry}
          title={"Add Industry"}
          isOpen={openModal}
          currentValue={newIndustry}
          setNewValue={(value) => setNewIndustry(value)}
          onClose={() => {
            setOpenModal(false);
            setNewIndustry({
              title: "",
              file: "",
            });
          }}
        />
      </div>
    </>
  );
};

export default Admin;
