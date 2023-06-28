const PetController = require('../controllers/pet.controller');
const OwnerController = require('../controllers/owner.controller');

module.exports = (app) => {
    // Pet routes
    app.get('/api/pets', PetController.getAll);
    app.post('/api/pets', PetController.createPet);
    app.get('/api/pets/:id', PetController.getOne);
    app.put('/api/pets/:id', PetController.updatePet);
    app.delete('/api/pets/:id', PetController.delete);
    app.get('/api/owners/:id/pets', PetController.getAllByOwner);
    app.get('/api/pets/strays', PetController.getStrayPets);
    
    // Owner routes
    app.get('/api/owners/bloodfinder', OwnerController.clinicSearch);
    app.get('/api/owners', OwnerController.getAll);
    app.post('/api/owners', OwnerController.createOwner);
    app.get('/api/owners/:id', OwnerController.getOne);
    app.put('/api/owners/:id', OwnerController.updateOwner);
    app.delete('/api/owners/:id', OwnerController.delete);

    // Additional routes
    app.get('/api', (req, res) => {
        // Your implementation for the '/' route
        res.json({ message: 'Hello World' });
    });

    // ...
};
