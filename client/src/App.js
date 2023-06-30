import React from 'react';
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

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/owners" element={<OwnerList />} />
          <Route path="/" element={<LogAndReg/>}/>
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
      </BrowserRouter>
    </div>
  );
}
export default App;

// //ToDo: The email and phone are kind of just... free-hanging. That's less than ideal.  They're hanging behind a required domain, so that's good.
//Should there be some sort of login form? Should it be a token thingie?  -- It's both! 
//I know ezyvet has an API, I could replace the email / password for the ezyvet owner ID / Pet ID.

//CyberSecurity & ADA compliance.
