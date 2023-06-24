const mongoose = require('mongoose');
const OwnerSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    phoneNumber: { type: String },
    email: {
        type: String,
        match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
        // Regex pattern for email validation
    },
}, { timestamps: true });
module.exports = mongoose.model('Owner', OwnerSchema);