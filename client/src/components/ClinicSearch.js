import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Form, Table, Button, Card } from 'react-bootstrap';

function ClinicSearch() {
    const [clinics, setClinics] = useState([]);
    const [homeClinic, setHomeClinic] = useState('');

    const searchClinics = (e) => { // search for clinics
        e.preventDefault();
        axios.get(`http://localhost:8000/api/owners/search/${homeClinic}`, { withCredentials: true })
            .then((res) => {
                console.log(res);
                setClinics(res.data);
            })
            .catch((err) => console.log(err));
    }
    const clearForm = () => {
        setHomeClinic('');
        setClinics('');
    };
    return (
        <div>
            <h1> Please select which clinic to collect data from:</h1>
            <Card
                style={{ backgroundColor: '#725846', border: 'none', borderTop: '20px solid #A9C27E' }}
                text="white"
                className="mt-4 p-4"
                >
                <Form onSubmit={searchClinics}
                    text="white"
                    className="mt-4 p-4"
                    >
                    <Form.Group controlId="homeClinic">
                        <Form.Label className="d-block" style={{ color: 'white' }}>Home Clinic</Form.Label>
                        <Form.Control
                            as="select"
                            value={homeClinic}
                            onChange={(e) => setHomeClinic(e.target.value)}
                            required
                            style={{ backgroundColor: 'white', color: 'black' }}
                        >
                            <option value="">Which Clinic Needs Blood?</option>
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

                {clinics.length > 0 ? (
                    <table className="custom-table">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>View Pets</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clinics.map((owner, idx) => {
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
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                ) : (
                    <p>No clinics found.</p>
                )}
            </Card>
            <Button variant="secondary" onClick={clearForm}>
                Clear
            </Button>
            <Link to="/" className="btn btn-primary">
                Back
            </Link>
        </div>
    )
}

export default ClinicSearch