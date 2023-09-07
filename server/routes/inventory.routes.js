const {authenticate} = require('../config/jwt.config');
const BloodOnHandController = require('../controllers/onHand.controller');

module.exports = (app) => {
    //Inventory routes
    app.get('/api/inventory', BloodOnHandController.getAll);
    app.get('/api/inventory/:id', BloodOnHandController.getOne);
    app.post('/api/inventory', BloodOnHandController.createInventory);
    app.put('/api/inventory/:id', BloodOnHandController.updateBloodOnHand);
    app.delete('/api/inventory/:id', BloodOnHandController.delete);
    app.get('/api/inventory/search/:homeClinic', BloodOnHandController.getByClinic);
    app.get('/api/inventory/search/:homeClinic/:bloodType', BloodOnHandController.getByClinicAndBloodType);
    app.put('/api/inventory/consume/:id', BloodOnHandController.transfused);
    app.put('/api/inventory/notes/:id', BloodOnHandController.updateCrossmatchHistory);

    //Analytics routes
    app.get('/api/consumed', BloodOnHandController.getConsumed);
    app.get('/api/consumed/:id', BloodOnHandController.getConsumedOne);
    app.delete('/api/consumed/:id', BloodOnHandController.delete);


};