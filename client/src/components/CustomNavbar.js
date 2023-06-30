import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default function CustomNavbar(props) {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState('');
    const [isNightMode, setIsNightMode] = useState(false);

    useEffect(() => {
        // Fetch the logged-in user's email
        axios
            .get('http://localhost:8000/api/users/loggedin', { withCredentials: true })
            .then((res) => {
                setUserEmail(res.data.email);
            })
            .catch(() => {
                navigate('/'); // Redirect to the login page if not logged in
            });
    }, []);

    const handleLogout = () => {
        // Clear user token and redirect to login page
        axios
            .post('http://localhost:8000/api/users/logout', null, { withCredentials: true })
            .then(() => {
                navigate('/');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleNightModeToggle = () => {
        setIsNightMode((prevMode) => !prevMode);
        // Additional logic to handle night mode toggling
        props.handleNightModeToggle(); // Call the prop function from the parent component
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#725846', borderBottom: '10px solid #A9C27E' }}>
            <div className="container">
                <Link to="/owners" className="navbar-brand">
                    Back to Owners
                </Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ml-auto align-items-center">
                        <li className="nav-item">
                            <span className="nav-link">{userEmail}</span>
                        </li>
                        <li className="nav-item">
                            <div className="form-check form-switch">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    role="switch"
                                    id="flexSwitchCheckChecked"
                                    checked={isNightMode}
                                    onChange={handleNightModeToggle}
                                />
                                <label className="form-check-label ml-2" htmlFor="flexSwitchCheckChecked" style={{ color: '#FFFFFF' }}>
                                    Night Mode
                                </label>
                            </div>
                        </li>
                        <li className="nav-item">
                            <Link to={`/bloodfinder`}>
                                <Button variant="danger">Get Blood</Button>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Button onClick={handleLogout}>Logout</Button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
