import React from "react";

const DeleteModal = ({ show, onHide, onConfirm }) => {
  return (
    <div className={`modal ${show ? "show" : ""}`} onClick={onHide}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Confirm Deletion</h2>
          <button className="close-button" onClick={onHide}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          Are you sure you want to delete this solution?
        </div>
        <div className="modal-footer">
          <button className="secondary-button" onClick={onHide}>
            Cancel
          </button>
          <button className="danger-button" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
