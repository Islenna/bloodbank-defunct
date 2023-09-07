import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Strays = () => {
    const [strayPets, setStrayPets] = useState([]);

    useEffect(() => {
        fetchStrayPets();
    }, []);

    const fetchStrayPets = () => {
        axios
            .get('http://localhost:8000/api/pets/strays')
            .then((res) => {
                setStrayPets(res.data);
            })
            .catch((err) => console.log(err));
    };

    return (
        <div>
            <h2>Stray Pets</h2>
            {strayPets.length > 0 ? (
                <ul>
                    {strayPets.map((pet) => (
                        <li key={pet._id}>{pet.petName}</li>
                    ))}
                </ul>
            ) : (
                <p>No stray pets found.</p>
            )}
        </div>
    );
};

export default Strays;
//I don't know that this is necessary to elimatinate pets who somehow get estranged from their OwnerIds, but it's here.