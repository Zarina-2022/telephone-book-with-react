import React from 'react'
import "../Assets/Styles/cover.css"
import phone from "../Assets/images/phone1.png"
import { useNavigate } from 'react-router-dom'

function Cover() {
    const navigate=useNavigate()
    return (
        <div className='imgContainer'>
            <h1 onClick={()=>navigate("/list-of-contacts")} className='imgTitle'>Phone Book</h1>
            <img src={phone}></img>
        </div>
    )
}

export default Cover