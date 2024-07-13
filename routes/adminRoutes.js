// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/', adminController.createAdmin);
router.get('/', adminController.getAllAdmins);
router.get('/:username', adminController.getAdminByUsername);
router.put('/:username', adminController.updateAdminByUsername);
router.delete('/:username', adminController.deleteAdminByUsername);
router.post('/login',adminController.login);

module.exports = router;
