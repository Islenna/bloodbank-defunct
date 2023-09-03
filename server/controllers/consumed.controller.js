const OnHand = require('../models/onHand.model');
const ConsumedInventory = require('../models/consumedInventory.model');

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

                // Create a new ConsumedInventory item from the OnHand item
                const consumedItem = new ConsumedInventory(item.toObject());

                // Save the consumedItem to the ConsumedInventory model
                return consumedItem.save();
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
