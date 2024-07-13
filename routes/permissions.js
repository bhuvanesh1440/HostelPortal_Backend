const express = require('express');
const router = express.Router();
const Permission = require('../models/Permissions');

// Fetch all permissions
router.get('/', async (req, res) => {
  try {
    const permissions = await Permission.find();
    res.status(200).json(permissions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Fetch a single permission by ID
router.get('/:id', async (req, res) => {
  try {
    const permission = await Permission.findById(req.params.id);
    if (!permission) {
      return res.status(404).json({ message: 'Permission request not found' });
    }
    res.status(200).json(permission);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new permission
router.post('/', async (req, res) => {
  const permission = new Permission({
    name: req.body.name,
    rollNumber: req.body.rollNumber,
    leaveType: req.body.leaveType,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    reason: req.body.reason,
    fromTime: req.body.fromTime,
    toTime: req.body.toTime,
    date: req.body.date,
    status: req.body.status || 'pending'
  });

  try {
    const newPermission = await permission.save();
    res.status(201).json(newPermission);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update the status of a permission request
router.patch('/:id', async (req, res) => {
  try {
    const permission = await Permission.findById(req.params.id);
    if (!permission) {
      return res.status(404).json({ message: 'Permission request not found' });
    }
    permission.status = req.body.status;
    await permission.save();
    res.status(200).json(permission);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a permission
router.delete('/:id', async (req, res) => {
  try {
    const permission = await Permission.findById(req.params.id);
    if (!permission) {
      return res.status(404).json({ message: 'Permission request not found' });
    }
    await permission.remove();
    res.status(200).json({ message: 'Permission request deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
