import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Form, Card, Button, Container, Row, Col } from 'react-bootstrap';

export default function InventoryForm() {

    const [donorID, setDonorID] = useState('');
    const [bloodSource, setBloodSource] = useState('');
    const [unitSize, setUnitSize] = useState('');
    const [bloodType, setBloodType] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [crossmatchHistory, setCrossmatchHistory] = useState('');
    const [validationError, setValidationError] = useState('');
    const [homeClinic, setHomeClinic] = useState('');
    const [productType, setProductType] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    const [formErrors, setFormErrors] = useState({
        donorID: '',
        bloodSource: '',
        unitSize: '',
        bloodType: '',
        expirationDate: '',
        crossmatchHistory: '',
        homeClinic: '',
    });

    const validateForm = () => {
        const errors = {};
        if (!donorID) {
            errors.donorID = 'Donor ID is required';
        }
        if (!bloodSource) {
            errors.bloodSource = 'Blood Source is required';
        }
        if (!unitSize) {
            errors.unitSize = 'Unit Size is required';
        }
        if (!bloodType) {
            errors.bloodType = 'Blood Type is required';
        }
        if (!expirationDate) {
            errors.expirationDate = 'Expiration Date is required';
        }
        setFormErrors(errors);

        return Object.values(errors).every((error) => !error);
    };


    const createInventory = (e) => {
        e.preventDefault();
        console.log('Data to be sent:', {
            donorID,
            bloodSource,
            unitSize,
            bloodType,
            expirationDate,
            crossmatchHistory,
            homeClinic,
            productType
        });

        if (!validateForm()) {
            return;
        }

        axios
            .post(`http://localhost:8000/api/inventory`, {
                donorID,
                bloodSource,
                unitSize,
                bloodType,
                expirationDate,
                crossmatchHistory,
                homeClinic,
                productType
            }, { withCredentials: true })
            .then((res) => {
                console.log('Response:', res);
                navigate(`/inventory`);
            })
            .catch((err) => console.log('Error:', err));
    }

    return (
        <div>
            <Container className="text-center">

                <h1>Inventory Form</h1>
                <Card
                    style={{ backgroundColor: '#725846', border: 'none', borderTop: '10px solid #A9C27E' }}
                    text="white"
                    className="mt-4 p-4"
                >

                    <Form onSubmit={createInventory}>
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

                        <Form.Group controlId="donorID">
                            <Form.Label>Donor ID:</Form.Label>
                            <Form.Control
                                type="text"
                                value={donorID}
                                onChange={(e) => setDonorID(e.target.value)}
                            />
                            {formErrors.donorID && <Form.Text className="text-danger">{formErrors.donorID}</Form.Text>}

                        </Form.Group>
                        <Form.Group controlId="bloodSource">
                            <Form.Label>Blood Source:</Form.Label>
                            <Form.Control
                                type="text"
                                value={bloodSource}
                                onChange={(e) => setBloodSource(e.target.value)}
                            />
                            {formErrors.bloodSource && <Form.Text className="text-danger">{formErrors.bloodSource}</Form.Text>}
                        </Form.Group>
                        <Form.Group controlId="productType">
                            <Form.Label>Product Type:</Form.Label>
                            <Form.Control
                                as="select"
                                value={productType}
                                onChange={(e) => setProductType(e.target.value)}
                            >
                                <option value="">Select a Product Type</option>
                                <option value="PRBC">PRBCs</option>
                                <option value="FFP">FFP</option>
                                <option value="FP">FP</option>
                                <option value="platelets">Platelets</option>
                                <option value="cryo">Cryoprecipitate</option>
                                <option value="alb">Albumin</option>
                                <option value="HBOC">HBOC</option>
                                </Form.Control>
                            </Form.Group>

                        <Form.Group controlId="unitSize">
                            <Form.Label>Unit Size:</Form.Label>
                            <Form.Control
                                as="select"
                                value={unitSize}
                                onChange={(e) => setUnitSize(e.target.value)}
                            >
                                <option value="">Select a Unit Size</option>
                                <option value="50mL">50mL</option>
                                <option value="125mL">125mL</option>
                                <option value="150mL">150mL</option>
                                <option value="250mL">250mL</option>
                                {formErrors.unitSize && <Form.Text className="text-danger">{formErrors.unitSize}</Form.Text>}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="bloodType">
                            <Form.Label style={{ color: 'white' }}>Blood Type:</Form.Label>
                            <Form.Control
                                as="select"
                                value={bloodType}
                                onChange={(e) => setBloodType(e.target.value)}
                            >
                                <option value="">Select a blood type</option>
                                <option value="DEA 1.1 Positive">DEA 1.1 Positive</option>
                                <option value="DEA 1.1 Negative">DEA 1.1 Negative</option>
                                <option value="DEA 4">DEA 4</option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="AB">AB</option>
                                {formErrors.bloodType && <Form.Text className="text-danger">{formErrors.bloodType}</Form.Text>}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="expirationDate">
                            <Form.Label>Expiration Date:</Form.Label>
                            <Form.Control
                                type="date"
                                value={expirationDate}
                                onChange={(e) => setExpirationDate(e.target.value)}
                            />
                            {formErrors.expirationDate && <Form.Text className="text-danger">{formErrors.expirationDate}</Form.Text>}
                        </Form.Group>
                        <Form.Group
                            controlId="crossmatchHistory"
                            value={crossmatchHistory}
                            onChange={(e) => setCrossmatchHistory(e.target.value)}
                        >
                            <Form.Label>Crossmatch History:</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                        <Button variant="success" type="submit">
                            Create Inventory
                        </Button>
                    </Form>
                </Card>
            </Container>
        </div>
    )
}
