// models/Request.js
const mongoose = require('mongoose');

const requestsSchema = new mongoose.Schema({
    name: String,
    rollno: String,
    hostelid: String,
    requestType: String, // 'permission' or 'leave'
    startDate: String, // Required for both permission and leave requests
    endDate: String, // Required for leave requests
    fromTime: String, // Required for permission requests
    toTime: String, // Required for permission requests
    reason: String, // Required for leave requests
    approved: { type: Boolean, default: false },
    returned: { type: Boolean, default: false },
    approval_time: Date,
    // returnDate: Date,
    return_time: String, //change to date
    acceptedBy: String,
    delay: { type: Boolean, default: false },
}, { timestamps: true });

// Method to check and update the delay status
requestsSchema.methods.checkAndUpdateDelay = function () {
    if (this.returnDate && this.return_time) {
        const returnDateTime = new Date(`${this.returnDate.toISOString().split('T')[0]}T${this.return_time}:00`);
        const endDateTime = new Date(`${this.endDate.toISOString().split('T')[0]}T${this.toTime}:00`);
        
        if (returnDateTime > endDateTime) {
            this.delay = true;
        } else {
            this.delay = false;
        }
    }
    return this.delay;
};

module.exports = mongoose.model('Request', requestsSchema);
