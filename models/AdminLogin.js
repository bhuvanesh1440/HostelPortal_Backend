// models/AdminLogin.js
const mongoose = require('mongoose');

const adminLoginSchema = new mongoose.Schema({
    
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('AdminLogin', adminLoginSchema);