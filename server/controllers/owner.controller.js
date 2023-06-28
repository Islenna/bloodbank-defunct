const Owner = require('../models/owner.model');
const Pet = require('../models/pet.model')

module.exports.index = (request, response) => {  //We are exporting a key:val pair of index : function
    response.json({     // This is where we're setting the API's response to the requesting client
        message: "Hello World"
    });
}

module.exports.createOwner = (req, res) => {
    Owner.create(req.body)
        .then(owner => res.json(owner))
        .catch(err => res.status(500).json(err));
}

module.exports.getAll = (req, res) => {
    Owner.find({})
        .then(owners => res.json(owners))
        .catch(err => res.json(err));
}

module.exports.getOne = (req, res) => {
    Owner.findOne({ _id: req.params.id })
        .then(owner => res.json(owner))
        .catch(err => res.json(err));
}

module.exports.updateOwner = (request, response) => {
    Owner.findOneAndUpdate({ _id: request.params.id }, request.body, { new: true })
        .then(updatedOwner => response.json(updatedOwner))
        .catch(err => response.json(err))
}

module.exports.delete = (req, res) => {
    Owner.deleteOne({ _id: req.params.id })
        .then(deleteConfirmation => res.json(deleteConfirmation))
        .catch(err => res.json(err));
}

module.exports.getByClinic = (req, res) => {
    Owner.find({ homeClinic: req.params.homeClinic }).exec()
        .then((owners) => res.json(owners))
        .catch((err) => res.json(err))

}

module.exports.clinicSearch = (req, res) => {
    const { homeClinic, bloodType, labworkStatus } = req.query;
    const lastDonatedThreshold = new Date();
    lastDonatedThreshold.setDate(lastDonatedThreshold.getDate() - 28); // Subtract 28 days (4 weeks)

    Owner.find({ homeClinic })
        .populate({
            path: 'pets',
            match: {
                bloodType,
                labworkStatus,
                lastDonated: { $lt: lastDonatedThreshold }
            }
        })
        .exec()
        .then((owners) => {
            // Extract the "path" field from the pets
            const petsData = owners.map(owner => owner.pets.map(pet => pet.path));
            res.json(petsData);
        })
        .catch((err) => res.json(err));
};
