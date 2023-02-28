import React from "react";
import "../Assets/Styles/modal.css";

const Modal = ({
  title = "",
  h4 = "",
  h5 = "",
  cancelbtn = "",
  cancelButtonClick = () => {},
  deletebtn = "",
  deleteButtonClick = () => {},
  hasConfirm = false
}) => {
  return (
    <>
      <div className="modalContainer">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title fs-5">{title}</h3>
            </div>
            <div className="modal-body">
              <h4>{h4}</h4>
              <h5 style={{ color: "orange" }}>{h5}</h5>
            </div>
            <div className="modal-footer">
              <button
                onClick={cancelButtonClick}
                type="button"
                className="btn btn-secondary"
              >
                {cancelbtn}
              </button>
                {/*<>delete butonu bu fonksiyonla basta gorunmez</>*/}
              {hasConfirm === true && (
                <button
                  onClick={deleteButtonClick}
                  type="button"
                  className="btn btn-danger"
                >
                  {deletebtn}
                </button>
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
