// models/HostlerCredentials.js
const mongoose = require('mongoose');

const hostlerCredentialsSchema = new mongoose.Schema({
    RollNumber: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
}, { timestamps: true });

// Add a pre-save hook to validate if RollNumber exists in Hosteler schema
hostlerCredentialsSchema.pre('save', async function(next) {
    try {
        const existingHosteler = await mongoose.model('Hosteler').findOne({ RollNo: this.RollNumber });
        if (!existingHosteler) {
            throw new Error(`Hosteler with RollNumber ${this.RollNumber} does not exist.`);
        }
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('HostlerCredentials', hostlerCredentialsSchema);
