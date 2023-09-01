const mongoose = require('mongoose');
const OnHandSchema = new mongoose.Schema({
    donorID: { type: String },
    bloodSource: { type: String },
    unitSize: { type: String },
    bloodType: { type: String },
    expirationDate: { type: Date },
    crossmatchHistory: { type: String },
}, { timestamps: true });
module.exports = mongoose.model('OnHand',  OnHandSchema);