// controllers/studentController.js
const Hosteler = require("../models/Hostelers");

exports.addStudent = async (req, res) => {
  const {
    rollno,
    hostelid,
    name,
    phone_no,
    parent_name,
    parent_phone,
    dateOfBirth,
    address,
    email,
    yearOfStudy,
    course,
    isinout,
    guardianContact,
    emergencyContact,
    bloodGroup,
    medicalConditions,
  } = req.body;

  if (
    !rollno ||
    !hostelid ||
    !name ||
    !phone_no ||
    !parent_name ||
    !parent_phone
  ) {
    return res.status(400).send("All required fields must be provided");
  }

  try {
    const newStudent = new Hosteler({
      rollno,
      hostelid,
      name,
      phone_no,
      parent_name,
      parent_phone,
      dateOfBirth,
      address,
      email,
      yearOfStudy,
      course,
      isinout,
      guardianContact,
      emergencyContact,
      bloodGroup,
      medicalConditions,
    });

    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (err) {
    console.error("Error creating student:", err);
    res.status(500).send("Server error");
  }
};

exports.readStudents = async (req, res) => {
  try {
    const students = await Hosteler.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateStudent = async (req, res) => {
  const { rollno } = req.params;
  const updates = req.body;

  try {
    const updatedStudent = await Hosteler.findOneAndUpdate(
      { rollno },
      updates,
      { new: true }
    );
    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    res
      .status(200)
      .json({ message: "Student updated successfully", updatedStudent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteStudent = async (req, res) => {
  const { rollno } = req.params;

  try {
    const deletedStudent = await Hosteler.findOneAndDelete({ rollno });
    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
