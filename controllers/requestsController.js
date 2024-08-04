const Request = require('../models/Requests');
const Hosteler = require('../models/Hostelers');
const sendSMS = require('../utils/sms');
const formatDate = require('../utils/formatDate');
const dotenv = require('dotenv');
dotenv.config();

const OUTGOING_TEMPLATE_ID = process.env.OUTGOING_TEMPLATE_ID;
const RETURN_TEMPLATE_ID = process.env.RETURN_TEMPLATE_ID;

// Create a request
exports.createRequest = async (req, res) => {
    try {
        // const { name, rollno, hostelid, requestType, startDate, endDate, fromTime, toTime, reason } = req.body;

        // const hosteler = await Hosteler.findOne({ RollNo: rollno });
        // if (!hosteler) {
        //     return res.status(404).send('Hosteler not found');
        // }

        const newRequest = new Request(req.body);
        console.log("in controller")
        console.log(req.body)

        await newRequest.save();
        res.status(201).json({success:"true"});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all requests
exports.getAllRequests = async (req, res) => {
    try {
        const requests = await Request.find().sort({ createdAt: -1 });
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllRequestsByRollNumber = async(req,res) =>{
    try{
        
        const rollno = req.params.RollNo;
        console.log(rollno)
        const requests = await Request.find({rollNo:rollno}).sort({ createdAt: -1});
        console.log(requests);
        res.status(200).json(requests);
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}

// Get a single request by ID
exports.getRequestById = async (req, res) => {
    try {
        const request = await Request.findById(req.params.id);
        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }
        res.status(200).json(request);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a request by ID
exports.updateRequestById = async (req, res) => {
    try {
        const request = await Request.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }
        res.status(200).json(request);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a request by ID
exports.deleteRequestById = async (req, res) => {
    try {
        const request = await Request.findByIdAndDelete(req.params.id);
        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }
        res.status(200).json({ message: 'Request deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Get all not approved requests
exports.getNotApprovedRequests = async (req, res) => {
    try {
        const requests = await Request.find({ approved: false }).sort({ createdAt: -1 });
        res.status(200).json(requests);
    } catch (error) {
        console.error('Error fetching not approved requests:', error);
        res.status(500).send('Server error');
    }
};


// Get all approved but not returned requests
exports.getNotReturnedRequests = async (req, res) => {
    try {
        const requests = await Request.find({ approved: true, returned: false }).sort({ createdAt: -1 });
        res.status(200).json(requests);
    } catch (error) {
        console.error('Error fetching not returned requests:', error);
        res.status(500).send('Server error');
    }
};


const send_return = require("../utils/send_return ")
// Mark request as returned
exports.markRequestAsReturned = async (req, res) => {
    const { id } = req.params;

    try {
        console.log(`Received request to mark as returned with id: ${id}`);
        const request = await Request.findById(id);
        if (!request) {
            console.log('Request not found');
            return res.status(404).send('Request not found');
        }

        // Current return time
        const returnTime = new Date();

        // Combine endDate and toTime to create a complete end datetime
        const endDateTime = new Date(request.endDate);
        const [endHours, endMinutes] = request.toTime.split(':').map(Number);
        endDateTime.setHours(endHours);
        endDateTime.setMinutes(endMinutes);

        // Check if the returned time is greater than endDateTime
        request.delay = returnTime > endDateTime;

        request.returned = true;
        request.return_time = returnTime;
        await request.save();
        console.log('Request marked as returned');

        const hosteler = await Hosteler.findOne({ RollNo: request.rollno });
        if (hosteler) {
            console.log('Hosteler found, sending notification');
            const phoneNumber = hosteler.FatherMobileNumber;
            const messageTemplate = 'Dear Parent, your ward {#var1#} has returned to the campus from outing at {#var2#}. NEC Hostels GEDNEC';
            const variables = [hosteler.FirstName, formatDate(returnTime).toString()];

            await send_return(phoneNumber, messageTemplate, variables);
            res.status(200).send('Request marked as returned and parent notified');
        } else {
            console.log('Hosteler not found');
            res.status(404).send('Hosteler not found');
        }
    } catch (error) {
        console.error('Error marking request as returned:', error);
        res.status(500).send('Server error');
    }
};


// all recent routes

// Get all pending requests by hostelId
exports.getPendingRequestsByHostelId = async (req, res) => {
    try {
        const { hostelId } = req.params;
        console.log(hostelId)
        // Fetch all requests with status 'submitted' for the given hostelId
        const pendingRequests = await Request.find({
            hostelId: hostelId,
            status: 'SUBMITTED',
            isActive: true 
        });
        console.log(pendingRequests)
        if (pendingRequests.length === 0) {
            return res.json({ message: 'No pending requests found for this hostel ID.' });
        }

        res.status(200).json(pendingRequests);
    } catch (error) {
        console.error("Error fetching pending requests:", error);
        res.json({ message: "Server error. Please try again later." });
    }
};


// Approve a request
exports.approveRequest = async (req, res) => {
  
    console.log(req.params.Id)
    console.log(req.body)
    try {
        // Find the request by ID
        const updatedRequest = await Request.findOneAndUpdate(
            {id:req.params.Id}, 
            req.body, 
            { new: true } 
        );
        console.log(updatedRequest)


        // Find the hosteler related to the request
        // const hosteler = await Hosteler.findOne({ rollNo: request.rollNo });
        // if (hosteler) {
        //     const phoneNumber = hosteler.parentPhoneNo;
        //     const messageTemplate = 'Dear Parent, your ward, {#var1#}, has applied for outing from {#var2#} to {#var3#}. Student went out at {#var4#}. NEC Hostels GEDNEC';
        //     const variables = [
        //         hosteler.name,
        //         `${request.fromDate.toDateString()} ${request.fromTime.toTimeString()}`,
        //         `${request.toDate.toDateString()} ${request.toTime.toTimeString()}`,
        //         request.accepted.time.toString(),
        //     ];

            // Send SMS notification
            // await sendSMS(phoneNumber, 'OUTGOING_TEMPLATE_ID', messageTemplate, variables);
            // res.status(200).json({ message: 'Request approved and parent notified' });
        // } else {
        //     res.status(404).json({ message: 'Hosteler not found' });
        // }
    } catch (error) {
        console.error('Error approving request:', error);
        res.json({ message: 'Server error' });
    }
    res.status(200).json({updates:true,message:"notified to parent"})
};


// Get all approved requests that have not been returned, filtered by hostelid
exports.acceptedRequestsByhostelId = async (req, res) => {
    console.log( req.params.hostelId)

    try {
       const requests = await Request.find({ hostelId: req.params.hostelId, status: 'ACCEPTED', isActive: true }).sort({ createdAt: -1 });
     
        res.status(200).json(requests);
        
    } catch (error) {
        console.error('Error fetching not returned requests:', error);
        res.send('Server error');
    }
};


// Mark request as arrived
exports.arriveRequest = async (req,res)=>{
    
    console.log(req.params.Id)
    console.log(req.body)
    try {
        // Find the request by ID
        const updatedRequest = await Request.findOneAndUpdate(
            {id:req.params.Id}, 
            req.body, 
            { new: true } 
        );
        console.log(updatedRequest)

        // const hosteler = await Hosteler.findOne({ rollNo: updatedRequest.rollno });
        // if (hosteler) {
        //     console.log('Hosteler found, sending notification');
        //     const phoneNumber = hosteler.FatherMobileNumber;
        //     const messageTemplate = 'Dear Parent, your ward {#var1#} has returned to the campus from outing at {#var2#}. NEC Hostels GEDNEC';
        //     const variables = [hosteler.FirstName, formatDate(returnTime).toString()];

        //     await send_return(phoneNumber, messageTemplate, variables);
        //     res.status(200).send('Request marked as returned and parent notified');
        // } else {
        //     console.log('Hosteler not found');
        //     res.status(404).send('Hosteler not found');
        // }
    } catch (error) {
        console.error('Error approving request:', error);
        res.json({ message: 'Server error' });
    }
    res.status(200).json({updated:true,message:"notified to parent"})

}


// Get all arrived requests between two dates
exports.getArrivedRequestsBetweenDates = async (req, res) => {
    try {
        const { startDate, endDate } = req.body;

        // Ensure dates are provided and valid
        if (!startDate || !endDate) {
            return res.json({ message: 'Start date and end date are required' });
        }

        const start = new Date(startDate);
        const end = new Date(endDate);
        
        console.log(startDate)
        console.log(endDate)

        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            return res.json({ message: 'Invalid date format' });
        }

        // Find all requests where 'arrived.time' is between startDate and endDate
        const requests = await Request.find({
            arrived: { $ne: null }, // Ensure 'arrived' is not null
            'arrived.time': { $gte: start, $lte: end },
            
        }).sort({ 'arrived.time': -1 });

        res.status(200).json(requests);
    } catch (error) {
        console.error('Error fetching arrived requests:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
