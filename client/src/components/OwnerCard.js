import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Button, Card } from 'react-bootstrap';

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
        <Container>
            <Row className="justify-content-center">
                <div>
                    <h1>
                        {owner.firstName} {owner.lastName}'s Information
                    </h1>
                    <Card
                        style={{ backgroundColor: '#725846', border: 'none', borderTop: '20px solid #A9C27E' }}
                        text="white"
                        className="mt-4 p-4"
                    >
                        <Card.Text>
                            <p>First Name: {owner.firstName}</p>
                            <p>Last Name: {owner.lastName}</p>
                            <p>Phone Number: {owner.phoneNumber}</p>
                            <p>Email: {owner.email}</p>
                            <p>Home Clinic: {owner.homeClinic}</p>
                            <p>Pets:</p>
                            <ul className="list-unstyled">
                                {pets.map((pet) => (
                                    <li key={pet._id}>
                                        {pet.petName} - {pet.petType}{' '}
                                        <Button variant="success" onClick= {() => navigate(`/pets/${pet._id}`)}>
                                            View
                                        </Button>{' '}
                                        <Button variant="danger" onClick={() => deletePet(pet._id)}>
                                            Delete
                                        </Button>
                                        
                                    </li>
                                ))}
                            </ul>
                        </Card.Text>
                    </Card>
                    <Button variant="primary" onClick={() => navigate(`/owners/edit/${id}`)}>
                        Edit
                    </Button>{' '}
                    <Button variant="primary" onClick={() => navigate(`/owners`)}>
                        Back
                    </Button>{' '}
                    <Button variant="primary" onClick={() => navigate(`/pets/new/${id}`)}>
                        Add Pet
                    </Button>
                </div>
            </Row>
        </Container>
    );
}
