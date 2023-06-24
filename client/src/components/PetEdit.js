import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

const PetEdit = () => {
    const [pet, setPet] = useState({});
    const [owner, setOwner] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/pets/${id}`)
            .then((res) => {
                setPet(res.data);
                return axios.get(`http://localhost:8000/api/owners/${res.data.owner}`);
            })
            .then((res) => {
                setOwner(res.data);
            })
            .catch((err) => console.log(err));
    }, [id]);

    const submitHandler = (e) => {
        e.preventDefault();

        // Perform validation based on petType and bloodType
        if (
            (pet.petType === 'dog' || pet.petType === 'canine') &&
            (pet.bloodType !== 'DEA 1.1 Positive' && pet.bloodType !== 'DEA 1.1 Negative')
        ) {
            console.log('Invalid bloodType for the selected petType');
            return;
        } else if (
            (pet.petType === 'cat' || pet.petType === 'feline') &&
            (pet.bloodType !== 'A' && pet.bloodType !== 'B' && pet.bloodType !== 'AB')
        ) {
            console.log('Invalid bloodType for the selected petType');
            return;
        }

        axios
            .put(`http://localhost:8000/api/pets/${id}`, pet)
            .then((res) => {
                console.log(res.data);
                navigate(`/pets/${id}`);
            })
            .catch((err) => console.log(err));
    };

    const handleChange = (e) => {
        setPet({ ...pet, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <h1>Edit {pet.petName}'s Information</h1>
            <form onSubmit={submitHandler}>
                <div>
                    <label>Pet Name: </label>
                    <input
                        type="text"
                        name="petName"
                        value={pet.petName || ''}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Pet Type:</label>
                    <select
                        name="petType"
                        value={pet.petType}
                        onChange={handleChange}
                    >
                        <option value="">Select a pet type</option>
                        <option value="dog">Canine</option>
                        <option value="cat">Feline</option>
                    </select>
                </div>
                {pet.petType && (
                    <>
                        <div>
                            <label>Blood Type:</label>
                            <select
                                name="bloodType"
                                value={pet.bloodType || ''}
                                onChange={handleChange}
                            >
                                <option value="">Select a blood type</option>
                                {pet.petType === 'dog' || pet.petType === 'canine' ? (
                                    <>
                                        <option value="DEA 1.1 Positive">DEA 1.1 Positive</option>
                                        <option value="DEA 1.1 Negative">DEA 1.1 Negative</option>
                                    </>
                                ) : pet.petType === 'cat' || pet.petType === 'feline' ? (
                                    <>
                                        <option value="A">A</option>
                                        <option value="B">B</option>
                                        <option value="AB">AB</option>
                                    </>
                                ) : null}
                            </select>
                        </div>
                        <div>
                            <label>Last Donated:</label>
                            <input
                                type="date"
                                name="lastDonated"
                                value={pet.lastDonated || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Labwork Status:</label>
                            <select
                                name="labworkStatus"
                                value={pet.labworkStatus || ''}
                                onChange={handleChange}
                            >
                                <option value="">Select a labwork status</option>
                                <option value="Incomplete">Incomplete</option>
                                <option value="Pending">Pending</option>
                                <option value="Complete">Complete</option>
                            </select>
                        </div>
                        {pet.labworkStatus === 'Complete' && (
                            <div>
                                <label>Date Labwork Completed:</label>
                                <input
                                    type="date"
                                    name="dateLabworkCompleted"
                                    value={pet.dateLabworkCompleted || ''}
                                    onChange={handleChange}
                                />
                            </div>
                        )}
                    </>
                )}
                <div>
                    <label>Description: </label>
                    <input
                        type="text"
                        name="petDescription"
                        value={pet.petDescription || ''}
                        onChange={handleChange}
                    />
                </div>
                <input type="submit" value="Save" />
            </form>
            <Link to={`/owners/${owner._id}`}>Back</Link>
        </div>
    );
};

export default PetEdit;
