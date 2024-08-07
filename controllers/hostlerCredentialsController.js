const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const HostlerCredentials = require('../models/HostlerCredentials');

// create crediantials
exports.createHostler = async (req, res) => {
    try {
        const { rollNo, password } = req.body;
        console.log(rollNo,password)

        if (!rollNo || !password) {
            return res.status(400).json({ message: 'Roll number and password are required' });
        }

        // Check if the roll number already exists
        const existingHostler = await HostlerCredentials.findOne({ rollNo });
        if (existingHostler) {
            return res.status(400).json({ message: 'Roll number already exists' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const hostler = new HostlerCredentials({
            rollNo,
            password: hashedPassword
        });
        console.log(hostler)

        await hostler.save();
        res.status(201).json({ message: 'Hostler created successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Read all hostlers
exports.getAllHostlers = async (req, res) => {
    try {
        const hostlers = await HostlerCredentials.find();
        res.status(200).json(hostlers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a hostler's password by rollNo
exports.updateHostlerPassword = async (req, res) => {
    try {
        const { rollNo } = req.params;
        const { newPassword } = req.body;

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const hostler = await HostlerCredentials.findOneAndUpdate(
            { rollNo },
            { password: hashedPassword },
            { new: true }
        );

        if (!hostler) return res.status(404).json({ message: 'Hostler not found' });
        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a hostler by rollNo
exports.deleteHostler = async (req, res) => {
    try {
        const { rollNo } = req.params;
        const hostler = await HostlerCredentials.findOneAndDelete({ rollNo });

        if (!hostler) return res.status(404).json({ message: 'Hostler not found' });
        res.status(200).json({ message: 'Hostler deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Hostler login
exports.login = async (req, res) => {
    try {
        const { rollNo, password } = req.body;
        const hostler = await HostlerCredentials.findOne({ rollNo });

        if (!hostler) return res.json({ message: 'Invalid Roll Number or Password' });

        const isMatch = await bcrypt.compare(password, hostler.password);
        if (!isMatch) return res.json({ message: 'Invalid Roll Number or Password' });

        const token = jwt.sign({ id: hostler._id, rollNo: hostler.rollNo }, 'your_jwt_secret', { expiresIn: '1m' });
        res.status(200).json({success:true, token });
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Forgot password (send reset link or token)
exports.forgotPassword = async (req, res) => {
    // Placeholder for actual implementation
    // Normally, you'd send a reset link to the hostler's email
    res.status(200).json({ message: 'Password reset link sent (this is a placeholder)' });
};
