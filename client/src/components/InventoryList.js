import React, { useState } from 'react'
import axios from 'axios'
import { Container, Card, Form, Row, Col, Button } from 'react-bootstrap'
import { Link, useParams, useNavigate } from 'react-router-dom';


function InventoryList() {

    const [inventory, setInventory] = useState([])
    const [homeClinic, setHomeClinic] = useState('')
    const [errors, setErrors] = useState([])
    const [matchingBlood, setMatchingBlood] = useState([])
    const navigate = useNavigate();


    const onSubmitHandler = (e) => {
        e.preventDefault()
        axios
        .get(`http://localhost:8000/api/inventory/search/${homeClinic}`)
        .then((res) => {
            console.log(res.data);
            setMatchingBlood(res.data);
        })
        .catch((err) => console.log(err));
};


    return (
        <Container className="text-center">
            <h1>Inventory List</h1>
            <Card
                style={{ backgroundColor: '#725846', border: 'none', borderTop: '10px solid #A9C27E' }}
                text="white"
                className="mt-4 p-4"
            >
                <Form onSubmit={onSubmitHandler}>
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
                    <Button type="submit">Search</Button>
                </Form>

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
                                    Name
                                </th>
                                <th scope="col">Unit Size</th>
                                <th scope="col">Expiration Date</th>
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
                                        <Button
                                            variant="success"
                                            onClick={() => navigate(`/inventory/${blood._id}`)}
                                        >
                                            View
                                        </Button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>

                ) : (
                    <p>No blood on hand.</p>
                )}

            </Card>
            <Button variant="primary" onClick={() => navigate(`/inventory/new`)}>New Inventory</Button>
        </Container>
    )
}

export default InventoryList