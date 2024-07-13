const mongoose = require('mongoose');
const XLSX = require('xlsx');
const Hosteler = require('../models/Hostelers');

exports.uploadExcel = async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const workbook = XLSX.readFile(req.file.path);
  const sheet_name_list = workbook.SheetNames;
  const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

  // Filter out records with null or missing RollNo
  const validData = jsonData.filter(data => data.RollNo != null);

  // Set hostelid based on Gender if hostelid is missing
  const processedData = validData.map(data => {
    if (!data.hostelid) {
      if (data.Gender === 'Male') {
        data.hostelid = 'BH';
      } else if (data.Gender === 'Female') {
        data.hostelid = 'GH';
      }
    }
    return data;
  });

  const rollNoSet = new Set();

  // Check for duplicates in the Excel data
  const uniqueData = processedData.filter(data => {
    if (rollNoSet.has(data.RollNo)) {
      return false; // Skip duplicate RollNo
    } else {
      rollNoSet.add(data.RollNo);
      return true;
    }
  });

  try {
    const result = await Hosteler.insertMany(uniqueData, { ordered: false }); // Use ordered: false to continue on duplicate errors
    res.status(200).send(`${result.length} records inserted successfully`);
  } catch (err) {
    console.error('Error inserting data: ', err);
    res.status(500).send('Error inserting data');
  }
};
