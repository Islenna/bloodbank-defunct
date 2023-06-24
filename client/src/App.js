import React from 'react';
import PetForm from './components/PetForm';
import PetCard from './components/PetCard';
import PetEdit from './components/PetEdit';
import OwnerForm from './components/OwnerForm';
import OwnerList from './components/OwnerList';
import OwnerCard from './components/OwnerCard';
import OwnerEdit from './components/OwnerEdit';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/owners" element={<OwnerList />} default />
          <Route path="/owners/new" element={<OwnerForm />} />
          <Route path="/owners/:id" element={<OwnerCard />} />
          <Route path="/owners/edit/:id" element={<OwnerEdit />} />
          <Route path="/pets/new/:id" element={<PetForm />} />
          <Route path="/pets/:id" element={<PetCard />} />
          <Route path="/pets/edit/:id" element={<PetEdit />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;

//ToDo: Fix the form. It breaks when you try to add a pet.
// ToDo: Add a button to the OwnerCard component that will delete the owner.
// ToDo: Add a button to the PetCard component that will delete the pet.
// ToDo: Add a button to the OwnerCard component that will add a pet to the owner.
// ToDo: Add a button to the PetCard component that will add an owner to the pet.
// ToDo: Add a button to the PetCard component that will remove the owner from the pet.
// ToDo: Add a button to the OwnerCard component that will remove the pet from the owner.
// ToDo: Test routes.