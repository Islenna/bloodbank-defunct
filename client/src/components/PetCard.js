import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

export default function PetCard() {
    const [pet, setPet] = useState({});
    const [owner, setOwner] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/pets/${id}`)
            .then((res) => {
                setPet(res.data);
                const ownerId = res.data.owner;
                axios
                    .get(`http://localhost:8000/api/owners/${ownerId}`)
                    .then((res) => {
                        setOwner(res.data);
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    }, [id]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long' };
        return new Date(dateString).toLocaleString('en-US', options);
    };

    return (
        <div>
            <h1>{pet.petName}'s Information</h1>
            <p>Pet Name: {pet.petName}</p>
            <p>Pet Type: {pet.petType}</p>
            <p>Description: {pet.petDescription}</p>
            <p>Blood Type: {pet.bloodType}</p>
            <p>Pet Owner: {owner.firstName}</p>
            <p>Last Donated: {pet.lastDonated && formatDate(pet.lastDonated)}</p>
            <p>Labwork Status: {pet.labworkStatus}</p>
            <p>Date Labwork Completed: {pet.dateLabworkCompleted && formatDate(pet.dateLabworkCompleted)}</p>
            <Link to={`/owners/${owner._id}`}>Back</Link>
            <Link to={`/owners`}>Back to All Owners</Link>
            <Link to={`/pets/edit/${pet._id}`}>Edit</Link>  
        </div>
    );
}
