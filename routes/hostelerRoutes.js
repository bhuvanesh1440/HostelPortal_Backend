// routes/hostelerRoutes.js
const express = require('express');
const router = express.Router();
const hostelerController = require('../controllers/hostelerController');

router.post('/', hostelerController.createHosteler);
router.get('/', hostelerController.getAllHostelers);
router.get('/:RollNo', hostelerController.getHostelerByRollNo);
router.post('/getAll', hostelerController.getFilteredHostlers);
router.put('/update/:RollNo', hostelerController.updateHostelerByRollNo);
router.delete('/:RollNo', hostelerController.deleteHostelerByRollNo);

module.exports = router;
