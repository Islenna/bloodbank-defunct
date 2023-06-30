import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, Container, Form, Row, Col } from 'react-bootstrap';

export default function LogAndReg() {
    const navigate = useNavigate();
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [regEmail, setRegEmail] = useState('');
    const [regPassword, setRegPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [regError, setRegError] = useState('');

    const registrationHandler = (e) => {
        e.preventDefault();

        if (regPassword !== confirmPassword) {
            setRegError('Passwords do not match');
            return;
        }

        const payload = {
            email: regEmail,
            password: regPassword,
            confirmPassword: confirmPassword
        };


        axios.post('http://localhost:8000/api/users/register', payload, { withCredentials: true })
            .then((res) => {
                console.log(res);
                navigate('/owners');
            })
            .catch((err) => {
                setRegError('An error occurred while submitting the form');
                console.log(err);
            });
    };


    const loginHandler = (e) => {
        e.preventDefault();
        const payload = {
            email: loginEmail,
            password: loginPassword,
        };
        axios
            .post('http://localhost:8000/api/users/login',payload, { withCredentials: true })
            .then((res) => {
                console.log(res);
                navigate('/owners');
            })
            .catch((err) => {
                setLoginError('An error occurred while submitting the form');
                console.log(err);
            });
    };

    return (
        <Container className="text-center">
            <h1>Login and Registration</h1>
            <Card
                style={{ backgroundColor: '#725846', border: 'none', borderTop: '10px solid #A9C27E' }}
                text="white"
                className="mt-4 p-4"
            >
                <Row>
                    <Col>
                        <Form onSubmit={loginHandler}>
                            <h2>Login</h2>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    value={loginEmail}
                                    onChange={(e) => setLoginEmail(e.target.value)}
                                    required
                                />
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter password"
                                    value={loginPassword}
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            {loginError && <p className="text-danger">{loginError}</p>}
                            <button type="submit" className="btn btn-primary">Login</button>
                        </Form>
                    </Col>
                    <Col>
                        <Form onSubmit={registrationHandler}>
                            <h2>Registration</h2>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    value={regEmail}
                                    onChange={(e) => setRegEmail(e.target.value)}
                                    required
                                />
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter password"
                                    value={regPassword}
                                    onChange={(e) => setRegPassword(e.target.value)}
                                    required
                                />
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Confirm password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            {regError && <p className="text-danger">{regError}</p>}
                            <button type="submit" className="btn btn-primary">Register</button>
                        </Form>
                    </Col>
                </Row>
            </Card>
        </Container>
    );
}
