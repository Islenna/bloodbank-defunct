const mongoose = require('mongoose');
const OwnerSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    phoneNumber: {type: String},
}, { timestamps: true });
module.exports = mongoose.model('Owner', OwnerSchema);