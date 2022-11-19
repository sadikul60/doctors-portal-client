import React from "react";

const ConfirmationModal = ({title, message, handleDeleteDoctor, modalData, closeModal}) => {
  return (
    <div>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="confirmationModal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            {title}
          </h3>
          <p className="py-4">
            {message}
          </p>
          <div className="modal-action">
            <label onClick={() => handleDeleteDoctor(modalData)} htmlFor="confirmationModal" className="btn btn-outline">
              Delete
            </label>
            <button onClick={closeModal} className="btn btn-outline">Cancle</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
