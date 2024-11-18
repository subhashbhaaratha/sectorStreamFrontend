import React, { useEffect, useState } from "react";
import { Table, Button, Form, Alert } from "react-bootstrap";
import axios from "axios";
import EditModal from "./EditModal";
import { CURRENT_API } from "../utils/utils";

const SolutionPackagesToApprove = () => {
  const [allDataNeedsToApprove, setAllDataNeedsToApprove] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [value, setValue] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchAllDataNeedsToApprove();
  }, []);

  const fetchAllDataNeedsToApprove = async () => {
    try {
      const res = await axios.get(
        CURRENT_API + "/api/seller/sellerSolutionPackages"
      );
      console.log("res from axios", res);
      setAllDataNeedsToApprove(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleApproveOrReject = async (packageId, status) => {
    try {
      const packageToApprove = allDataNeedsToApprove.find(
        (item) => item._id === packageId
      );
      if (!packageToApprove) {
        return;
      }

      let approvedData = {};
      if (status === "approve") {
        if (!image) {
          setError("Please choose the icon before approve.");
          setTimeout(() => {
            setError("");
          }, 3000);
          return;
        }
        approvedData = new FormData();
        approvedData.append("id", packageToApprove._id);
        approvedData.append("name", packageToApprove.name);
        approvedData.append("image", image);
        approvedData.append("industryId", packageToApprove.industryId);
        approvedData.append("solutionId", packageToApprove.solutionId);
        approvedData.append("isApproved", "true");
      } else {
        approvedData = {
          id: packageToApprove._id,
          name: packageToApprove.name,
          industryId: packageToApprove.industryId,
          solutionId: packageToApprove.solutionId,
          isRejected: "true",
        };
      }

      const response = await axios.post(
        CURRENT_API + "/api/seller/approveOrder",
        approvedData,
        {
          headers:
            status === "approve"
              ? { "Content-Type": "multipart/form-data" }
              : { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        // Refresh the data
        fetchAllDataNeedsToApprove();
        setMessage("Action performed successfully.");
        setError("");
        setTimeout(() => {
          setMessage("");
        }, 3000);
      }
    } catch (error) {
      console.error("Error approving solution package:", error);
      setMessage("");
      setError("Error performing the action.");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleEdit = (item) => {
    setSelectedId(item._id);

    setIsEditModalOpen(true);
    setValue(item.name);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.put(
        CURRENT_API + "/api/seller/sellerSolutionPackages/updateName",
        {
          id: selectedId,
          name: value,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        setMessage("Name updated successfully.");
        setError("");
        setIsEditModalOpen(false);
        fetchAllDataNeedsToApprove(); // Refresh the data
        setTimeout(() => {
          setMessage("");
        }, 3000);
      }
    } catch (error) {
      console.error("Error updating name:", error);
      setMessage("");
      setError("Error updating the name.");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <>
      <h2 className="approve-title">Solution Packages to Approve</h2>
      {message && (
        <div className="custom-alert custom-alert-success">{message}</div>
      )}
      {error && <div className="custom-alert custom-alert-danger">{error}</div>}
      <table className="custom-table">
        <thead>
          <tr>
            <th className="table-header">Name</th>
            <th className="table-header">Image</th>
            <th className="table-header">Company Name</th>
            <th className="table-header">Description</th>
            <th className="table-header">Link</th>
            <th className="table-header">Actions</th>
          </tr>
        </thead>
        <tbody>
          {allDataNeedsToApprove.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>
                <input
                  type="file"
                  className="file-input"
                  onChange={handleFileChange}
                />
              </td>
              <td>{item.companyName}</td>
              <td>{item.description}</td>
              <td>{item.link}</td>
              <td className="button-section">
                <button
                  onClick={() => handleEdit(item)}
                  className="primary-button"
                >
                  Edit
                </button>
                <button
                  variant="success"
                  onClick={() => handleApproveOrReject(item._id, "approve")}
                  className="success-button"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleApproveOrReject(item._id, "reject")}
                  className="danger-button"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <EditModal
        isOpen={isEditModalOpen}
        currentValue={value}
        setNewValue={(value) => setValue(value)}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default SolutionPackagesToApprove;
