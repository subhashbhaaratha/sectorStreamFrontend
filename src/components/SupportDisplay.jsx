import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { CURRENT_API } from "../utils/utils";

const SupportDisplay = () => {
  const [supportRequests, setSupportRequests] = useState([]);

  useEffect(() => {
    const fetchSupportRequests = async () => {
      try {
        const response = await axios.get(
          CURRENT_API + "/api/support/getSupports"
        );
        setSupportRequests(response.data.data);
      } catch (error) {
        console.error("Error fetching support requests:", error);
      }
    };

    fetchSupportRequests();
  }, []);

  return (
    <div>
      <h1 className="approve-title">Support Requests</h1>
      <table className="custom-table">
        <thead>
          <tr>
            <th className="table-header">Name</th>
            <th className="table-header">Phone</th>
            <th className="table-header">Email</th>
            <th className="table-header">Subject</th>
            <th className="table-header">Message</th>
          </tr>
        </thead>
        <tbody>
          {supportRequests.map((request) => (
            <tr key={request._id}>
              <td>{request.name}</td>
              <td>{request.phone}</td>
              <td>{request.email}</td>
              <td>{request.subject}</td>
              <td>{request.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SupportDisplay;
