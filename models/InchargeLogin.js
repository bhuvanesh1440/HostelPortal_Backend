// models/Admin.js
const mongoose = require('mongoose');

const inchargeLoginSchema = new mongoose.Schema({
    
    eid: { type: String, required: true, unique: true },    
    password: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Incharge', inchargeLoginSchema);
