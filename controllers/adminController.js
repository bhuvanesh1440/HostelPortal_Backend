// controllers/adminController.js
const Admin = require('../models/Admin');

// Create an admin
exports.createAdmin = async (req, res) => {
    try {
        const admin = new Admin(req.body);
        await admin.save();
        res.status(201).send(admin);
    } catch (error) {
        console.error('Error creating admin:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Check if admin exists
      const admin = await Admin.findOne({ username });
  
      if (!admin) {
        return res.status(404).json({ success: false, message: 'Admin not found' });
      }
  
      // Validate password
      if(admin.password !==password){
        return res.status(404).json({ success: false, message: 'Password is incorrect'})
      }
  
      // If username and password are correct, return success
      console.log("success")
      res.status(200).json({ success: true, message: 'Login successful' });
  
    } catch (error) {
      console.error('Error logging in admin:', error);
      res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
  };

// Get all admins
exports.getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find();
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single admin by username
exports.getAdminByUsername = async (req, res) => {
    try {
        const admin = await Admin.findOne({ username: req.params.username });
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an admin by username
exports.updateAdminByUsername = async (req, res) => {
    try {
        const admin = await Admin.findOneAndUpdate({ username: req.params.username }, req.body, { new: true });
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.status(200).json(admin);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// Delete an admin by username
exports.deleteAdminByUsername = async (req, res) => {
    try {
        const admin = await Admin.findOneAndDelete({ username: req.params.username });
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.status(200).json({ message: 'Admin deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
