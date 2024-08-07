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
        console.log("updating student.....")
        console.log(req.body)
        data=req.body
        update={
            lastrequesst:data.lastRequesst,
            requestCount:data.requestCount,
            currentStatus:data.currentStatus
        }

        console.log(req.params.RollNo)
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


// Get total count of hostlers and count based on currentStatus
exports.getHostelerCounts = async (req, res) => {
    try {
        console.log("calling the counts function")
        // Total count of hostlers
        const totalHostlers = await Hosteler.countDocuments();

        // Count based on currentStatus
        const statusCounts = await Hosteler.aggregate([
            {
                $group: {
                    _id: "$currentStatus",
                    count: { $sum: 1 }
                }
            }
        ]);

        // Convert the aggregation result into a more readable format
        const counts = {
            total: totalHostlers,
            hostel: 0,
            permission: 0,
            leave: 0
        };

        statusCounts.forEach(status => {
            if (status._id === "HOSTEL") counts.hostel = status.count;
            else if (status._id === "PERMISSION") counts.permission = status.count;
            else if (status._id === "LEAVE") counts.leave = status.count;
        });

        res.status(200).json(counts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get hostlers by hostelId
exports.getHostelersByHostelId = async (req, res) => {
    try {
        const { hostelId } = req.params;
        // Find hostlers by hostelId
        const hostelers = await Hosteler.find({ hostelId });
        if (!hostelers.length) {
            return res.status(404).json({ message: 'No hostlers found for this hostelId' });
        }
        res.status(200).json(hostelers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get count based on hostelId and currentStatus
exports.getHostelerCountsByHostelId = async (req, res) => {
    try {
        const { hostelId } = req.params;

        // Total count of hostlers for the given hostelId
        const totalHostlers = await Hosteler.countDocuments({ hostelId });
        // Count based on currentStatus for the given hostelId
        const statusCounts = await Hosteler.aggregate([
            { $match: { hostelId } }, // Filter by hostelId
            {
                $group: {
                    _id: "$currentStatus",
                    count: { $sum: 1 }
                }
            }
        ]);
        // Convert the aggregation result into a more readable format
        const counts = {
            total: totalHostlers,
            hostel: 0,
            permission: 0,
            leave: 0
        };
        statusCounts.forEach(status => {
            if (status._id === "HOSTEL") counts.hostel = status.count;
            else if (status._id === "PERMISSION") counts.permission = status.count;
            else if (status._id === "LEAVE") counts.leave = status.count;
        });
        res.status(200).json(counts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

