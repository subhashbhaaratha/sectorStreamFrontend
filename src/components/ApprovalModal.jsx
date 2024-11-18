import React from "react";
import { Modal, Button, Table } from "react-bootstrap";
import { CURRENT_API } from "../utils/utils";

const ApprovalModal = ({
  show,
  handleClose,
  data,
  handleApprove,
  handleReject,
  handleEdit,
}) => {
  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Approve Solution Packages</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table responsive bordered hover className="custom-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>
                  <img
                    src={`${CURRENT_API}/${item.image}`}
                    alt={item.name}
                    style={{ width: "60px" }}
                  />
                </td>
                <td>
                  <Button variant="primary" onClick={() => handleEdit(item)}>
                    Edit
                  </Button>{" "}
                  <Button variant="success" onClick={() => handleApprove(item)}>
                    Approve
                  </Button>
                  <Button variant="failure" onClick={() => handleReject(item)}>
                    Reject
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ApprovalModal;
