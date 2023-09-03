const OnHand = require('../models/onHand.model');

module.exports.createInventory = (req, res) => {
    console.log('Adding bag to inventory:', req.body);
    OnHand.create(req.body)
        .then(onHand => res.json(onHand))
        .catch(err => res.status(400).json(err));
}

module.exports.getAll = (req, res) => {
    OnHand.find({})
        .then(onHand => res.json(onHand))
        .catch(err => res.json(err));
}

module.exports.getOne = (req, res) => {
    OnHand.findOne({ _id: req.params.id })
        .then(onHand => {
            res.json(onHand);
        })
        .catch(err => res.json(err));
}

module.exports.getByClinic = (req, res) => {
    const { homeClinic } = req.params;
    console.log('homeClinic:', homeClinic);

    OnHand.find({ homeClinic })
        .then(onHand => {
            console.log('onHand data:', onHand);
            res.json(onHand);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json(err);
        });
}

module.exports.updateBloodOnHand = (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    OnHand.findByIdAndUpdate(id, updateData, { new: true })
        .then(updatedBlood => {
            if (!updatedBlood) {
                return res.status(404).json({ message: 'Blood inventory not found' });
            }
            res.json(updatedBlood);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Server error' });
        });
};

module.exports.delete = (req, res) => {
    const { id } = req.params;

    OnHand.findByIdAndRemove(id)
        .then(deletedBlood => {
            if (!deletedBlood) {
                return res.status(404).json({ message: 'Blood inventory not found' });
            }
            res.json(deletedBlood);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Server error' });
        });
};

module.exports.getByClinic = (req, res) => {
    const { homeClinic } = req.params;
    console.log('homeClinic:', homeClinic);

    OnHand.find({ homeClinic })
        .then(onHand => {
            console.log('onHand data:', onHand);
            res.json(onHand);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json(err);
        });
};

module.exports.getByClinicAndBloodType = (req, res) => {
    const { homeClinic, bloodType } = req.params;
    console.log('homeClinic:', homeClinic);
    console.log('bloodType:', bloodType);

    OnHand.find({ homeClinic, bloodType })
        .then(onHand => {
            console.log('onHand data:', onHand);
            res.json(onHand);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json(err);
        });
};

module.exports.transfused = (req, res) => {
    const { id } = req.params;
    const { consumptionType, recipient, patientId, patientName, patientLastName } = req.body;

    OnHand.findById(id)
        .then((item) => {
            if (!item) {
                return res.status(404).json({ message: 'Inventory item not found' });
            }

            item.isDeleted = true;
            item.deletedAt = new Date();
            item.consumptionType = consumptionType;

            if (consumptionType === 'Successfully Transfused') {
                item.recipient = recipient;
                item.patientId = patientId;
                item.patientName = patientName;
                item.patientLastName = patientLastName;
            }

            return item.save();
        })
        .then((updatedItem) => {
            res.json(updatedItem);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: 'Server error' });
        });
};

module.exports.getConsumed = (req, res) => {
    OnHand.find({ isDeleted: true })
        .then((consumedItems) => {
            res.json(consumedItems);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: 'Server error' });
        });
};