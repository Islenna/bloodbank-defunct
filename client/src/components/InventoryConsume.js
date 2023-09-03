import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card } from 'react-bootstrap';

export default function InventoryConsume({ totalVolume }) {
    const { id } = useParams()
    const [consumeType, setConsumeType] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [recipient, setRecipient] = useState('');
    const [itemData, setItemData] = useState(null);
    const [patientId, setPatientId] = useState('');
    const [patientName, setPatientName] = useState('');
    const [patientLastName, setPatientLastName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/inventory/${id}`)
            .then((res) => {
                console.log(id)
                setItemData(res.data);
            })
            .catch((err) => {
                console.error('Error fetching item data:', err);
            });
    }, [id]);

    const handleConsume = (e) => {
        e.preventDefault();

        // Check if itemData is not null before accessing its properties
        if (!itemData) {
            console.error('Item data not available.');
            return;
        }

        let consumptionQuantity = 0;

        switch (consumeType) {
            case 'Expired':
            case 'Wasted':
                consumptionQuantity = itemData.totalVolume;
                break;
            default:
                consumptionQuantity = quantity;
                break;
        }

        const consumptionData = {
            consumptionType: consumeType,
            quantity: consumptionQuantity,
            recipient: recipient,
            patientId: patientId,
            patientName: patientName,
            patientLastName: patientLastName,
        };

        axios
            .put(`http://localhost:8000/api/inventory/consume/${id}`, consumptionData)
            .then((res) => {
                setItemData(res.data);
                console.log('Item consumed successfully:', res.data);
                navigate('/bloodfinder');
            })
            .catch((err) => {
                console.error('Error consuming item:', err);
            });
    };

    return (
        <div>
            <Container>
                <h1>Inventory Information</h1>
                <Card
                    style={{ backgroundColor: '#725846', border: 'none', borderTop: '10px solid #A9C27E' }}
                    text="white"
                    className="mt-4 p-4"
                >

                    <h1>Consume Blood</h1>
                    {itemData ? (
                        <h2>Item ID: {itemData.donorID}</h2>
                    ) : (
                        <p>Loading item data...</p>
                    )}
                    <Form onSubmit={handleConsume}>
                        <Form.Group controlId="consumeType">
                            <Form.Label>Consumption Type:</Form.Label>
                            <Form.Control
                                as="select"
                                value={consumeType}
                                onChange={(e) => setConsumeType(e.target.value)}
                            >
                                <option value="">Select Consumption Type</option>
                                <option value="Expired">Expired</option>
                                <option value="Wasted">Wasted</option>
                                <option value="Transferred">Transferred</option>
                                <option value="Successfully Transfused">Successfully Transfused</option>
                            </Form.Control>
                        </Form.Group>
                        {consumeType === 'Successfully Transfused' && (
                            <>
                                <Form.Group controlId="patientId">
                                    <Form.Label>Patient ID:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={patientId}
                                        onChange={(e) => setPatientId(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group controlId="patientName">
                                    <Form.Label>Patient Name:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={patientName}
                                        onChange={(e) => setPatientName(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group controlId="patientLastName">
                                    <Form.Label>Patient Last Name:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={patientLastName}
                                        onChange={(e) => setPatientLastName(e.target.value)}
                                    />
                                </Form.Group>
                            </>
                        )}
                        <Button variant="primary" type="submit">
                            Consume
                        </Button>
                    </Form>

                </Card>
            </Container>
        </div>
    );
}
