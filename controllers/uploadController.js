const mongoose = require('mongoose');
const XLSX = require('xlsx');
const Hosteler = require('../models/Hostelers');

// Helper function to convert date strings to ISO format
const convertDate = (dateString) => {
  const [day, month, year] = dateString.split('-');
  return new Date(`${year}-${month}-${day}`);
};

exports.uploadExcel = async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const workbook = XLSX.readFile(req.file.path);
  const sheet_name_list = workbook.SheetNames;
  const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

  // Filter out records with null or missing RollNo
  const validData = jsonData.filter(data => data.rollNo != null);

  // Process each record
  const processedData = validData.map(data => {
    // Convert date if present
    if (data.dob) {
      try {
        data.dob = convertDate(data.dob);
      } catch (error) {
        console.error(`Error converting date: ${data.dob}`);
        data.dob = null; // Handle invalid dates appropriately
      }
    }

    // Set hostelId based on Gender if hostelId is missing
    if (!data.hostelId) {
      if (data.gender === 'Male') {
        data.hostelId = 'BH';
      } else if (data.gender === 'Female') {
        data.hostelId = 'GH';
      }
    }

    // Ensure field names match the schema
    return {
      hostelId: data.hostelId,
      rollNo: data.rollNo,
      name: data.name,
      college: data.college,
      year: data.year,
      branch: data.branch,
      gender: data.gender,
      dob: data.dob,
      phoneNo: data.phoneNo,
      email: data.email,
      parentName: data.parentName,
      parentPhoneNo: data.parentPhoneNo,
      currentStatus: data.currentStatus || "HOSTEL",
      requestCount: data.requestCount || 0,
      lastRequest: data.lastRequest || null
    };
  });

  try {
    // Find existing rollNos
    const existingRollNos = await Hosteler.find({
      rollNo: { $in: processedData.map(data => data.rollNo) }
    }).select('rollNo');

    // Create a set of existing rollNos for quick lookup
    const existingRollNoSet = new Set(existingRollNos.map(hosteler => hosteler.rollNo));

    // Filter out data with existing rollNos
    const uniqueData = processedData.filter(data => !existingRollNoSet.has(data.rollNo));

    // Insert only the unique records
    const result = await Hosteler.insertMany(uniqueData, { ordered: false }); // Use ordered: false to continue on duplicate errors
    res.status(200).send(`${result.length} records inserted successfully`);
  } catch (err) {
    console.error('Error inserting data: ', err);
    res.status(500).send('Error inserting data');
  }
};
