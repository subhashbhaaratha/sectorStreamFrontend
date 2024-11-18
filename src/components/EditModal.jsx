import { useState } from "react";

function EditModal({
  isOpen,
  currentValue,
  onClose,
  setNewValue,
  onSubmit,
  isSellerModal,
}) {
  const [textValue, setTextValue] = useState(currentValue.title);
  const [file, setFile] = useState(null);

  const handleTextChange = (e) => {
    setTextValue(e.target.value);
    setNewValue(e.target.value);
  };

  if (!isOpen) return null;

  return (
    <div className="custom-modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <h2>Edit Provider Solution Package</h2>
        <form className="modal-form">
          <div className="form-group">
            <label htmlFor="textInput">Name</label>
            <input
              type="text"
              id="textInput"
              className="search-form"
              placeholder="Enter text"
              value={textValue}
              onChange={handleTextChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="fileInput">Image</label>
            <input
              type="file"
              className="file-input"
              id="fileInput"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
        </form>
        <div className="modal-footer">
          <button className="primary-button" onClick={onClose}>
            Close
          </button>
          <button className="secondary-button" onClick={onSubmit}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
