import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate, useParams } from "react-router-dom";

const Update = (props) => {
    const { id } = useParams(); //this process is identical to the one we used with our Details.js component
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/owners/${id}`)
            .then(res => {
                setFirstName(res.data.firstName);
                setLastName(res.data.lastName);
                setPhoneNumber(res.data.phoneNumber);
            })
            .catch(err => console.log(err))
    }, [id])
    const updateOwner = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/owners/${id}`, {
            firstName,
            lastName,
            phoneNumber
        })
            .then(res => {
                console.log(res);
                navigate(`/owners/${id}`)

            })
            .catch(err => console.log(err))
    }
    return (
        <div>
            <h1>Update an Owner</h1>
            <form onSubmit={updateOwner}>
                <p>
                    <label>First Name</label><br />
                    <input type="text"
                        name="firstName"
                        value={firstName}
                        onChange={(e) => { setFirstName(e.target.value) }} />
                </p>
                <p>
                    <label>Last Name</label><br />
                    <input type="text"
                        name="lastName"
                        value={lastName}
                        onChange={(e) => { setLastName(e.target.value) }} />
                </p>

                <p>
                    <label>Phone Number</label><br />
                    <input type="text"
                        name="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => { setPhoneNumber(e.target.value) }} />
                </p>

                <input type="submit" />
            </form>
            <Link to={`/owners`}>Back</Link>
        </div>
    )
}
export default Update;

