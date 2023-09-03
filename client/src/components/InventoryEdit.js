import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Card, Button, Container, Row, Col } from 'react-bootstrap';
import Navbar from './CustomNavbar';

export default function InventoryEditForm() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        donorID: '',
        bloodSource: '',
        unitSize: '',
        bloodType: '',
        expirationDate: '',
        crossmatchHistory: '', // Add crossmatchHistory here
        homeClinic: '',
    });

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/inventory/${id}`)
            .then((res) => {
                const existingData = res.data;
                setFormData({
                    donorID: existingData.donorID,
                    bloodSource: existingData.bloodSource,
                    unitSize: existingData.unitSize,
                    bloodType: existingData.bloodType,
                    expirationDate: existingData.expirationDate,
                    crossmatchHistory: existingData.crossmatchHistory,
                    homeClinic: existingData.homeClinic,
                });
            })
            .catch((err) => {
                console.log('Error:', err);
            });
    }, [id]);

    const updateInventory = (e) => {
        e.preventDefault();
        console.log('Updated Data:', formData);

        axios
            .put(`http://localhost:8000/api/inventory/${id}`, formData)
            .then((res) => {
                console.log('Response:', res);
                navigate(`/bloodfinder`);
            })
            .catch((err) => {
                console.log('Error:', err);
            });
    };

    return (
        <div>
            <Container className="text-center">
                <h1>Donor: {formData.donorID}</h1>
                <Card
                    style={{ backgroundColor: '#725846', border: 'none', borderTop: '10px solid #A9C27E' }}
                    text="white"
                    className="mt-4 p-4"
                >
                    <h2>Edit Donor {formData.donorID}</h2>
                    <h2>Donor Source: {formData.bloodSource}</h2>
                    <Form onSubmit={updateInventory}>
                        <Form.Group controlId="homeClinic">
                            <Form.Label>Blood Location:</Form.Label>
                            <Form.Control
                                as="select"
                                value={formData.homeClinic}
                                onChange={(e) => setFormData({ ...formData, homeClinic: e.target.value })}
                            >
                                <option value="">Bag Location</option>
                                <option value="Concord">Concord</option>
                                <option value="Campbell">Campbell</option>
                                <option value="Dublin">Dublin</option>
                                <option value="Redwood City">Redwood City</option>
                                <option value="San Francisco">San Francisco</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="bloodSource">
                            <Form.Label>Blood Source:</Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.bloodSource}
                                readOnly={true}
                            />
                        </Form.Group>
                        <Form.Group
                            controlId="crossmatchHistory"
                            value={formData.crossmatchHistory}
                            onChange={(e) => setFormData({ ...formData, crossmatchHistory: e.target.value })}
                        >
                            <Form.Label>Crossmatch History:</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>

                        <Button variant="success" type="submit">
                            Update Inventory
                        </Button>
                    </Form>
                </Card>
            </Container>
        </div>
    );
}
