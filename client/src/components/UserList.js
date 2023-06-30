import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, Container } from 'react-bootstrap';
import Navbar from './Navbar';

export default function UserList() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/users/loggedin', { withCredentials: true })
            .then(() => {
                setIsLoggedIn(true); // User is logged in
                axios
                    .get('http://localhost:8000/api/users', { withCredentials: true })
                    .then((res) => {
                        console.log(res);
                        setUsers(res.data);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch(() => {
                setIsLoggedIn(false); // User is not logged in
                navigate('/login'); // Redirect to the login page
            });
    }, []);

    return (
        <div>
            <Navbar />
            <Container className="text-center">
                {isLoggedIn ? (
                    <>
                        <h1>User List</h1>
                        <Card
                            style={{
                                backgroundColor: '#725846',
                                border: 'none',
                                borderTop: '10px solid #A9C27E',
                            }}
                            text="white"
                            className="mt-4 p-4"
                        >
                            <Card.Title>Users</Card.Title>
                            <Card.Text>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Email</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user, idx) => {
                                            return (
                                                <tr key={idx}>
                                                    <td>{user.email}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </Card.Text>
                        </Card>
                    </>
                ) : null}
            </Container>
        </div>
    );
}
