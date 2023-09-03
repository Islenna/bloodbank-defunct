import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate as navigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { AuthProvider, useAuth } from './context/AuthContext';
import PetForm from './components/PetForm';
import PetCard from './components/PetCard';
import PetEdit from './components/PetEdit';
import OwnerForm from './components/OwnerForm';
import OwnerList from './components/OwnerList';
import OwnerCard from './components/OwnerCard';
import OwnerEdit from './components/OwnerEdit';
import ClinicSearch from './components/ClinicSearch';
import BloodFinder from './components/BloodFinder';
import Strays from './components/Strays';
import LogAndReg from './components/LogAndReg';
import UserList from './components/UserList';
import InventoryList from './components/InventoryList';
import InventoryForm from './components/InventoryForm';
import InventoryCard from './components/InventoryCard';
import CustomNavbar from './components/CustomNavbar';

function App() {
  const [isNightMode, setIsNightMode] = useState(false);
  const { userEmail, isLoggedIn, setUserEmail, setIsLoggedIn } = useAuth();

  const handleNightModeToggle = () => {
    setIsNightMode((prevMode) => !prevMode);
  };
  useEffect(() => {
    const checkUserLogin = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/users/loggedin', { withCredentials: true });
            setUserEmail(response.data.email);
            setIsLoggedIn(true);
        } catch (error) {
            console.log(error);
            setUserEmail('');
            setIsLoggedIn(false);
            navigate('/');
        }
    };

    if (isLoggedIn) {
        checkUserLogin();
    }
}, [isLoggedIn, setUserEmail, setIsLoggedIn]);
  return (
    <AuthProvider>
      <div className={`App ${isNightMode ? 'night-mode' : ''}`}>
        
          <CustomNavbar handleNightModeToggle={handleNightModeToggle} userEmail={userEmail} />
          <Routes>
            <Route path="/owners" element={<OwnerList />} />
            <Route path="/" element={<LogAndReg />} />
            <Route path="/owners/new" element={<OwnerForm />} />
            <Route path="/owners/:id" element={<OwnerCard />} />
            <Route path="/owners/edit/:id" element={<OwnerEdit />} />
            <Route path="/pets/new/:id" element={<PetForm />} />
            <Route path="/pets/:id" element={<PetCard />} />
            <Route path="/pets/edit/:id" element={<PetEdit />} />
            <Route path="/pets/strays" element={<Strays />} />
            <Route path="/owners/search" element={<ClinicSearch />} />
            <Route path="/bloodfinder" element={<BloodFinder />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/inventory" element={<InventoryList/>} />
            <Route path="/inventory/new" element={<InventoryForm/>} />
            <Route path="/inventory/:id" element={<InventoryCard/>} />
          </Routes>
      
      </div>
    </AuthProvider>
  );
}

export default App;
