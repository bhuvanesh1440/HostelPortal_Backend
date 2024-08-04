// // controllers/hostlerCredentialsController.js
// const HostlerCredentials = require('../models/HostlerCredentials');
// const mongoose = require('mongoose');
// // const bcrypt = require('bcrypt');

// // Password validation function
// const validatePassword = (password) => {
//     const minLength = 8;
//     const hasUpperCase = /[A-Z]/.test(password);
//     const hasLowerCase = /[a-z]/.test(password);
//     const hasNumeric = /[0-9]/.test(password);
//     const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

//     if (password.length < minLength) {
//         return { isValid: false, message: `Password must be at least ${minLength} characters long.` };
//     }
//     if (!hasUpperCase) {
//         return { isValid: false, message: 'Password must contain at least one uppercase letter.' };
//     }
//     if (!hasLowerCase) {
//         return { isValid: false, message: 'Password must contain at least one lowercase letter.' };
//     }
//     if (!hasNumeric) {
//         return { isValid: false, message: 'Password must contain at least one numeric digit.' };
//     }
//     if (!hasSpecialChar) {
//         return { isValid: false, message: 'Password must contain at least one special character.' };
//     }

//     return { isValid: true };
// };

// // Create hostler credentials
// // exports.createHostlerCredentials = async (req, res) => {
// //     try {
// //         const { RollNumber, password } = req.body;

// //         // Check if hosteler exists
// //         const existingHosteler = await mongoose.model('Hosteler').findOne({ RollNo: RollNumber });
// //         if (!existingHosteler) {
// //             return res.status(404).json({ message: `Hosteler with RollNumber ${RollNumber} not found.` });
// //         }

// //         // Check if credentials already exist
// //         const existingCredentials = await HostlerCredentials.findOne({ RollNumber });
// //         if (existingCredentials) {
// //             return res.status(409).json({ message: `Credentials for RollNumber ${RollNumber} already exist.` });
// //         }

// //         // Validate password
// //         const { isValid, message } = validatePassword(password);
// //         if (!isValid) {
// //             return res.status(400).json({ message });
// //         }

// //         // Hash the password
// //         const salt = await bcrypt.genSalt(10);
// //         const hashedPassword = await bcrypt.hash(password, salt);

// //         const newCredentials = new HostlerCredentials({
// //             RollNumber,
// //             password: hashedPassword,
// //         });

// //         await newCredentials.save();
// //         res.status(201).json(newCredentials);
// //         console.log("User created...");
// //     } catch (error) {
// //         res.status(400).json({ message: error.message });
// //     }
// // };

// // Login controller
// // exports.login = async (req, res) => {
// //     console.log(req.body);
// //     const { RollNumber, password } = req.body;

// //     try {
// //         // Check if credentials exist
// //         const credentials = await HostlerCredentials.findOne({ RollNumber });
// //         console.log(credentials);

// //         if (!credentials) {
// //             console.log("fail");
// //             return res.status(401).json({ success: false, message: "Invalid credentials" });
// //         }

// //         // Validate password
// //         const isMatch = await bcrypt.compare(password, credentials.password);
// //         if (!isMatch) {
// //             console.log("fail");
// //             return res.status(401).json({ success: false, message: "Invalid credentials" });
// //         }

// //         // If username and password are correct, return success
// //         console.log("success");
// //         res.status(200).json({ success: true, message: "Login successful" });

// //     } catch (error) {
// //         console.error("Error logging in:", error);
// //         res.status(500).json({ success: false, message: "Server error. Please try again later." });
// //     }
// // };

// // Get all hostler credentials
// exports.getAllHostlerCredentials = async (req, res) => {
//     try {
//         const credentials = await HostlerCredentials.find();
//         res.status(200).json(credentials);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Get hostler credentials by RollNumber
// exports.getHostlerCredentialsByRollNumber = async (req, res) => {
//     try {
//         const credentials = await HostlerCredentials.findOne({ RollNumber: req.params.RollNumber });
//         if (!credentials) {
//             return res.status(404).json({ message: `Credentials for RollNumber ${req.params.RollNumber} not found.` });
//         }
//         res.status(200).json(credentials);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Update hostler credentials by RollNumber
// // exports.updateHostlerCredentialsByRollNumber = async (req, res) => {
// //     try {
// //         const { RollNumber } = req.params;
// //         const update = req.body;

// //         // Validate if hosteler exists
// //         const existingHosteler = await mongoose.model('Hosteler').findOne({ RollNo: RollNumber });
// //         if (!existingHosteler) {
// //             return res.status(404).json({ message: `Hosteler with RollNumber ${RollNumber} not found.` });
// //         }

// //         // Check if password is being updated and validate and hash it
// //         if (update.password) {
// //             const { isValid, message } = validatePassword(update.password);
// //             if (!isValid) {
// //                 return res.status(400).json({ message });
// //             }

// //             const salt = await bcrypt.genSalt(10);
// //             update.password = await bcrypt.hash(update.password, salt);
// //         }

// //         const updatedCredentials = await HostlerCredentials.findOneAndUpdate(
// //             { RollNumber },
// //             update,
// //             { new: true }
// //         );

// //         res.status(200).json(updatedCredentials);
// //     } catch (error) {
// //         res.status(400).json({ message: error.message });
// //     }
// // };

// // Delete hostler credentials by RollNumber
// exports.deleteHostlerCredentialsByRollNumber = async (req, res) => {
//     try {
//         const { RollNumber } = req.params;

//         // Validate if hosteler exists
//         const existingHosteler = await mongoose.model('Hosteler').findOne({ RollNo: RollNumber });
//         if (!existingHosteler) {
//             return res.status(404).json({ message: `Hosteler with RollNumber ${RollNumber} not found.` });
//         }

//         await HostlerCredentials.findOneAndDelete({ RollNumber });

//         res.status(200).json({ message: `Credentials for RollNumber ${RollNumber} deleted successfully.` });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };
