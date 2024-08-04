// controllers/hostelerController.js
const Hosteler = require('../models/Hostelers');

// Create a new hosteler
exports.createHosteler = async (req, res) => {
    try {
        const hosteler = new Hosteler(req.body);
        await hosteler.save();
        res.status(201).json(hosteler);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// Get all hostelers
exports.getAllHostelers = async (req, res) => {
    
    try {
        const hostelers = await Hosteler.find();
        res.status(200).json(hostelers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single hosteler by RollNo
exports.getHostelerByRollNo = async (req, res) => {
    try {
        console.log(req.params.rollNo )
        const hosteler = await Hosteler.findOne({ rollNo: req.params.RollNo });
        console.log(hosteler)
        
        if (!hosteler) {
            return res.json({ message: 'Hosteler not found' });
        }
        res.status(200).json(hosteler);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Update a hosteler by RollNo
exports.updateHostelerByRollNo = async (req, res) => {
    try {
        const hosteler = await Hosteler.findOneAndUpdate({ rollNo: req.params.RollNo }, req.body, { new: true });
        if (!hosteler) {
            return res.status(404).json({ message: 'Hosteler not found' });
        }
        res.status(200).json({updated:true});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
// Delete a hosteler by RollNo
exports.deleteHostelerByRollNo = async (req, res) => {
    try {
        const hosteler = await Hosteler.findOneAndDelete({ RollNo: req.params.RollNo });
        if (!hosteler) {
            return res.status(404).json({ message: 'Hosteler not found' });
        }
        res.status(200).json({ message: 'Hosteler deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
