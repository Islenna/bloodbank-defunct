const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema(
    {
        petName: { type: String },
        petType: {
            type: String,
            enum: ['dog', 'cat'],
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Owner',
        },
        petDescription: { type: String },
        bloodType: {
            type: String,
            required: true,
            validate: {
                validator: function (value) {
                    if (this.petType === 'dog' || this.petType === 'canine') {
                        // Validate bloodType for dogs/canines
                        return value === 'DEA 1.1 Positive' || value === 'DEA 1.1 Negative';
                    } else if (this.petType === 'cat' || this.petType === 'feline') {
                        // Validate bloodType for cats/felines
                        return value === 'A' || value === 'B' || value === 'AB';
                    }
                    // Invalid petType, return false
                    return false;
                },
                message: 'Invalid bloodType for the given petType',
            },
        },
        lastDonated: { type: Date },
        labworkStatus: {
            type: String,
            enum: ['Incomplete', 'Pending', 'Complete'],
        },
        dateLabworkCompleted: { type: Date },
        homeClinic: { type: String },
    },
    { timestamps: true }
);

PetSchema.pre('findOne', function (next) {
    this.populate('owner', 'homeClinic');
    next();
});

module.exports = mongoose.model('Pet', PetSchema);
