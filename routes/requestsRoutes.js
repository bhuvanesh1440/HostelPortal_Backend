const express = require('express');
const router = express.Router();
const requestsController = require('../controllers/requestsController');

router.post('/', requestsController.createRequest);
router.get('/', requestsController.getAllRequests);
router.get('/pending/:hostelId', requestsController.getPendingRequestsByHostelId);
router.post('/approve/:Id', requestsController.approveRequest);
router.get('/activeRequest/:hostelId',requestsController.acceptedRequestsByhostelId)




router.get('/:RollNo',requestsController.getAllRequestsByRollNumber)

router.get('/not-approved', requestsController.getNotApprovedRequests);
router.get('/not-returned', requestsController.getNotReturnedRequests);

// router.get('/:id', requestsController.getRequestById);
// router.put('/:id', requestsController.updateRequestById);
router.delete('/:id', requestsController.deleteRequestById);
router.post('/mark-returned/:id', requestsController.markRequestAsReturned);

module.exports = router;
