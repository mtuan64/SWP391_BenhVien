// employee.repository.js
const Employee = require("../models/Employee");

// Lấy danh sách bác sĩ (role Doctor)
async function getAllDoctors() {
  return await Employee.find({ role: "Doctor" });
}

// Lấy chi tiết bác sĩ theo id
async function getDoctorById(id) {
  return await Employee.findOne({ _id: id, role: "Doctor" });
}

module.exports = {
  getAllDoctors,
  getDoctorById,
};
