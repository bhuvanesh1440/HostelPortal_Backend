const express = require('express');
const router = express.Router();
const inchargeController = require('../controllers/inchargeController');

// CRUD operations for incharges
router.post('/incharges', inchargeController.createIncharge);
router.get('/incharges', inchargeController.getAllIncharges);
router.get('/incharges/:eid', inchargeController.getInchargeByEid);
router.put('/incharges/:eid', inchargeController.updateInchargeByEid);
router.delete('/incharges/:eid', inchargeController.deleteInchargeByEid);

module.exports = router;
