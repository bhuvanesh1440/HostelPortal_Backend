// models/Student.js

const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({

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
    // address: String,
    email: String,
    // yearOfStudy: String,
    // course: String,
    // isinout: { type: Boolean, default: false },
    // guardianContact: String,
    // emergencyContact: String,
    // bloodGroup: String,
    // medicalConditions: String,
}, { timestamps: true });

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
