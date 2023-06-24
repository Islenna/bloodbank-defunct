import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const OwnerForm= () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    

    const onSubmitHandler = e => {
        e.preventDefault();
        
        axios.post('http://localhost:8000/api/owners', {
            firstName,
            lastName,
            phoneNumber
        })
            .then(res=>console.log(res))
            .catch(err=>console.log(err))
    }

    
    return (
        <div>
            <h2>New Owner</h2>
            <form onSubmit={onSubmitHandler}>
                <p>
                    <label>First Name</label><br/>
                    <input type="text" name="firstName" onChange={(e)=>setFirstName(e.target.value)} value={firstName}/>
                </p>
                <p>
                    <label>Last Name</label><br/>
                    <input type="text" name="lastName" onChange={(e)=>setLastName(e.target.value)} value={lastName}/>
                </p>
                <p>
                    <label>Phone Number</label><br/>
                    <input type="text" name="phoneNumber" onChange={(e)=>setPhoneNumber(e.target.value)} value={phoneNumber}/>

                </p>
                <input type="submit"/>
            </form>
            <Link to={`/owners`}>Back</Link>
        </div>
    )
}
export default OwnerForm;