const mongoose = require('mongoose');
const Management = require('../models/Management');
const Hostel = require('../models/Hostelers');
const sendSMS = require('../utils/sms');
const formatDate = require('../utils/formatDate'); // Import formatDate function
const dotenv = require('dotenv');
dotenv.config();

// Define OUTGOING_TEMPLATE_ID
const OUTGOING_TEMPLATE_ID = process.env.OUTGOING_TEMPLATE_ID;
const RETURN_TEMPLATE_ID = process.env.RETURN_TEMPLATE_ID;

exports.requestPermission = async (req, res) => {
    const { name, rollNumber, hostelid, requestType, startDate, endDate, fromTime, toTime, reason } = req.body;

    try {
        const newRequest = new Management({
            request_id: new mongoose.Types.ObjectId(),
            name,
            rollno: rollNumber,
            hostelid,
            requestType,
            startDate,
            endDate,
            fromTime,
            toTime,
            reason,
            approved: false
        });

        await newRequest.save();
        res.status(200).send('Permission or leave requested');
    } catch (err) {
        console.error('Error requesting permission or leave:', err);
        res.status(500).send('Server error');
    }
};


exports.approvePermission = async (req, res) => {
    const { rollno, hostelid } = req.body;
    console.log({rollno,hostelid});

    try {
        const request = await Management.findOne({ rollno: rollno, hostelid });

        if (request) {
            console.log(request);
            request.approved = true;
            request.returned = false;
            request.approval_time = new Date();
            await request.save();

            const hosteler = await Hostel.findOne({ rollno: rollno });

            if (hosteler) {
                hosteler.isinout = false;
                await hosteler.save();

                const phoneNumber = hosteler.parent_phone;
                const messageTemplate = 'Dear Parent, your ward, {#var1#}, has applied for outing from {#var2#} to {#var3#}. Student went out at {#var4#}. NEC Hostels GEDNEC';
                const variables = [hosteler.name, formatDate(request.startDate), formatDate(request.endDate), formatDate(request.approval_time)];

                console.log('Variables for SMS:', variables);
                // phoneNumber=8790066998;
                console.log(phoneNumber)

                await sendSMS(phoneNumber, OUTGOING_TEMPLATE_ID, messageTemplate, variables);
                // await sendSMS("8790066998", OUTGOING_TEMPLATE_ID, messageTemplate, variables);
                
                res.status(200).send('Permission approved and parent notified');
            } else {
                res.status(404).send('Hosteler not found');
            }
        } else {
            res.status(404).send('Permission request not found');
        }
    } catch (err) {
        console.error('Error approving permission:', err);
        res.status(500).send('Server error');
    }
};

exports.recordStudentReturn = async (req, res) => {
    const { rollNumber, hostelid } = req.body;

    try {
        const request = await Management.findOne({ rollno: rollNumber, hostelid });

        if (request && request.approved && !request.returned) {
            request.returned = true;
            request.return_time = new Date();
            await request.save();

            const student = await Hostel.findOne({ rollno: rollNumber });

            if (student) {
                student.isinout = true;
                await student.save();

                const phoneNumber = student.parent_phone;
                
                const messageTemplate = 'Dear Parent, your ward {#var1#} has returned to the campus from outing at {#var2#}. NEC Hostels GEDNEC';
                const variables = [student.name, formatDate(request.return_time)];

                console.log('Variables for SMS:', variables);

                const smsResponse = await sendSMS(phoneNumber, RETURN_TEMPLATE_ID, messageTemplate, variables);
                
                console.log('SMS Response:', smsResponse);

                res.status(200).send('Student return recorded and parent notified');
            } else {
                res.status(404).send('Student not found');
            }
        } else {
            res.status(404).send('Permission request not found or already returned');
        }
    } catch (err) {
        console.error('Error recording student return:', err);
        res.status(500).send('Server error');
    }
};


// New function to fetch all requests
exports.getAllRequests = async (req, res) => {
    try {
        const requests = await Management.find().sort({ createdAt: -1 }); // Fetch all requests and sort by creation date
        res.status(200).json(requests);
    } catch (err) {
        console.error('Error fetching all requests:', err);
        res.status(500).send('Server error');
    }
};

// Updated function to fetch only not approved requests
exports.getNotApprovedRequests = async (req, res) => {
    try {
        const requests = await Management.find({ approved: false }).sort({ createdAt: -1 });
        res.status(200).json(requests);
    } catch (err) {
        console.error('Error fetching not approved requests:', err);
        res.status(500).send('Server error');
    }
};