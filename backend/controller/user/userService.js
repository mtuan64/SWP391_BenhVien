const doctorRepo = require("../../repository/employee.repository");
const serviceRepo = require("../../repository/service.repository");

//List Doctors
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
        const doctor = await doctorRepo.getDoctorById(req.params.doctorId);
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }
        res.status(200).json({ message: "OK", doctor });
    } catch (err) {
        res.status(500).json({ message: "Error", error: err.message });
    }
};

//List Services
const getAllServices = async (req, res) => {
    try {
        const services = await serviceRepo.getAllServices();
        res.status(200).json({ message: "OK", services });
    } catch (err) {
        res.status(500).json({ message: "Error", error: err.message });
    }
};

const getServiceById = async (req, res) => {
    try{
        const service = await serviceRepo.getServiceById(req.params.serviceId);
        if (!service) {
            return res.status(404).json({ message: "Service not found" });
        }
        res.status(200).json({ message: "OK", service });
    } catch (err) {
        res.status(500).json({ message: "Error", error: err.message });
    }
};

module.exports = { getAllDoctors, getDoctorById, getAllServices, getServiceById };
