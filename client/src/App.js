import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate as navigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { AuthProvider, useAuth } from './context/AuthContext';
import PetForm from './components/Pet/PetForm';
import PetCard from './components/Pet/PetCard';
import PetEdit from './components/Pet/PetEdit';
import Strays from './components/Pet/Strays';
import OwnerForm from './components/Owner/OwnerForm';
import OwnerList from './components/Owner/OwnerList';
import OwnerCard from './components/Owner/OwnerCard';
import OwnerEdit from './components/Owner/OwnerEdit';
import LogAndReg from './components/LogAndReg/LogAndReg';
import UserList from './components/LogAndReg/UserList';
import InventoryList from './components/Inventory/InventoryList';
import InventoryForm from './components/Inventory/InventoryForm';
import InventoryCard from './components/Inventory/InventoryCard';
import InventoryEdit from './components/Inventory/InventoryEdit';
import InventoryConsume from './components/Inventory/InventoryConsume';
import ClinicSearch from './components/ClinicSearch';
import BloodFinder from './components/BloodFinder';
import ConsumedList from './components/Consumed/ConsumedList';
import ConsumedCard from './components/Consumed/ConsumedCard';
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
          <Route path="/" element={<LogAndReg />} />
          <Route path="/owners" element={<OwnerList />} />
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
          <Route path="/inventory" element={<InventoryList />} />
          <Route path="/inventory/new" element={<InventoryForm />} />
          <Route path="/inventory/:id" element={<InventoryCard />} />
          <Route path="/inventory/edit/:id" element={<InventoryEdit />} />
          <Route path="/inventory/:id/consume" element={<InventoryConsume />} />
          <Route path="/inventory/consumed" element={<ConsumedList />} />
          <Route path="/consumed/:id" element={<ConsumedCard />} />

        </Routes>

      </div>
    </AuthProvider>
  );
}

export default App;
