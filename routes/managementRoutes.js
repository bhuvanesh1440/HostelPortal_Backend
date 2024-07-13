// routes/managementRoutes.js
const express = require('express');
const router = express.Router();
const managementController = require('../controllers/managementController');

router.post('/request-permission', managementController.requestPermission);
router.post('/approve-permission', managementController.approvePermission);
router.post('/student-return', managementController.recordStudentReturn);
router.get('/all-requests', managementController.getAllRequests); // New route to fetch all requests
router.get('/not-approved-requests', managementController.getNotApprovedRequests); // New route to fetch not approved requests

module.exports = router;
