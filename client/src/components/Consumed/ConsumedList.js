import React, { useState, useEffect } from 'react';
import { Container, Card, Table, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ConsumedList() {
    const [consumedInventory, setConsumedInventory] = useState([]);
    const [selectedClinic, setSelectedClinic] = useState('');
    const [searchedClinic, setSearchedClinic] = useState('');

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/consumed', { withCredentials: true })
            .then((res) => {
                setConsumedInventory(res.data);
            })
            .catch((error) => {
                console.error('Error fetching consumed data:', error);
            });
    }, []);

    const handleClinicChange = (e) => {
        setSelectedClinic(e.target.value);
    };

    const handleSearch = () => {
        setSearchedClinic(selectedClinic);
    };

    const filteredConsumedInventory = searchedClinic
        ? consumedInventory.filter((item) => item.homeClinic === searchedClinic)
        : consumedInventory;

    return (
        <Container className="text-center">
            <h1>Consumed Inventory</h1>
            <Card
                style={{
                    backgroundColor: '#725846',
                    border: 'none',
                    borderTop: '10px solid #A9C27E',
                }}
                text="white"
                className="mt-4 p-4"
            >
                <Form>
                    <Form.Group controlId="clinicSelect">
                        <Form.Label>Select Clinic:</Form.Label>
                        <Form.Control
                            as="select"
                            value={selectedClinic}
                            onChange={handleClinicChange}
                        >
                            <option value="">All Clinics</option>
                            <option value="Concord">Concord</option>
                            <option value="Campbell">Campbell</option>
                            <option value="Dublin">Dublin</option>
                            <option value="Redwood City">Redwood City</option>
                            <option value="San Francisco">San Francisco</option>
                        </Form.Control>
                    </Form.Group>
                    <Button variant="primary" onClick={handleSearch}>
                        Search
                    </Button>
                </Form>
                {Array.isArray(filteredConsumedInventory) && filteredConsumedInventory.length > 0 ? (
                    <table
                        style={{
                            width: '75%',
                            margin: '0 auto',
                            backgroundColor: '#725846',
                            tableLayout: 'fixed',
                        }}
                    >
                        <thead>
                            <tr style={{ backgroundColor: '#A9C27E', color: '#000000' }}>
                                <th style={{ padding: '0.5rem' }}>Date Consumed</th>
                                <th>Donor ID</th>
                                <th>Reason</th>
                                <th>Clinic</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredConsumedInventory.map((item) => (
                                <tr key={item._id}>
                                    <td>
                                        {new Date(item.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                        })}
                                    </td>
                                    <td>{item.donorID}</td>
                                    <td>{item.consumptionType}</td>
                                    <td>{item.homeClinic}</td>
                                    <td>
                                        <Link to={`/consumed/${item._id}`}>
                                            <Button variant="info">View</Button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No consumed inventory data available.</p>
                )}
            </Card>
        </Container>
    );
}

export default ConsumedList;
