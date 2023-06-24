const Owner = require('../models/owner.model');

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
    Owner.findOne({_id: req.params.id})
    .then(owner => res.json(owner))
    .catch(err => res.json(err));
}

module.exports.updateOwner = (request, response) => {
    Owner.findOneAndUpdate({_id: request.params.id}, request.body, {new:true})
        .then(updatedOwner => response.json(updatedOwner))
        .catch(err => response.json(err))
}

module.exports.delete = (req, res) => {
    Owner.deleteOne({_id: req.params.id})
    .then(deleteConfirmation => res.json(deleteConfirmation))
    .catch(err => res.json(err));
}
