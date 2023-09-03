const mongoose = require('mongoose');

const ConsumedInventorySchema = new mongoose.Schema({
    donorID: { type: String },
    bloodSource: { type: String },
    unitSize: { type: String },
    bloodType: { type: String },
    expirationDate: { type: Date },
    crossmatchHistory: { type: String },
    homeClinic: { type: String },
    // Include any other fields you need
}, { timestamps: true });

module.exports = mongoose.model('ConsumedInventory', ConsumedInventorySchema);