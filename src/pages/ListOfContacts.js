import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Assets/Styles/listOfContacts.css";
import ContactsList from "../components/ContactsList";

const ListOfContacts = () => {
  const [contact, setContact] = useState(null);
  const [didUpdate, setDidUpdate] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3004/contacts")
      .then((res) => {
        setContact(res.data);
      })
      .catch((err) => {});
  }, [didUpdate]);

  if (contact === null) return null;

  return (
    <div>
      <ContactsList
        contact={contact}
        setContact={setContact}
        didUpdate={didUpdate}
        setDidUpdate={setDidUpdate}
      />
    </div>
  );
};

export default ListOfContacts;
