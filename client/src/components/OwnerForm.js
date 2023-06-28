import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';

const OwnerForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [homeClinic, setHomeClinic] = useState('');
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return emailRegex.test(email);
    };

    const validatePhoneNumber = (phoneNumber) => {
        const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        return phoneRegex.test(phoneNumber);
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setEmailError('Invalid email address');
            return;
        }

        if (!validatePhoneNumber(phoneNumber)) {
            setPhoneNumberError('Invalid phone number');
            return;
        }

        axios
            .post('http://localhost:8000/api/owners', {
                firstName,
                lastName,
                phoneNumber,
                email,
                homeClinic
            })
            .then((res) => console.log(res))
            .then(() => navigate('/owners'))
            .catch((err) => console.log(err));
    };

    return (
        <Container className="text-center" style={{ backgroundColor: '#725846', color: 'white', padding: '20px' }}>
            <h2>New Owner</h2>
            <Form onSubmit={onSubmitHandler}>
                <Form.Group controlId="formFirstName">
                    <Form.Label className="d-block" style={{ color: 'white' }}>First Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="firstName"
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName}
                        placeholder="Enter first name"
                        required
                        style={{ backgroundColor: 'white', color: 'black' }}
                    />
                </Form.Group>
                <Form.Group controlId="formLastName">
                    <Form.Label className="d-block" style={{ color: 'white' }}>Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="lastName"
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                        placeholder="Enter last name"
                        required
                        style={{ backgroundColor: 'white', color: 'black' }}
                    />
                </Form.Group>
                <Form.Group controlId="formPhoneNumber">
                    <Form.Label className="d-block" style={{ color: 'white' }}>Phone Number</Form.Label>
                    <Form.Control
                        type="text"
                        name="phoneNumber"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        value={phoneNumber}
                        placeholder="Enter phone number"
                        required
                        style={{ backgroundColor: 'white', color: 'black' }}
                    />
                    {phoneNumberError && <p style={{ color: 'red' }}>{phoneNumberError}</p>}
                </Form.Group>
                <Form.Group controlId="formEmail">
                    <Form.Label className="d-block" style={{ color: 'white' }}>Email</Form.Label>
                    <Form.Control
                        type="text"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder="Enter email"
                        required
                        style={{ backgroundColor: 'white', color: 'black' }}
                    />
                    {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
                </Form.Group>
                
                <Form.Group controlId="homeClinic">
                    <Form.Label className="d-block" style={{ color: 'white' }}>Home Clinic</Form.Label>
                    <Form.Control
                        as="select"
                        value={homeClinic}
                        onChange={(e) => setHomeClinic(e.target.value)}
                        required
                        style={{ backgroundColor: 'white', color: 'black' }}
                        >
                    <option value="">Please select your home clinic.</option>
                    <option value="Concord">Concord</option>
                    <option value="Campbell">Campbell</option>
                    <option value="Dublin">Dublin</option>
                    <option value="Redwood City">Redwood City</option>
                    <option value="San Francisco">San Francisco</option>
                    </Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <Link to={`/owners`} style={{ color: 'white', textDecoration: 'none' }}>Back</Link>
        </Container>
    );
};

export default OwnerForm;

//Add Home Clinic & finish building out.