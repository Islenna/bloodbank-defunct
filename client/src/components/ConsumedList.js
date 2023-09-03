import React, { useState, useEffect } from 'react';
import { Container, Card, Table, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ConsumedList() {
    const [consumedInventory, setConsumedInventory] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/consumed') // Fetch data from the /api/consumed endpoint
            .then((res) => {
                console.log(res.data);
                setConsumedInventory(res.data);
            })
            .catch((error) => {
                console.error('Error fetching consumed data:', error);
            });
    }, []);

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
                {Array.isArray(consumedInventory) && consumedInventory.length > 0 ? (
                    <table
                    style={{
                        width: '75%',
                        margin: '0 auto',
                        backgroundColor: '#725846',
                        tableLayout: 'fixed',}}>
                        <thead>
                            <tr style={{ backgroundColor: '#A9C27E', color: '#000000' }}>
                                <th>Date Consumed</th>
                                <th>Donor ID</th>
                                <th>Reason</th>
                                <th>Clinic</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {consumedInventory.map((item) => (
                                <tr key={item._id}>
                                    <td>
                                        {new Date(item.createdAt).toLocaleDateString(
                                            'en-US',
                                            {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                            }
                                        )}
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
