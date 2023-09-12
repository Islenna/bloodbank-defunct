import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card } from 'react-bootstrap';

export default function InventoryConsume({ totalVolume }) {
    const { id } = useParams();
    const [consumeType, setConsumeType] = useState('');
    const [patientID, setPatientID] = useState('');
    const [patientName, setPatientName] = useState('');
    const [patientLastName, setPatientLastName] = useState('');
    const [itemData, setItemData] = useState(null);
    const [transferredTo, setTransferredTo] = useState('');
    const [transferredBy, setTransferredBy] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const navigate = useNavigate();

    const validateForm = () => { // validate the form
        const errors = {};
        if (!consumeType) {
            errors.consumeType = 'Consumption Type is required';
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };


    useEffect(() => { // get the information of the inventory item
        axios
            .get(`http://localhost:8000/api/inventory/${id}`, { withCredentials: true })
            .then((res) => {
                setItemData(res.data);
            })
            .catch((err) => {
                console.error('Error fetching item data:', err);
            });
    }, [id]);

    const handleConsume = (e) => { // handle the consumption
        e.preventDefault();
        if (!validateForm()) { // validate the form
            return;
        }
        if (!itemData) { // check if item data is available
            console.error('Item data not available.');
            return;
        }

        const consumptionData = {
            consumptionType: consumeType,
            patientID: patientID,
            patientName: patientName,
            patientLastName: patientLastName,
            transferredTo: transferredTo,
            transferredBy: transferredBy,
        };
        console.log('Data to be sent:', consumptionData);// log the data to be sent
        axios
            .put(`http://localhost:8000/api/inventory/consume/${id}`, consumptionData, { withCredentials: true })
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
                                {formErrors.consumeType && (
                                    <Form.Text className="text-danger">{formErrors.consumeType}</Form.Text>
                                )}
                            </Form.Control>
                        </Form.Group>
                        {consumeType === 'Successfully Transfused' && ( // display the form based on the consumption type
                            <>
                                <Form.Group controlId="patientID">
                                    <Form.Label>Patient ID:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={patientID}
                                        onChange={(e) => setPatientID(e.target.value)}
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
                        {consumeType === 'Transferred' && (
                            <>
                                <Form.Group controlId="transferredTo">
                                    <Form.Label>Home Clinic:</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={transferredTo}
                                        onChange={(e) => setTransferredTo(e.target.value)}
                                    >
                                        <option value="">Select Receiving Hospital</option>
                                        <option value="Concord">Concord</option>
                                        <option value="Campbell">Campbell</option>
                                        <option value="Dublin">Dublin</option>
                                        <option value="Redwood City">Redwood City</option>
                                        <option value="San Francisco">San Francisco</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="transferredBy">
                                    <Form.Label>Transferred By: </Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={transferredBy}
                                        onChange={(e) => setTransferredBy(e.target.value)}
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
