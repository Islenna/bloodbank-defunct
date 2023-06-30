import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        // Fetch the logged-in user's email
        axios
            .get('http://localhost:8000/api/users/loggedin', { withCredentials: true })
            .then((res) => {
                setUserEmail(res.data.email);
            })
            .catch(() => {
                navigate('/login'); // Redirect to the login page if not logged in
            });
    }, []);

    const handleLogout = () => {
        // Clear user token and redirect to login page
        axios
            .post('http://localhost:8000/api/users/logout', null, { withCredentials: true })
            .then(() => {
                navigate('/login');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#725846', borderBottom: '10px solid #A9C27E' }}>
            <div className="container">
                <Link to="/owners" className="navbar-brand">
                    Back to Owners
                </Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <span className="nav-link">{userEmail}</span>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-link nav-link" onClick={handleLogout}>
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <div style={{ height: '20px', backgroundColor: '#A9C27E' }}></div>
        </nav>
    );
}
