import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

const PetForm = (props) => {
    const [ownerFirstName, setOwnerFirstName] = useState('');
    const [ownerLastName, setOwnerLastName] = useState('');
    const [ownerID, setOwnerID] = useState('');
    const [petName, setPetName] = useState('');
    const [petType, setPetType] = useState('');
    const [petDescription, setPetDescription] = useState('');
    const [bloodType, setBloodType] = useState('');
    const [validationError, setValidationError] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/owners/${id}`)
            .then((res) => {
                console.log(res.data);
                setOwnerFirstName(res.data.firstName);
                setOwnerLastName(res.data.lastName);
                setOwnerID(res.data._id);
            })
            .catch((err) => console.log(err));
    }, [id]);

    const createPet = (e) => {
        e.preventDefault();

        // Perform validation based on petType and bloodType
        if (
            (petType === 'dog' || petType === 'canine') &&
            (bloodType !== 'DEA 1.1 Positive' && bloodType !== 'DEA 1.1 Negative')
        ) {
            setValidationError('Invalid bloodType for the selected petType');
            return;
        } else if (
            (petType === 'cat' || petType === 'feline') &&
            (bloodType !== 'A' && bloodType !== 'B' && bloodType !== 'AB')
        ) {
            setValidationError('Invalid bloodType for the selected petType');
            return;
        }

        // Create the pet
        axios
            .post(`http://localhost:8000/api/pets`, {
                petName,
                petType,
                petDescription,
                owner: ownerID,
                bloodType,
            })
            .then((res) => {
                console.log(res);
                navigate(`/owners/${id}`);
            })
            .catch((err) => console.log(err));
    };

    return (
        <div>
            <h1>Pet form for</h1>
            <h2>
                {ownerFirstName} {ownerLastName}
            </h2>
            <form onSubmit={createPet}>
                <p>
                    <label>Pet Name</label>
                    <br />
                    <input
                        type="text"
                        name="petName"
                        value={petName}
                        onChange={(e) => {
                            setPetName(e.target.value);
                        }}
                    />
                </p>
                <p>
                    <label>Choose a species:</label>
                    <select
                        name="species"
                        id="species"
                        value={petType}
                        onChange={(e) => {
                            setPetType(e.target.value);
                        }}
                    >
                        <option value="default">Select an option</option>
                        <option value="dog">Canine</option>
                        <option value="cat">Feline</option>
                    </select>
                </p>
                <p>
                    <label>Pet Description</label>
                    <br />
                    <input
                        type="text"
                        name="petDescription"
                        value={petDescription}
                        onChange={(e) => {
                            setPetDescription(e.target.value);
                        }}
                    />
                </p>
                {petType && (
                    <div>
                        <label>Blood Type:</label>
                        <select
                            value={bloodType}
                            onChange={(e) => {
                                setBloodType(e.target.value);
                                setValidationError('');
                            }}
                        >
                            <option value="">Select a blood type</option>
                            {petType === 'dog' || petType === 'canine' ? (
                                <>
                                    <option value="DEA 1.1 Positive">DEA 1.1 Positive</option>
                                    <option value="DEA 1.1 Negative">DEA 1.1 Negative</option>
                                </>
                            ) : petType === 'cat' || petType === 'feline' ? (
                                <>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="AB">AB</option>
                                </>
                            ) : null}
                        </select>
                    </div>
                )}
                {validationError && <p>{validationError}</p>}
                <input type="submit" />
            </form>
            <Link to={`/owners/${id}`}>Back</Link>
        </div>
    );
};

export default PetForm;
