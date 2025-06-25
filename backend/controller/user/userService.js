const doctorRepo = require("../../repository/employee.repository");

const getAllDoctors = async (req, res) => {
  try {
    const doctors = await doctorRepo.getAllDoctors();
    res.status(200).json({ message: "OK", doctors });
  } catch (err) {
    res.status(500).json({ message: "Error", error: err.message });
  }
};

const getDoctorById = async (req, res) => {
  try {
    console.log("doctorId = " + req.params.doctorId);
    const doctor = await doctorRepo.getDoctorById(req.params.doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json({ message: "OK", doctor });
  } catch (err) {
    res.status(500).json({ message: "Error", error: err.message });
  }
};

module.exports = { getAllDoctors, getDoctorById };
