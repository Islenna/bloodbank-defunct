import React, { useState, useEffect } from 'react';
import { Container, Card } from 'react-bootstrap';
import axios from 'axios'; 

function InventoryConsumed() {
    const [consumedInventory, setConsumedInventory] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/inventory/consumed')
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
            <h1>Inventory Consumed</h1>
            <Card
                style={{ backgroundColor: '#725846', border: 'none', borderTop: '10px solid #A9C27E' }}
                text="white"
                className="mt-4 p-4"
            >
                {Array.isArray(consumedInventory) && consumedInventory.length > 0 ? (
                    consumedInventory.map((item) => (
                        <Card.Body key={item._id}>
                            <Card.Title>Inventory Consumed</Card.Title>
                            <Card.Text>
                                <p>Donor ID: {item.donorID}</p>
                                <p>Blood Source: {item.bloodSource}</p>
                                <p>Unit Size: {item.unitSize}</p>
                                <p>Home Clinic: {item.homeClinic}</p>
                                <p>Blood Type: {item.bloodType}</p>
                                <p>Expiration Date: {new Date(item.expirationDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}</p>
                                <p>Crossmatch History: {item.crossmatchHistory}</p>
                            </Card.Text>
                        </Card.Body>
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </Card>
        </Container>
    );
}

export default InventoryConsumed;
