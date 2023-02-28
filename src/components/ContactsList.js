import React, { useState, useEffect } from "react";
import "../Assets/Styles/contactList.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "./Modal";
import Pagination from "../components/Pagination";

function ContactsList({ contact, setContact, didUpdate, setDidUpdate,total}) {
  const navigate = useNavigate();
  const [filteredContacts, setFilteredContacts] = useState(contact);
  const [searchContact, setSearchContact] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteContact, setDeleteContact] = useState("");
  const [eachPage, setEachPage] = useState(1);
  const [contactsPerPage] = useState(5);

  // pagination
  const indexOfLastContact = eachPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = filteredContacts.slice(indexOfFirstContact, indexOfLastContact);
  const totalPageNum = Math.ceil(filteredContacts.length / contactsPerPage);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3004/contacts/${id}`)
      .then((res) => {
        setDeleteModal(false);
        setDidUpdate(!didUpdate);
        window.location.reload();
      })
      .catch((err) => {
       alert("Connection to server is failed - Error 404")
      });
  };

  useEffect(() => {
    const tempArray = contact.filter(
      (item) =>
        item.name.toLowerCase().includes(searchContact.toLowerCase()) ===
          true ||
        item.surname.toLowerCase().includes(searchContact.toLowerCase()) ===
          true ||
        item.telephoneNumber.includes(searchContact) === true ||
        item.emailAddress
          .toLowerCase()
          .includes(searchContact.toLowerCase()) === true ||
        item.homeAddress.toLowerCase().includes(searchContact.toLowerCase()) ===
          true
    );
    setFilteredContacts(tempArray);
  }, [searchContact]);

  return (
    <div className="container">
      <div className="table-responsive">
        <div className="table-wrapper">
          <div className="table-title">
            <div className="row d-flex">
              <div className="col-xs-5">
                <h2>
                  <b>List of contacts</b>
                </h2>
              </div>

              <div className="col-xs-7 d-flex">
                <div className="search-box d-flex">
                  <i className="material-icons">&#xE8B6;</i>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search&hellip;"
                    value={searchContact}
                    onChange={(e) => setSearchContact(e.target.value)}
                  />
                </div>

                <div>
                  <button
                    onClick={() => navigate("/new-contact")}
                    className="btn btn-primary"
                  >
                    <span>Add New Contact</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <table className="table table-striped table-hover table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>
                  Name<i className="fa fa-sort"></i>
                </th>
                <th>Surname</th>
                <th>
                  Telephone number<i className="fa fa-sort"></i>
                </th>
                <th>E-mail address</th>
                <th>
                  Home address<i className="fa fa-sort"></i>
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contact.length === 0 ? (
                <tr>
                  <td
                    className="text-center"
                    colSpan={8}
                    style={{ fontSize: "18px", color: "red" }}
                  >
                    There are no registered contacts.
                  </td>
                </tr>
              ) : filteredContacts.length === 0 ? (
                <tr>
                  <td
                    className="text-center"
                    colSpan={8}
                    style={{ fontSize: "18px", color: "red" }}
                  >
                    There are no contacts in your search criteria.
                  </td>
                </tr>
              ) : (
                currentContacts.map ((contacts, index) => (
                    <tr key={contacts.id}>
                      <td>{index + 1}</td>
                      <td>{contacts.name}</td>
                      <td>{contacts.surname}</td>
                      <td>{contacts.telephoneNumber}</td>
                      <td>{contacts.emailAddress}</td>
                      <td>{contacts.homeAddress}</td>
                      <td>
                        <Link
                          to={`/personal-info/${contacts.id}`}
                          className="view"
                          title="Details"
                        >
                          <i className="material-icons">&#xE417;</i>
                        </Link>

                        <Link
                          to={`/edit/${contacts.id}`}
                          className="edit"
                          title="Edit"
                        >
                          <i className="material-icons">&#xE254;</i>
                        </Link>

                        <button
                          onClick={() => {
                            setDeleteModal(true);
                            setDeleteContact(contacts.id);
                          }}
                          type="button"
                          className="delete"
                          data-toggle="modal"
                        >
                          <i
                            className="material-icons"
                            data-toggle="tooltip"
                            title="Delete"
                          >
                            &#xE872;
                          </i>
                        </button>
                      </td>
                    </tr>
                  ) 
                  )
              )} 
            </tbody>
          </table>
        </div>
      </div>
      <Pagination pages={totalPageNum} setEachPage={setEachPage} contact={contact} setContact={setContact} total={total}/>
      {deleteModal === true && (
        // deleteModal === true && (veya: deleteModal && (), !deleteModal && () )
        <Modal
          title="Delete contact"
          h4="Are you sure you want to delete this contact?"
          h5="You cannot restore deleted contact."
          cancelbtn=" Cancel"
          cancelButtonClick={() => setDeleteModal(false)}
          hasConfirm={true} // bunu yazmazsan delete butonu gorunmez
          deletebtn="Delete"
          deleteButtonClick={() => handleDelete(deleteContact)}
        />
      )}
    </div>
  );
}

export default ContactsList;
