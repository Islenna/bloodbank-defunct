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

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/owners" element={<OwnerList />} default />
          <Route path="/" element={<OwnerList/>}/>
          <Route path="/owners/new" element={<OwnerForm />} />
          <Route path="/owners/:id" element={<OwnerCard />} />
          <Route path="/owners/edit/:id" element={<OwnerEdit />} />
          <Route path="/pets/new/:id" element={<PetForm />} />
          <Route path="/pets/:id" element={<PetCard />} />
          <Route path="/pets/edit/:id" element={<PetEdit />} />
          <Route path="/pets/strays" element={<Strays />} />
          <Route path="/owners/search" element={<ClinicSearch />} />
          <Route path="/bloodfinder" element={<BloodFinder />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;

// //ToDo: The email and phone are kind of just... free-hanging. That's less than ideal. 
//Should there be some sort of login form? Should it be a token thingie? 
//Login and verifications.
//Should those be hidden in some fashion? Could they be?
//I know ezyvet has an API, I could replace the email / password for the ezyvet owner ID / Pet ID.
//Add a query for relevant donors. -- Query by clinic working, need to get info RE: how often / how good are labs? 

//CyberSecurity & ADA compliance.

//Okay, so the search criteron needs to be: By Clinic Location, Has not donated in the last 4 weeks. Pets over 50#, but that should be handled at inprocessing, and labwork complete.