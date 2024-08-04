const Incharge = require('../models/Incharge');

// Create an incharge
exports.createIncharge = async (req, res) => {
    try {
        const { hostelId, name, phoneNo, eid, designation } = req.body;

        const newIncharge = new Incharge({
            hostelId,
            name,
            phoneNo,
            eid,
            designation
        });

        await newIncharge.save();
        res.status(201).json(newIncharge);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Get all incharges
exports.getAllIncharges = async (req, res) => {
    try {
        const incharges = await Incharge.find();
        res.status(200).json(incharges);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Get an incharge by eid
exports.getInchargeByEid = async (req, res) => {
    try {
        const incharge = await Incharge.findOne({ eid: req.params.eid });
        if (!incharge) {
            return res.status(404).json({ message: `Incharge with eid ${req.params.eid} not found.` });
        }
        res.status(200).json(incharge);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Update an incharge by eid
exports.updateInchargeByEid = async (req, res) => {
    try {
        const { eid } = req.params;
        const update = req.body;

        const updatedIncharge = await Incharge.findOneAndUpdate(
            { eid },
            update,
            { new: true }
        );

        if (!updatedIncharge) {
            return res.status(404).json({ message: `Incharge with eid ${eid} not found.` });
        }

        res.status(200).json(updatedIncharge);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Delete an incharge by eid
exports.deleteInchargeByEid = async (req, res) => {
    try {
        const { eid } = req.params;

        const deletedIncharge = await Incharge.findOneAndDelete({ eid });

        if (!deletedIncharge) {
            return res.status(404).json({ message: `Incharge with eid ${eid} not found.` });
        }

        res.status(200).json({ message: `Incharge with eid ${eid} deleted successfully.` });
    } catch (error) {
        res.json({ message: error.message });
    }
};
