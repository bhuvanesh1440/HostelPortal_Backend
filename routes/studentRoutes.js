// routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.post('/add', studentController.addStudent);
router.put('/update/:rollno', studentController.updateStudent);
router.delete('/delete/:rollno', studentController.deleteStudent);
router.get('/', studentController.readStudents);



module.exports = router;
