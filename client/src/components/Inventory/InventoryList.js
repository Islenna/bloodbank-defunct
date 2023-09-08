import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


function InventoryList() {
    const [inventory, setInventory] = useState([]);
    const [homeClinic, setHomeClinic] = useState('');
    const [errors, setErrors] = useState([]);
    const [matchingBlood, setMatchingBlood] = useState([]);
    const [bloodConsumed, setBloodConsumed] = useState([]);
    const [searchClicked, setSearchClicked] = useState(false);
    const [onHoldStatus, setOnHoldStatus] = useState({});
    const navigate = useNavigate();

    const calculateCatUsageLast30 = () => {
        let totalUsed = 0;
        bloodConsumed.forEach((item) => {
            if (['A', 'B'].includes(item.bloodType)) {
                totalUsed += parseInt(item.unitSize);
            }
        });
        return totalUsed;
    };

    const calculateDogUsageLast30 = () => {
        let totalUsed = 0;
        bloodConsumed.forEach((item) => {
            if (['DEA 1.1 Positive', 'DEA 1.1 Negative'].includes(item.bloodType)) {
                totalUsed += parseInt(item.unitSize);
            }
        });
        return totalUsed;
    };

    const onHold = (id) => {
        const currentOnHoldStatus = onHoldStatus[id];
    
        setOnHoldStatus((prevOnHoldStatus) => ({
            ...prevOnHoldStatus,
            [id]: !currentOnHoldStatus,
        }));
    
        axios
            .put(`http://localhost:8000/api/inventory/${id}`, {
                isOnHold: !currentOnHoldStatus, 
            }, { withCredentials: true })
            .then((res) => {
                console.log('Updated onHoldStatus:', {
                    ...onHoldStatus,
                    [id]: !currentOnHoldStatus,
                });
    
                axios
                    .get(`http://localhost:8000/api/inventory/search/${homeClinic}`, { withCredentials: true })
                    .then((res) => {
                        const filteredBlood = res.data.filter((blood) => !blood.isDeleted);
                        setMatchingBlood(filteredBlood);
                        setBloodConsumed(res.data.filter((blood) => blood.isDeleted));
                    })
                    .catch((err) => {
                        console.log('Error fetching updated data:', err);
                    });
            })
            .catch((err) => {
                console.log('Error:', err);
                setOnHoldStatus((prevOnHoldStatus) => ({
                    ...prevOnHoldStatus,
                    [id]: currentOnHoldStatus,
                }));
            });
    };




    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios
            .get(`http://localhost:8000/api/inventory/search/${homeClinic}`, { withCredentials: true })
            .then((res) => {
                const filteredBlood = res.data.filter((blood) => !blood.isDeleted);
                setMatchingBlood(filteredBlood);
                setBloodConsumed(res.data.filter((blood) => blood.isDeleted));
                setSearchClicked(true);

                const updatedOnHoldStatus = {};
                filteredBlood.forEach((blood) => {
                    updatedOnHoldStatus[blood._id] = blood.isOnHold;
                });
                setOnHoldStatus(updatedOnHoldStatus);
            })
            .catch((err) => console.log(err));
    };

    return (
        <Container className="text-center">
            <h1>Inventory Manager</h1>
            <Card
                style={{
                    backgroundColor: '#725846',
                    border: 'none',
                    borderTop: '10px solid #A9C27E',
                }}
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
                {searchClicked && (
                    <div>
                        <p>Total Volume of Consumed Cat Blood (Last 30 Days): {calculateCatUsageLast30()} mL</p>
                        <p>Total Volume of Consumed Dog Blood (Last 30 Days): {calculateDogUsageLast30()} mL</p>
                    </div>
                )}
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
                                <th scope="col">Blood Type</th>
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
                                        {blood.bloodType}
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
                                        {blood.onHold ? (
                                            <Button
                                                variant="warning"
                                                onClick={() => onHold(blood._id)}
                                            >
                                                On Hold
                                            </Button>
                                            
                                        ) : (
                                            <Button
                                                variant="primary"
                                                onClick={() => onHold(blood._id)}
                                            >
                                                Place on Hold
                                            </Button>
                                        )}
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                ) : (
                    <p>Search results are returned here.</p>
                )}
            </Card>
            <Button variant="primary" onClick={() => navigate(`/inventory/new`)}>
                New Inventory
            </Button>
        </Container>
    );
}

export default InventoryList;
