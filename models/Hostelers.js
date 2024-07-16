// models/Hostel.js
const mongoose = require('mongoose');

const hostelersSchema = new mongoose.Schema({
    RollNo: { type: String, required: true, unique: true },
    hostelid: String,
    FirstName: String,
    LastName: String,
    Semester:String,
    Gender:String,
    Department:String,
    PhoneNo: String,
    FatherName: String,
    FatherMobileNumber: String,
    DOB: Date,
    Email: String,
    
}, { timestamps: true });

module.exports = mongoose.model('Hosteler', hostelersSchema);
