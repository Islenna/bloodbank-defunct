import React, { useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Card, Container, Button, Form, Row, Col } from 'react-bootstrap';
import Navbar from './CustomNavbar';

function BloodFinder() {
    const [homeClinic, setHomeClinic] = useState('');
    const [bloodType, setBloodType] = useState('');
    const [pets, setPets] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    const searchPets = (e) => {
        e.preventDefault();
        axios
            .get(`http://localhost:8000/api/owners/search?homeClinic=${homeClinic}&bloodType=${bloodType}`)
            .then((res) => {
                console.log(res.data);
                setPets(res.data);
            })
            .catch((err) => console.log(err));
    };

    return (
        <div>
            <Container className="text-center">
            <h1>Blood Finder</h1>
            <Card
                style={{ backgroundColor: '#725846', border: 'none', borderTop: '10px solid #A9C27E' }}
                text="white"
                className="mt-4 p-4"
            >
                

                <Form onSubmit={searchPets}>
                    <Row>
                        <Col>
                            <Form.Group controlId="homeClinic">
                                <Form.Label>Home Clinic:</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={homeClinic}
                                    onChange={(e) => setHomeClinic(e.target.value)}
                                >
                                    <option value="">Select Home Clinic</option>
                                    <option value="Concord">Concord</option>
                                    <option value="Campbell">Campbell</option>
                                    <option value="Dublin">Dublin</option>
                                    <option value="Redwood City">Redwood City</option>
                                    <option value="San Francisco">San Francisco</option>
                                    {/* Add more options for other clinics */}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="bloodType">
                                <Form.Label>Blood Type:</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={bloodType}
                                    onChange={(e) => setBloodType(e.target.value)}
                                >
                                    <option value="">Select Blood Type</option>
                                    <option value="DEA 1.1 Positive">DEA 1.1 Positive</option>
                                    <option value="DEA 1.1 Negative">DEA 1.1 Negative</option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="AB">AB</option>
                                    {/* Add more options for other blood types */}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button type="submit">Search</Button>
                </Form>
                <div>
                    <h2>Pets</h2>
                    {pets.length > 0 ? (
                        <ul>
                            {pets.map((pet) => (
                                <li key={pet._id} style={{ listStyleType: "none" }}>
                                    <span>
                                        {pet.petName}
                                        <Button
                                            variant="success"
                                            onClick={() => navigate(`/pets/${pet._id}`)}
                                        >
                                            View
                                        </Button>{' '}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No pets found.</p>
                    )}
                </div>
            </Card>
                <Button variant="primary" onClick={() => navigate(`/owners`)}>
                    Back
                </Button>
                </Container>
        </div>
    );
}

export default BloodFinder;
