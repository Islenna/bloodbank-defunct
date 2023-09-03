const mongoose = require('mongoose');
const OnHandSchema = new mongoose.Schema({
    donorID: { type: String },
    bloodSource: { type: String },
    unitSize: { type: String },
    bloodType: { type: String },
    expirationDate: { type: Date },
    crossmatchHistory: { type: String },
    homeClinic: { type: String },
    isDeleted: { type: Boolean, default: false },
    deletedAt: {type: Date, default: null},
    patientID: { type: String },
    patientName: { type: String },
    patientLastName: { type: String },
}, { timestamps: true });
module.exports = mongoose.model('OnHand',  OnHandSchema);