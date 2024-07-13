// models/Admin.js
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    hostelid: { type: String, required: true },
    name: { type: String, required: true },
    phoneNo: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Admin', adminSchema);
