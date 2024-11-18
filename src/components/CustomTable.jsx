import React from "react";
import { Link } from "react-router-dom";
import { CURRENT_API } from "../utils/utils";
import NoRecordFound from "./NoRecordFound";

function CustomTable({ solutions, industryId, handleDeleteButtonClick }) {
  const roles = localStorage.getItem("role");

  return (
    <div className="custom-table-container">
      {solutions.length === 0 ? (
        <NoRecordFound />
      ) : (
        <table className="custom-table">
          <thead>
            <tr>
              <th className="table-header">Industries</th>
              <th className="table-header">Image</th>
              {roles !== "seller" && <th className="table-header">Action</th>}
            </tr>
          </thead>
          <tbody>
            {solutions.map((solution) => (
              <tr key={solution._id}>
                <td>
                  <Link
                    to={{
                      pathname: `/adminSolutionPackages/${solution.name}/${industryId}/${solution._id}`,
                      state: { value: solution.name },
                    }}
                    className="industries-link"
                  >
                    {solution.name}
                  </Link>
                </td>
                <td>
                  <Link
                    to={{
                      pathname: `/adminSolutionPackages/${solution.name}/${industryId}/${solution._id}`,
                      state: { value: solution.name },
                    }}
                    className="industries-link"
                  >
                    <img
                      src={`${CURRENT_API}${solution.image}`}
                      alt={solution.name}
                      className="solution-image"
                    />
                  </Link>
                </td>
                {roles !== "seller" && (
                  <td>
                    <button
                      className="danger-button"
                      onClick={() => handleDeleteButtonClick(solution._id)}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CustomTable;
