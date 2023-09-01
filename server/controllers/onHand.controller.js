const onHand = require('../models/onHand.model');


module.exports.createOnHand = (req, res) => {
    console.log('Creating a new onHand:', req.body);
    onHand.create(req.body)
        .then(onHand => res.json(onHand))
        .catch(err => res.status(400).json(err));
}

module.exports.getAll = (req, res) => {
    onHand.find({})
        .then(onHand => res.json(onHand))
        .catch(err => res.json(err));
}

module.exports.getOne = (req, res) => {
    onHand.findOne({ _id: req.params.id })
        .then(onHand => {
            res.json(onHand);
        })
        .catch(err => res.json(err));
}

module.exports.getAllByClinic = (req, res) => {
    onHand.find({ homeClinic: req.params.homeClinic })
        .then(onHand => res.json(onHand))
        .catch(err => res.json(err));
}
