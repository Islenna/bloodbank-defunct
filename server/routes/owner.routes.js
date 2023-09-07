const OwnerController = require('../controllers/owner.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
    
    // Owner routes
    app.get('/api/owners', OwnerController.getAll);
    app.post('/api/owners', OwnerController.createOwner);
    app.get('/api/owners/search', OwnerController.clinicSearch);
    app.get('/api/owners/:id', OwnerController.getOne);
    app.put('/api/owners/:id', OwnerController.updateOwner);
    app.delete('/api/owners/:id', OwnerController.deleteOwnerAndPets);
    app.get('/api/owners/search/:homeClinic', OwnerController.getByClinic);
    
        // Additional routes
    app.get('/api', (req, res) => {
        res.json({ message: 'Hello World' });
    });
};
