const express = require('express');
const router = express.Router();
const adminLoginController = require('../controllers/adminLoginController');

// Create a new admin
router.post('/create', adminLoginController.createAdmin);
// Get all admins
router.get('/getAll', adminLoginController.getAllAdmins);
// Update an admin by username
router.put('/:username', adminLoginController.updateAdmin);
// Delete an admin by username
router.delete('/:username', adminLoginController.deleteAdmin);
// Admin login
router.post('/login', adminLoginController.login);
// Forgot password
router.post('/forgot-password', adminLoginController.forgotPassword);

module.exports = router;
