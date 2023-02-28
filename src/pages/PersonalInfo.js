import React,{useEffect,useState} from 'react';
import "../Assets/Styles/personalInfo.css"
import avatar from "../Assets/images/avatar6.png"
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function PersonalInfo() {
    const params=useParams()
    const [contactId,setContactId]=useState(null)
  
    useEffect(()=>{
        axios.get(`http://localhost:3004/contacts/${params.contactsId}`)
        .then((res)=>{
            setContactId(res.data)
        })
        .catch((err)=>{})
    },[])

    if(contactId === null) return null

  return (
    <div className='infoPage'>
         <div className="content">
            <div className="card">
                <div className="firstinfo"><img src={avatar} />
                    <div className="profileinfo">
                        <h1><span>{contactId.name}</span><span> {contactId.surname}</span></h1>
                        <h4>Telephone: <span style={{fontSize:"16px"}}>{contactId.telephoneNumber}</span></h4>
                        <h4>E-mail: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{fontSize:"16px"}}>{contactId.emailAddress}</span></h4>
                        <h4>Address: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{fontSize:"16px"}}>{contactId.homeAddress}</span></h4>
                    </div>
                </div>
            </div>
            <div className="badgescard"> 
                <Link to={"/list-of-contacts"}> &lt;&lt; Back to homepage</Link>
            </div>        
        </div>
    </div>    
  )
}

export default PersonalInfo