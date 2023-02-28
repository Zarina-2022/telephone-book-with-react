import React, { useEffect, useState } from "react";
import "../Assets/Styles/edit.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Edit() {
  const navigate = useNavigate();
  const params = useParams();
  const [contactEdit, setContactEdit] = useState(null);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [telephoneNumber, setTelephoneNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [homeAddress, setHomeAddress] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3004/contacts/${params.contactsId}`)
      .then((res) => {
        setContactEdit(res.data);
        setName(res.data.name);
        setSurname(res.data.surname);
        setTelephoneNumber(res.data.telephoneNumber);
        setEmailAddress(res.data.emailAddress);
        setHomeAddress(res.data.homeAddress);
      })
      .catch((err) => {});
  }, []);

  const handleSave = (event) => {
    event.preventDefault();
    // Validation
    if (
      name === "" ||
      surname === "" ||
      telephoneNumber === "" ||
      emailAddress === "" ||
      homeAddress === ""
    ) {
      alert("All fields are required.");
      return;
    }

    const editContactId = {
      id: params.contactsId,
      name: name,
      surname: surname,
      telephoneNumber: telephoneNumber,
      emailAddress: emailAddress,
      homeAddress: homeAddress,
    };
    axios
      .put(`http://localhost:3004/contacts/${params.contactsId}`, editContactId)
      .then((res) => {
        navigate("/list-of-contacts");
      })
      .catch((err) => {
        alert("An error occurred while saving.")
      });
  };

  if (contactEdit === null) return null;

  return (
    <div>
      <div className="modal-content">
        <form onSubmit={handleSave}>
          <div className="modal-header">
            <h4 className="modal-title">
              <b>Edit contact</b>
            </h4>
          </div>

          <div className="modal-body">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Alex"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Surname</label>
              <input
                type="text"
                className="form-control"
                placeholder="Smith"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Telephone number</label>
              <input
                type="text"
                className="form-control"
                placeholder="0123 456 789 12"
                value={telephoneNumber}
                onChange={(e) => setTelephoneNumber(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>E-mail address</label>
              <input
                type="email"
                className="form-control"
                placeholder="hello@world.com"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Home address</label>
              <textarea
                className="form-control"
                placeholder="Purple Str.45, Netherlands"
                value={homeAddress}
                onChange={(e) => setHomeAddress(e.target.value)}
              ></textarea>
            </div>
          </div>

          <div className="modal-footer">
            <button
              onClick={() => navigate("/list-of-contacts")}
              type="button"
              className="btn btn-default"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-info">
              Save
            </button>
          </div>
        </form>
      </div>
      
    </div>
  );
}

export default Edit;
