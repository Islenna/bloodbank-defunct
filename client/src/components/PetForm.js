import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Form, Card, Button, Container, Row, Col } from 'react-bootstrap';
import Navbar from './CustomNavbar';

const PetForm = () => {
    const [ownerFirstName, setOwnerFirstName] = useState('');
    const [ownerLastName, setOwnerLastName] = useState('');
    const [ownerID, setOwnerID] = useState('');
    const [petName, setPetName] = useState('');
    const [petType, setPetType] = useState('');
    const [petDescription, setPetDescription] = useState('');
    const [bloodType, setBloodType] = useState('');
    const [validationError, setValidationError] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/owners/${id}`)
            .then((res) => {
                console.log(res.data);
                setOwnerFirstName(res.data.firstName);
                setOwnerLastName(res.data.lastName);
                setOwnerID(res.data._id);
            })
            .catch((err) => console.log(err));
    }, [id]);

    const createPet = (e) => {
        e.preventDefault();

        // Perform validation based on petType and bloodType
        if (
            (petType === 'dog' || petType === 'canine') &&
            (bloodType !== 'DEA 1.1 Positive' && bloodType !== 'DEA 1.1 Negative')
        ) {
            setValidationError('Invalid bloodType for the selected petType');
            return;
        } else if (
            (petType === 'cat' || petType === 'feline') &&
            (bloodType !== 'A' && bloodType !== 'B' && bloodType !== 'AB')
        ) {
            setValidationError('Invalid bloodType for the selected petType');
            return;
        }

        // Create the pet
        axios
            .post(`http://localhost:8000/api/pets`, {
                petName,
                petType,
                petDescription,
                owner: ownerID,
                bloodType,
            })
            .then((res) => {
                console.log(res);
                navigate(`/owners/${id}`);
            })
            .catch((err) => console.log(err));
    };

    return (
        <div>
            <Container className="text-center">
                <h1>Add a Pet</h1>
                <Card
                    style={{ backgroundColor: '#725846', border: 'none', borderTop: '10px solid #A9C27E' }}
                    text="white"
                    className="mt-4 p-4"
                >
                    <Row className="justify-content-center">
                        <Col xs={12} md={8} lg={6}>
                            <div className="text-center">

                                <h2 style={{ color: 'white' }}>
                                    {ownerFirstName} {ownerLastName}
                                </h2>
                            </div>

                            <Form onSubmit={createPet}>
                                <Form.Group controlId="petName">
                                    <Form.Label style={{ color: 'white' }}>Pet Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={petName}
                                        onChange={(e) => setPetName(e.target.value)}
                                        style={{ backgroundColor: 'white', color: 'black' }}
                                    />
                                </Form.Group>

                                <Form.Group controlId="species">
                                    <Form.Label style={{ color: 'white' }}>Choose a species:</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={petType}
                                        onChange={(e) => setPetType(e.target.value)}
                                        style={{ backgroundColor: 'white', color: 'black' }}
                                    >
                                        <option value="default">Select an option</option>
                                        <option value="dog">Canine</option>
                                        <option value="cat">Feline</option>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId="petDescription">
                                    <Form.Label style={{ color: 'white' }}>Pet Description</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={petDescription}
                                        onChange={(e) => setPetDescription(e.target.value)}
                                        style={{ backgroundColor: 'white', color: 'black' }}
                                    />
                                </Form.Group>

                                {petType && (
                                    <Form.Group controlId="bloodType">
                                        <Form.Label style={{ color: 'white' }}>Blood Type:</Form.Label>
                                        <Form.Control
                                            as="select"
                                            value={bloodType}
                                            onChange={(e) => setBloodType(e.target.value)}
                                            style={{ backgroundColor: 'white', color: 'black' }}
                                        >
                                            <option value="">Select a blood type</option>
                                            {petType === 'dog' || petType === 'canine' ? (
                                                <>
                                                    <option value="DEA 1.1 Positive">DEA 1.1 Positive</option>
                                                    <option value="DEA 1.1 Negative">DEA 1.1 Negative</option>
                                                </>
                                            ) : petType === 'cat' || petType === 'feline' ? (
                                                <>
                                                    <option value="A">A</option>
                                                    <option value="B">B</option>
                                                    <option value="AB">AB</option>
                                                </>
                                            ) : null}
                                        </Form.Control>
                                    </Form.Group>
                                )}

                                {validationError && <p style={{ color: 'white' }}>{validationError}</p>}

                                <Button variant="success" type="submit">
                                    Create Pet
                                </Button>
                            </Form>

                            <div className="text-center mt-3">
                                <Button as={Link} to={`/owners/${id}`} variant="primary">
                                    Back
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Card>
            </Container>
        </div>
    );
};

export default PetForm;
