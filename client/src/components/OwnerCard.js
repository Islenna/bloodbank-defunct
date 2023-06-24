import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

export default function OwnerCard() {
    const [owner, setOwner] = useState({});
    const [pets, setPets] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
    
    const deletePet = (petId) => {
        axios
            .delete(`http://localhost:8000/api/pets/${petId}`)
            .then((res) => {
                // Remove the deleted pet from the pets state
                setPets((prevPets) => prevPets.filter((pet) => pet._id !== petId));
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/owners/${id}`)
            .then((res) => {

                setOwner(res.data);
            })
            .catch((err) => console.log(err));

        axios
            .get(`http://localhost:8000/api/owners/${id}/pets`)
            .then((res) => {

                setPets(res.data);
            })
            .catch((err) => console.log(err));
    }, [id]);

    return (
        <div>
            <h1>
                {owner.firstName} {owner.lastName}'s Information
            </h1>
            <p>First Name: {owner.firstName}</p>
            <p>Last Name: {owner.lastName}</p>
            <p>Phone Number: {owner.phoneNumber}</p>
            <p>Pets:</p>
            <ul>
                {pets.map((pet) => (
                    <li key={pet._id}>
                        <Link to={`/pets/${pet._id}`}>{pet.petName}</Link> - {pet.petType}{' '}
                        <button onClick={() => deletePet(pet._id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <button onClick={() => navigate(`/owners/edit/${id}`)}>Edit</button>
            <button onClick={() => navigate(`/owners`)}>Back</button>
            <button onClick={() => navigate(`/pets/new/${id}`)}>Add Pet</button>
        </div>
    );
}
