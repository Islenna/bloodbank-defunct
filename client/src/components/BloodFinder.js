import React, { useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Card, Container, Button, Form, Row, Col } from 'react-bootstrap';

function BloodFinder() {
    const [homeClinic, setHomeClinic] = useState('');
    const [bloodType, setBloodType] = useState('');
    const [pets, setPets] = useState([]);
    const [matchingBlood, setMatchingBlood] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    const searchPets = (e) => {
        e.preventDefault();

        axios
            .get(`http://localhost:8000/api/owners/search?homeClinic=${homeClinic}&bloodType=${bloodType}`, 
            { withCredentials: true })
            .then((res) => {
                setPets(res.data);
            })
            .catch((err) => console.log(err));

        axios
            .get(`http://localhost:8000/api/inventory/search/${homeClinic}/${bloodType}`,  { withCredentials: true })
            .then((res) => {
                const filteredBlood = res.data.filter((blood) => !blood.isDeleted);
                setMatchingBlood(filteredBlood);
            })
            .catch((err) => console.log(err));
    };

    const parseUnitSize = (unitSize) => {
        const numericPart = parseFloat(unitSize);
        return isNaN(numericPart) ? 0 : numericPart;
    };

    const calculateTotalVolume = (bloodBags) => {
        let totalVolume = 0;
        for (const bag of bloodBags) {
            totalVolume += parseUnitSize(bag.unitSize);
        }
        return totalVolume;
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
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button type="submit">Search</Button>
                    </Form>
                    <div>
                        <h2>Donors</h2>
                        {pets.length > 0 ? (
                            <table
                                className="table-responsive"
                                style={{
                                    width: '75%',
                                    margin: '0 auto',
                                    backgroundColor: '#725846',
                                    tableLayout: 'fixed',
                                }}
                            >
                                <thead>
                                    <tr style={{ backgroundColor: '#A9C27E', color: '#000000' }}>
                                        <th scope="col" style={{ padding: '0.5rem' }}>
                                            Name
                                        </th>
                                        <th scope="col">Species</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pets.map((pet) => (
                                        <tr key={pet._id}>
                                            <td>{pet.petName}</td>
                                            <td>{pet.petType}</td>
                                            <td>
                                                <Button
                                                    variant="success"
                                                    onClick={() => navigate(`/pets/${pet._id}`)}
                                                >
                                                    View
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No pets found.</p>
                        )}
                        <h2>Inventory</h2>
                        <p style={{ color: 'lightgray' }}>Total Volume: {calculateTotalVolume(matchingBlood)} mL</p>
                        {matchingBlood.length > 0 ? (
                            <table
                                className="table-responsive"
                                style={{
                                    width: '75%',
                                    margin: '0 auto',
                                    backgroundColor: '#725846',
                                    tableLayout: 'fixed',
                                }}
                            >
                                <thead>
                                    <tr style={{ backgroundColor: '#A9C27E', color: '#000000' }}>
                                        <th scope="col" style={{ padding: '0.5rem' }}>
                                            Donor ID
                                        </th>
                                        <th scope="col">Unit Size</th>
                                        <th scope="col">Expiration Date</th>
                                        <th scope="col">On Hold?</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {matchingBlood.map((blood) => (
                                        <tr key={blood._id}>
                                            <td>{blood.donorID}</td>
                                            <td>{blood.unitSize}</td>
                                            <td>
                                                {new Date(blood.expirationDate).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                })}
                                            </td>
                                            <td>
                                                {blood.onHold ? (
                                                    <span style={{ color: '#FFC107' }}>On Hold</span>
                                                ) : (
                                                    <span style={{ color: '#A9C27E' }}>Available</span>
                                                )}

                                            </td>
                                            <td>
                                                <Button
                                                    variant="success"
                                                    onClick={() => navigate(`/inventory/${blood._id}`)}
                                                >
                                                    View
                                                </Button>
                                                <Button 
                                                    variant='danger'
                                                    onClick={() => navigate(`/inventory/${blood._id}/consume`)}
                                                >
                                                    Consume
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No blood of that type on hand.</p>
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
