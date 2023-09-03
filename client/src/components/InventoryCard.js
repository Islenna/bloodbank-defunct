import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Container, Card, Button } from 'react-bootstrap'
import {useParams, useNavigate} from 'react-router-dom'

function InventoryCard() {

    const [inventory, setInventory] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    const donorID = inventory.donorID;
    const bloodSource = inventory.bloodSource;
    const unitSize = inventory.unitSize;
    const homeClinic = inventory.homeClinic;
    const bloodType = inventory.bloodType;
    const expirationDate = inventory.expirationDate;
    const crossmatchHistory = inventory.crossmatchHistory;

    const deleteInventory = () => {
        axios
            .delete(`http://localhost:8000/api/inventory/${id}`)
            .then((res) => {
                console.log(res.data);
                navigate(`/inventory`);
            })
            .catch((err) => console.log(err));
    };


    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/inventory/${id}`)
            .then((res) => {
                setInventory(res.data);
            })
            .catch((err) => console.log(err));
    }, [])


    return (
        <Container>
            <h1>Inventory Information</h1>
            <Card
                style={{ backgroundColor: '#725846', border: 'none', borderTop: '10px solid #A9C27E' }}
                text="white"
                className="mt-4 p-4"
            >
                <Card.Body>
                    <Card.Title>Inventory Information</Card.Title>
                    <Card.Text>
                        <p>Donor ID: {donorID} </p>
                        <p>Blood Source: {bloodSource}</p>
                        <p>Unit Size: {unitSize}</p>
                        <p>Home Clinic: {homeClinic}</p>
                        <p>Blood Type: {bloodType}</p>
                        <p>Expiration Date: {new Date(expirationDate).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                })}
                                                </p>
                        <p>Crossmatch History: {crossmatchHistory}</p>
                    </Card.Text>
                </Card.Body>
            </Card>
            <Button onClick={() => navigate(`/inventory/edit/${id}`)}>Edit</Button>
            <Button variant="danger" onClick={deleteInventory}>Delete</Button>
        </Container>

    )
}

export default InventoryCard