import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

export default function CustomNavbar(props) {
    const navigate = useNavigate();
    const [isNightMode, setIsNightMode] = useState(false);
    const { userEmail, isLoggedIn, setUserEmail, setIsLoggedIn } = useAuth();
    const [isLoading, setIsLoading] = useState(true); // Add loading state

    useEffect(() => {
        const fetchUserEmail = async () => { // Fetch the user's email
            try {
                const response = await axios.get('http://localhost:8000/api/users/loggedin', { withCredentials: true });
                setUserEmail(response.data.email);
                setIsLoggedIn(true);
            } catch (error) {
                console.error('API Error:', error);
                setUserEmail('');
                setIsLoggedIn(false);
                navigate('/');
            } finally {
                setIsLoading(false);
            }
        };

        if (isLoggedIn) {
            fetchUserEmail(); // Fetch the user's email if they are logged in
        } else {
            // If the user is not logged in, redirect to the home page
            navigate('/');
        }
    }, [isLoggedIn, setUserEmail, setIsLoggedIn, navigate]);

    const handleLogout = () => {
        axios
            .post('http://localhost:8000/api/users/logout', null, { withCredentials: true })
            .then(() => {
                setUserEmail('');
                setIsLoggedIn(false);
                navigate('/');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleNightModeToggle = () => { // Handle the night mode toggle
        setIsNightMode((prevMode) => !prevMode);// Toggle the night mode
        props.handleNightModeToggle();
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#725846', borderBottom: '10px solid #A9C27E' }}>
            <div className="container">
                <Link to="/owners" className="navbar-brand">
                    All Owners
                </Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ml-auto align-items-center">
                        {isLoggedIn && !isLoading && userEmail && ( // If the user is logged in, display their email
                            <li className="nav-item" style={{ marginLeft: '2rem', marginRight: '2rem' }}>
                                <span className="nav-link">{userEmail}</span>
                            </li>
                        )}
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
                                <label className="form-check-label ml-3" htmlFor="flexSwitchCheckChecked" style={{ color: '#FFFFFF' }}>
                                    Night Mode
                                </label>
                            </div>
                        </li>
                        <li className="nav-item">
                            <Link to={`/bloodfinder`}>
                                <Button variant="danger"
                                    style={{
                                        marginLeft: '2rem',
                                        marginRight: '2rem'
                                    }}>Get Blood</Button>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/inventory">
                                <Button variant="primary" className="ml-3"
                                    style={{
                                        marginLeft: '2rem',
                                        marginRight: '2rem'
                                    }}>
                                    Inventory Management
                                </Button>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Button onClick={handleLogout}
                                style={{
                                    marginLeft: '2rem',
                                    marginRight: '2rem'
                                }}>Logout</Button>
                        </li>
                        <li className="nav-item">
                            <Link to={`/inventory/consumed`} className="nav-link">
                                <Button variant="warning"
                                    style={{
                                        marginLeft: '2rem',
                                        marginRight: '2rem'
                                    }}>Analytics</Button>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
