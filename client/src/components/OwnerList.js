import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function OwnerList() {

    const [owners, setOwners] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/owners')

            .then(res => {
                console.log(res);
                setOwners(res.data);
            })
            .catch(err => console.log(err))
    }, [])


    const deleteOwner = (ownerId) => {
        axios.delete(`http://localhost:8000/api/owners/${ownerId}`)

            .then(res => {
                console.log(res);
                setOwners(owners.filter(owner => owner._id !== ownerId))
            })
            .catch(err => console.log(err))
    }




    return (
        <div>OwnerList
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {owners.map((owner, idx) => {
                        return (
                            <tr key={idx}>
                                <td>{owner.firstName}</td>
                                <td>{owner.lastName}</td>
                                <td>
                                    <Link to={`/owners/${owner._id}`}>
                                        <button>Owner and Pet Details</button>
                                    </Link>
                                    <Link to={`/owners/edit/${owner._id}`}>
                                        <button>Edit</button>
                                    </Link>
                                    <button onClick={() => deleteOwner(owner._id)}>Delete</button>
                                    
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <Link to={`/owners/new`}>
                <button>Add Owner</button>
            </Link>
        </div>
    )
}
