import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

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
import CustomNavbar from './components/CustomNavbar';

function App() {
  const [isNightMode, setIsNightMode] = useState(false);

  const handleNightModeToggle = () => {
    setIsNightMode((prevMode) => !prevMode);
  };

  return (
    <div className={`App ${isNightMode ? 'night-mode' : ''}`}>
      <Router>
        <CustomNavbar handleNightModeToggle={handleNightModeToggle} />
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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
