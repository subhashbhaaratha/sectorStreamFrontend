import React, { useState } from "react";

function CustomModal({
  isOpen,
  currentValue,
  onClose,
  setNewValue,
  onSubmit,
  isSellerModal,
}) {
  const [textValue, setTextValue] = useState("");
  const [file, setFile] = useState(null);

  const handleTextChange = (e) =>
    setNewValue({ ...currentValue, title: e.target.value });
  const handleFileChange = (e) =>
    setNewValue({ ...currentValue, file: e.target.files[0] });
  const handleDescriptionChange = (e) =>
    setNewValue({ ...currentValue, description: e.target.value });
  const handleCompanyNameChange = (e) =>
    setNewValue({ ...currentValue, company: e.target.value });
  const handleLinkChange = (e) =>
    setNewValue({ ...currentValue, link: e.target.value });

  if (!isOpen) return null;

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal-content">
        <div className="custom-modal-header">
          <h2>Modal Title</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="custom-modal-body">
          <form>
            <div className="form-group">
              <label htmlFor="formText">Name</label>
              <input
                type="text"
                id="formText"
                placeholder="Enter text"
                value={currentValue.title}
                onChange={handleTextChange}
              />
            </div>
            {isSellerModal && (
              <>
                <div className="form-group">
                  <label htmlFor="formCompanyName">Company Name</label>
                  <input
                    type="text"
                    id="formCompanyName"
                    placeholder="Enter text"
                    value={currentValue.company}
                    onChange={handleCompanyNameChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="formLink">Link</label>
                  <input
                    type="text"
                    id="formLink"
                    placeholder="Enter text"
                    value={currentValue.link}
                    onChange={handleLinkChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="formDescription">Description</label>
                  <input
                    type="text"
                    id="formDescription"
                    placeholder="Enter text"
                    value={currentValue.description}
                    onChange={handleDescriptionChange}
                  />
                </div>
              </>
            )}
            {!isSellerModal && (
              <div className="form-group">
                <label htmlFor="formFile">Add Icon</label>
                <input type="file" id="formFile" onChange={handleFileChange} />
              </div>
            )}
          </form>
        </div>
        <div className="custom-modal-footer">
          <button className="secondary-button" onClick={onClose}>
            Close
          </button>
          <button className="dark-button" onClick={onSubmit}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomModal;
