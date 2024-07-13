// routes/students.js

const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Add a new student
router.post('/add', async (req, res) => {
    const {
        rollNo, hostelId, name, phoneNo, parentName, parentPhone, dateOfBirth,
        address, email, yearOfStudy, course, isinout, guardianContact, emergencyContact,
        bloodGroup, medicalConditions
    } = req.body;

    try {
        const newStudent = new Student({
            rollNo, hostelId, name, phoneNo, parentName, parentPhone, dateOfBirth,
            address, email, yearOfStudy, course, isinout, guardianContact, emergencyContact,
            bloodGroup, medicalConditions
        });

        await newStudent.save();
        res.status(201).json({ message: 'Student added successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all students
router.get('/', async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a student by roll number
router.put('/update/:rollNo', async (req, res) => {
    const { rollNo } = req.params;
    const updates = req.body;

    try {
        const updatedStudent = await Student.findOneAndUpdate({ rollNo }, updates, { new: true });
        if (!updatedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json({ message: 'Student updated successfully', updatedStudent });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a student by roll number
router.delete('/delete/:rollNo', async (req, res) => {
    const { rollNo } = req.params;

    try {
        const deletedStudent = await Student.findOneAndDelete({ rollNo });
        if (!deletedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
