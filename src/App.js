import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./Assets/Styles/general.css";
import Cover from "./pages/Cover";
import ListOfContacts from "./pages/ListOfContacts";
import NewContact from "./pages/NewContact";
import PersonalInfo from "./pages/PersonalInfo";
import Edit from "./pages/Edit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Cover />} />
        <Route path={"/list-of-contacts"} element={<ListOfContacts />} />
        <Route path={"/new-contact"} element={<NewContact />} />
        <Route path={"/personal-info/:contactsId"} element={<PersonalInfo />} />
        <Route path={"/edit/:contactsId"} element={<Edit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
