import React, { useState } from 'react';
import axios from 'axios';

function BloodFinder() {
    const [homeClinic, setHomeClinic] = useState('');
    const [bloodType, setBloodType] = useState('');
    const [pets, setPets] = useState([]);

    const searchPets = (e) => {
        e.preventDefault();
        axios
            .get('http://localhost:8000/api/owners/bloodfinder', {
                params: {
                    homeClinic: homeClinic,
                    bloodType: bloodType,
                },
            })
            .then((res) => {
                console.log(res.data);
                setPets(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
            <h1>Blood Finder</h1>
            <form onSubmit={searchPets}>
                <div>
                    <label htmlFor="homeClinic">Home Clinic:</label>
                    <select
                        id="homeClinic"
                        value={homeClinic}
                        onChange={(e) => setHomeClinic(e.target.value)}
                    >
                        <option value="">Select Home Clinic</option>
                        <option value="Concord">Concord</option>
                        <option value="San Francisco">San Francisco</option>
                        {/* Add more options for other clinics */}
                    </select>
                </div>
                <div>
                    <label htmlFor="bloodType">Blood Type:</label>
                    <select
                        id="bloodType"
                        value={bloodType}
                        onChange={(e) => setBloodType(e.target.value)}
                    >
                        <option value="">Select Blood Type</option>
                        <option value="B">B</option>
                        {/* Add more options for other blood types */}
                    </select>
                </div>
                <button type="submit">Search</button>
            </form>

            {pets.length > 0 ? (
                <div>
                    <h2>List of Pets</h2>
                    <ul>
                        {pets.map((pet) => (
                            <li key={pet._id}>{pet.petName}</li>
                        ))}
                    </ul>
                </div>
            ) : null}
        </div>
    );
}
export default BloodFinder