const express = require('express');
const router = express.Router();
const inchargeController = require('../controllers/inchargeController');

// CRUD operations for incharges
router.post('/create', inchargeController.createIncharge);
router.get('/', inchargeController.getAllIncharges);
router.get('/getIncharges/:hostelId',inchargeController.getInchargesByHostelId)
router.get('/:eid', inchargeController.getInchargeByEid);
router.put('/:eid', inchargeController.updateInchargeByEid);
router.delete('/:eid', inchargeController.deleteInchargeByEid);

module.exports = router;
