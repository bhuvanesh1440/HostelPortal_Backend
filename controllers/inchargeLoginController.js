const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const InchargeLogin = require('../models/InchargeLogin');

// Create a new incharge (admin)
exports.createIncharge = async (req, res) => {
    try {
        const { eid, password } = req.body;

        // Check if the employee ID already exists
        const existingIncharge = await InchargeLogin.findOne({ eid });
        if (existingIncharge) {
            return res.status(400).json({ message: 'Employee ID already exists' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        const incharge = new InchargeLogin({
            eid,
            password: hashedPassword,
        });

        await incharge.save();
        res.status(201).json({ message: 'Incharge created successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Read all incharges (admins)
exports.getAllIncharges = async (req, res) => {
    try {
        const incharges = await InchargeLogin.find();
        res.status(200).json(incharges);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an incharge's password by eid
exports.updateInchargePassword = async (req, res) => {
    try {
        const { eid } = req.params;
        const { newPassword } = req.body;

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const incharge = await InchargeLogin.findOneAndUpdate(
            { eid },
            { password: hashedPassword },
            { new: true }
        );

        if (!incharge) return res.status(404).json({ message: 'Incharge not found' });
        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete an incharge by eid
exports.deleteIncharge = async (req, res) => {
    try {
        const { eid } = req.params;
        const incharge = await InchargeLogin.findOneAndDelete({ eid });

        if (!incharge) return res.status(404).json({ message: 'Incharge not found' });
        res.status(200).json({ message: 'Incharge deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Incharge login
exports.login = async (req, res) => {
    try {
        const { eid, password } = req.body;
        const incharge = await InchargeLogin.findOne({ eid });

        if (!incharge) return res.status(401).json({ message: 'Invalid Employee ID or Password' });

        const isMatch = await bcrypt.compare(password, incharge.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid Employee ID or Password' });

        const token = jwt.sign({ id: incharge._id, eid: incharge.eid }, 'your_jwt_secret', { expiresIn: '1h' });
        res.status(200).json({success:true, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Forgot password (send reset link or token)
exports.forgotPassword = async (req, res) => {
    // Placeholder for actual implementation
    // Normally, you'd send a reset link to the incharge's email
    res.status(200).json({ message: 'Password reset link sent (this is a placeholder)' });
};
