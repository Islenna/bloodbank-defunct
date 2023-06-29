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

//I need specific bloodtype pets from a specific clinic: 
module.exports.clinicSearch = (req, res) => {
    // Let's test this out.
    // This is where we'll write the logic for the clinicSearch function.
    
    // First, we'll need to find all the owners that belong to the clinic.
    Owner.find({ homeClinic: req.query.homeClinic }) 
        .then((owners) => {
            // Now that we have all the owners, we need to find all the pets that belong to those owners.
            // We'll use the $in operator to find all the pets that have an owner that is in the owners array.
            Pet.find({ owner: { $in: owners } })
                .then((pets) => {
                    // Now that we have all the pets, we need to filter out the pets that don't have the blood type we're looking for.
                    // We'll use the filter method to do this.
                    const filteredPets = pets.filter((pet) => pet.bloodType === req.query.bloodType);
                    // Finally, we'll send the filtered pets back to the client.
                    res.json(filteredPets);
                })
                .catch((err) => res.json(err));
        })
        .catch((err) => res.json(err)); 
}; 


