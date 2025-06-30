const doctorRepo = require("../../repository/employee.repository");
const serviceRepo = require("../../repository/service.repository");
const departmentRepo = require("../../repository/department.repository");
const medicineRepo = require("../../repository/medicine.repository");

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

//List Departments
const getAllDepartment = async (req, res) => {
    try {
        const departments = await departmentRepo.getAllDepartment();
        res.status(200).json({ message: "OK", departments });
    } catch (err) {
        res.status(500).json({ message: "Error", error: err.message });
    }
};

const getDepartmentById = async (req, res) => {
    try {
        const department = await departmentRepo.getDepartmentById(req.params.departmentId);
        if (!department) {
            return res.status(404).json({ message: "Department not found" });
        }
        res.status(200).json({ message: "OK", department });
    } catch (err) {
        res.status(500).json({ message: "Error", error: err.message });
    }
};

//List Medicines
const getAllMedicines = async (req, res) => {
    try {
        const medicines = await medicineRepo.getAllMedicines();
        const filtered = medicines.map(medicine => ({
            _id: medicine._id,
            name: medicine.name,
        }));
        res.status(200).json({ message: "OK", data: filtered });
    } catch (err) {
        res.status(500).json({ message: "Error", error: err.message });
    }
};

const getMedicineById = async (req, res) => {
    console.log("REQ PARAMS:", req.params);
    try {
        const medicine = await medicineRepo.getMedicineById(req.params.medicineId);
        if (!medicine) {
            return res.status(404).json({ message: "Medicine not found" });
        }
        const result = {
            _id: medicine._id,
            name: medicine.name,
            type: medicine.type,
            group: medicine.group,
            ingredient: medicine.ingredient,
            indication: medicine.indication,
            contraindication: medicine.contraindication,
            dosage: medicine.dosage,
            sideEffects: medicine.sideEffects,
            precaution: medicine.precaution,
            interaction: medicine.interaction,
            storage: medicine.storage,
        }; 
        res.status(200).json({ message: "OK", data: result });
    } catch (err) {
        res.status(500).json({ message: "Error", error: err.message });
    }
};

module.exports = { 
    getAllDoctors, 
    getDoctorById, 
    getAllServices, 
    getServiceById,
    getAllDepartment,
    getDepartmentById, 
    getAllMedicines,
    getMedicineById,
};
