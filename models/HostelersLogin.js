// models/Hostel.js
const mongoose = require('mongoose');

const hostelersLoginSchema = new mongoose.Schema({
   rollNo: { type: String, required: true, unique: true },
   password:{ type: String, required: true }
    
}, { timestamps: true });


module.exports = mongoose.model('HostelerLogin', hostelersLoginSchema);