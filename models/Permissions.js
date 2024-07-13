// models/Permission.js
const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  rollNumber: {
    type: String,
    required: true
  },
  leaveType: {
    type: String,
    required: true
  },
  startDate: {
    type: String,
    required: false
  },
  endDate: {
    type: String,
    required: false
  },
  reason: {
    type: String,
    required: true
  },
  fromTime: {
    type: String,
    required: false
  },
  toTime: {
    type: String,
    required: false
  },
  date: {
    type: String,
    required: false
  },
  status: {
    type: String,
    default: 'pending'
  }
});

module.exports = mongoose.model('Permission', permissionSchema);
