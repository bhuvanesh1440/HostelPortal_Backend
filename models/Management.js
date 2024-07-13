// models/Management.js
const mongoose = require('mongoose');

const managementSchema = new mongoose.Schema({
    request_id: mongoose.Schema.Types.ObjectId,
    name: String,
    rollno: String,
    hostelid: String,
    requestType: String, // 'permission' or 'leave'
    // leaveType: String, // Required for leave requests
    startDate: Date, // Required for both permission and leave requests
    endDate: Date, // Required for leave requests
    fromTime: String, // Required for permission requests
    toTime: String, // Required for permission requests
    reason: String, // Required for leave requests
    approved: { type: Boolean, default: false },
    returned: { type: Boolean, default: false },
    approval_time: Date,
    returnDate:Date,
    return_time: String,
    acceptedBy:String,
    delay:{ type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Management', managementSchema);
