const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AdminLogin = require('../models/AdminLogin');

// Create a new admin
exports.createAdmin = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const admin = new AdminLogin({
            username: req.body.username,
            password: hashedPassword,
        });
        await admin.save();
        res.status(201).json({success:true, message: 'Admin credentials created successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Read all admins
exports.getAllAdmins = async (req, res) => {
    try {
        const admins = await AdminLogin.find();
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an admin by username
exports.updateAdmin = async (req, res) => {
    try {
        const { username } = req.params;
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const admin = await AdminLogin.findOneAndUpdate(
            { username },
            { password: hashedPassword },
            { new: true }
        );
        if (!admin) return res.status(404).json({ message: 'Admin not found' });
        res.status(200).json({ message: 'Admin updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete an admin by username
exports.deleteAdmin = async (req, res) => {
    try {
        const { username } = req.params;
        const admin = await AdminLogin.findOneAndDelete({ username });
        if (!admin) return res.status(404).json({ message: 'Admin not found' });
        res.status(200).json({ message: 'Admin deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Admin login
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const admin = await AdminLogin.findOne({ username });
        if (!admin) return res.status(401).json({ message: 'Invalid username or password' });
        
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid username or password' });
        
        const payload = { id: admin._id, username: admin.username };
        const token = jwt.sign( payload,'jwtPassword', { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Forgot password (send reset link or token)
exports.forgotPassword = async (req, res) => {
    // This is a placeholder for a real implementation
    // Ideally, you'd send a reset link to the admin's email
    res.status(200).json({ message: 'Password reset link sent (this is a placeholder)' });
};
