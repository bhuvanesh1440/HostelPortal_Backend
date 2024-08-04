// controllers/hostelerController.js
const Hosteler = require('../models/Hostelers');

// Create a new hosteler
exports.createHosteler = async (req, res) => {
    try {
        const hosteler = new Hosteler(req.body);
        await hosteler.save();
        res.status(201).json(hosteler);
    } catch (error) {
        res.json({ message: error.message });
    }
};


// Get all hostelers
exports.getAllHostelers = async (req, res) => {
    
    try {
        const hostelers = await Hosteler.find();
        res.status(200).json(hostelers);
    } catch (error) {
        res.json({ message: error.message });
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
        res.json({ message: error.message });
    }
};


// Get hostlers by filter criteria
exports.getFilteredHostlers = async (req, res) => {
    try {
        const { hostelId, college, year, branch } = req.body;

        // Create an object to store the filter criteria
        let filter = {};

        // Add criteria to the filter object if they are provided
        if (hostelId && hostelId.toUpperCase() !== "ALL") filter.hostelId = hostelId;
        if (college && college.toUpperCase() !== "ALL") filter.college = college;
        if (year && year.toUpperCase() !== "ALL") filter.year = parseInt(year); 
        if (branch && branch.toUpperCase() !== "ALL") filter.branch = branch;
        console.log(filter)

        // Query the database with the filter criteria
        const hostlers = await Hosteler.find(filter);

        // Return the results
        res.status(200).json(hostlers);
    } catch (error) {
        console.error("Error fetching filtered hostlers:", error);
        res.json({ message: "Server error. Please try again later." });
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
        res.json({ message: error.message });
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
        res.json({ message: error.message });
    }
};
