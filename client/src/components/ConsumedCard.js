import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Container, Card, Button} from 'react-bootstrap'
import {useParams, useNavigate} from 'react-router-dom'

function ConsumedCard() {

    const [consumed, setConsumed] = useState({});
    const {id} = useParams();
    const navigate = useNavigate();

    const donorID = consumed.donorID;
    const bloodSource = consumed.bloodSource;
    const unitSize = consumed.unitSize;
    const homeClinic = consumed.homeClinic;
    const bloodType = consumed.bloodType;
    const expirationDate = consumed.expirationDate;
    const crossmatchHistory = consumed.crossmatchHistory;
    const consumptionType = consumed.consumptionType;
    const patientID = consumed.patientID;
    const patientName = consumed.patientName;
    const patientLastName = consumed.patientLastName;

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/consumed/${id}`)
            .then((res) => {
                setConsumed(res.data);
                console.log("Patient ID:", patientID);
            })
            .catch((err) => console.log(err));
    }, [])

    const deleteConsumed = () => {
        axios

            .delete(`http://localhost:8000/api/consumed/${id}`)
            .then((res) => {
                console.log(res.data);
                navigate(`/consumed`);
            })
            .catch((err) => console.log(err));
    };

    return (
        <Container>
            <h1>Consumed Information</h1>
            <Card
                style={{
                backgroundColor: '#725846',
                border: 'none',
                borderTop: '10px solid #A9C27E'
            }}
                text="white"
                className="mt-4 p-4">
                <Card.Body>
                    <Card.Title>Consumed Information</Card.Title>
                    <Card.Text>
                        <p>Donor ID: {donorID} </p>
                        <p>Blood Source: {bloodSource}</p>
                        <p>Unit Size: {unitSize}</p>
                        <p>Home Clinic: {homeClinic}</p>
                        <p>Blood Type: {bloodType}</p>
                        <p>Expiration Date: {new Date(expirationDate).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short'
                            })}</p>
                        <p>Crossmatch History: {crossmatchHistory}</p>
                        <p>Consumption Type: {consumptionType}</p>
                        <p>Recipient Information</p>
                        <p>Patient ID: {patientID}</p> 
                        <p>Patient Name: {patientName}</p>
                        <p>Patient Last Name: {patientLastName}</p>

                    </Card.Text>
                    <Button variant="danger" onClick={deleteConsumed}>
                        Delete
                    </Button>
                </Card.Body>
            </Card>

        </Container>        
    )
}

export default ConsumedCard