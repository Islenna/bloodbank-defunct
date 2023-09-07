import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Table, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function OwnerList() {
    const [owners, setOwners] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/owners')
            .then((res) => {
                console.log(res);
                setOwners(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const handleDelete = (ownerId) => {
        axios
            .delete(`http://localhost:8000/api/owners/${ownerId}`)
            .then((res) => {
                navigate('/owners');
            })
            .catch((err) => console.log(err));
    };

    return (
        <div>
            <Container className="text-center">
                <h1>Owner List</h1>
                <Card
                    style={{ backgroundColor: '#725846', border: 'none', borderTop: '10px solid #A9C27E' }}
                    text="white"
                    className="mt-4 p-4"
                >
                    <table className="custom-table">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {owners.map((owner, idx) => {
                                return (
                                    <tr key={idx}>
                                        <td>{owner.firstName}</td>
                                        <td>{owner.lastName}</td>
                                        <td>
                                            <Link to={`/owners/${owner._id}`}>
                                                <Button variant="primary">Owner and Pet Details</Button>
                                            </Link>{' '}
                                            <Link to={`/owners/edit/${owner._id}`}>
                                                <Button variant="primary">Edit</Button>
                                            </Link>{' '}
                                            <Link to={`/owners/delete/${owner._id}`}>
                                                <Button
                                                    variant="danger"
                                                    onClick={() => handleDelete(owner._id)}
                                                >
                                                    Delete
                                                </Button>
                                            </Link>

                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </Card>
                <Link to={`/owners/new`}>
                    <Button variant="primary">Add Owner</Button>
                </Link>
                <Link to={`/bloodfinder`}>
                    <Button variant="danger">Get Blood</Button>
                </Link>
            </Container>
        </div>
    );
}
