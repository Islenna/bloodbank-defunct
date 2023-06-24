import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';

const OwnerForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');

    const onSubmitHandler = (e) => {
        e.preventDefault();

        axios
            .post('http://localhost:8000/api/owners', {
                firstName,
                lastName,
                phoneNumber,
                email
            })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    };

    return (
        <Container className="text-center">
            <h2>New Owner</h2>
            <Form onSubmit={onSubmitHandler}>
                <Form.Group controlId="formFirstName">
                    <Form.Label className="d-block">First Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="firstName"
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName}
                        placeholder="Enter first name"
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formLastName">
                    <Form.Label className="d-block">Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="lastName"
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                        placeholder="Enter last name"
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formPhoneNumber">
                    <Form.Label className="d-block">Phone Number</Form.Label>
                    <Form.Control
                        type="text"
                        name="phoneNumber"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        value={phoneNumber}
                        placeholder="Enter phone number"
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formEmail">
                    <Form.Label className="d-block">Email</Form.Label>
                    <Form.Control
                        type="text"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder="Enter email"
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <Link to={`/owners`}>Back</Link>
        </Container>
    );
};

export default OwnerForm;
