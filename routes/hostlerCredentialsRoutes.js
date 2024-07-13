// routes/hostlerCredentialsRoutes.js
const express = require('express');
const router = express.Router();
const hostlerCredentialsController = require('../controllers/hostlerCredentialsController');



router.post('/', hostlerCredentialsController.createHostlerCredentials);
router.get('/', hostlerCredentialsController.getAllHostlerCredentials);
router.get('/:RollNumber', hostlerCredentialsController.getHostlerCredentialsByRollNumber);
router.put('/:RollNumber', hostlerCredentialsController.updateHostlerCredentialsByRollNumber);
router.delete('/:RollNumber', hostlerCredentialsController.deleteHostlerCredentialsByRollNumber);
router.post('/login', hostlerCredentialsController.login); 

module.exports = router;
