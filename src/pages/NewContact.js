import React, { useState,useEffect } from 'react'
import "../Assets/Styles/newContact.css"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function NewContact() {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [telephoneNumber, setTelephoneNumber] = useState("")
  const [emailAddress, setEmailAddress] = useState("")
  const [homeAddress, setHomeAddress] = useState("")
  const [contact, setContact]=useState(null)

  const handelSave = (e) => {
    e.preventDefault()
    // Validation
    if (name === "" ||
      surname === "" ||
      telephoneNumber === "" ||
      emailAddress === "" ||
      homeAddress === "") {
      alert("All fields are required.")
      return
    }

    const hasContact=contact.find(item=>item.telephoneNumber === telephoneNumber)
        if(hasContact !== undefined){
          alert(`Another contact with the same telephone number has already been registered.`) 
            return
        }

    const newContact = {
      id: String(new Date().getTime()),
      name: name,
      surname: surname,
      telephoneNumber: telephoneNumber,
      emailAddress: emailAddress,
      homeAddress: homeAddress,
    }
    axios.post("http://localhost:3004/contacts", newContact)
      .then((res) => {
        navigate("/list-of-contacts");
      })
      .catch((err) => {
        alert(`Something went wrong.`)
      return
      })
  }
  useEffect(()=>{
    axios.get("http://localhost:3004/contacts")
    .then((res) => {
      setContact(res.data)
    })
    .catch((err) => {
      
    })
  },[])

  if(contact === null) return null
  return (
    <div className="modal-content">
      <form onSubmit={handelSave}>

        <div className="modal-header">
          <h4 className="modal-title"><b>Add new contact</b></h4>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label>Name</label>
            <input type="text" className="form-control" placeholder='Alex'
              value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Surname</label>
            <input type="text" className="form-control" placeholder='Smith'
              value={surname} onChange={(e) => setSurname(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Telephone number</label>
            <input type="text" className="form-control" placeholder='0123 456 789 12'
              value={telephoneNumber} onChange={(e) => setTelephoneNumber(e.target.value)} />
          </div>
          <div className="form-group">
            <label>E-mail address</label>
            <input type="email" className="form-control" placeholder='hello@world.com'
              value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Home address</label>
            <textarea className="form-control" placeholder='Purple Str.45, Netherlands'
              value={homeAddress} onChange={(e) => setHomeAddress(e.target.value)}></textarea>
          </div>

        </div>

        <div className="modal-footer">
          <button onClick={() => navigate("/list-of-contacts")} type="button" className="btn btn-default">Cancel</button>
          <button type="submit" className="btn btn-info">Save</button>
        </div>

      </form>
    </div >
  )
}

export default NewContact