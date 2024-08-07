const express = require('express');
const router = express.Router();
const hostlerCredentialsController = require('../controllers/hostlerCredentialsController');

// Create a new hostler
router.post('/create', hostlerCredentialsController.createHostler);

// Get all hostlers
router.get('/', hostlerCredentialsController.getAllHostlers);

// Update a hostler's password by rollNo
router.put('/:rollNo', hostlerCredentialsController.updateHostlerPassword);

// Delete a hostler by rollNo
router.delete('/:rollNo', hostlerCredentialsController.deleteHostler);

// Hostler login
router.post('/login', hostlerCredentialsController.login);

// Forgot password
router.post('/forgot-password', hostlerCredentialsController.forgotPassword);

module.exports = router;
