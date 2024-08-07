const express = require('express');
const router = express.Router();
const inchargeLoginController = require('../controllers/inchargeLoginController');

// Create a new incharge (admin)
router.post('/create', inchargeLoginController.createIncharge);

// Get all incharges (admins)
router.get('/', inchargeLoginController.getAllIncharges);

// Update an incharge's password by eid
router.put('/:eid', inchargeLoginController.updateInchargePassword);

// Delete an incharge by eid
router.delete('/:eid', inchargeLoginController.deleteIncharge);

// Incharge login
router.post('/login', inchargeLoginController.login);

// Forgot password
router.post('/forgot-password', inchargeLoginController.forgotPassword);

module.exports = router;
