const Appointment = require("../../models/Appointment");
const { sendAppointmentConfirmation } = require("../../utils/mailService");
const User = require("../../models/User");
const Profile = require("../../models/Profile");
const Employee = require("../../models/Employee");
const doctorRepo = require("../../repository/employee.repository");
const serviceRepo = require("../../repository/service.repository");
const departmentRepo = require("../../repository/department.repository");
const medicineRepo = require("../../repository/medicine.repository");

// Đặt lịch khám
exports.createAppointment = async (req, res) => {
    const { profileId, doctorId, department, appointmentDate, type } = req.body;
    const userId = req.user.id;

    try {
        // Kiểm tra xem bác sĩ đã có lịch vào giờ này chưa
        const existingAppointment = await Appointment.findOne({
            doctorId,
            appointmentDate: new Date(appointmentDate),
            status: { $ne: 'Canceled' }
        });

        if (existingAppointment) {
            return res.status(409).json({
                message: 'This doctor already has an appointment at the selected time.'
            });
        }

        // Nếu không trùng thì tạo mới lịch khám
        const newAppointment = new Appointment({
            userId,
            profileId,
            doctorId,
            department,
            appointmentDate,
            type,
            status: 'Booked'
        });

        await newAppointment.save();

        const [user, profile, doctor] = await Promise.all([
            User.findById(userId),
            Profile.findById(profileId),
            Employee.findById(doctorId)
        ]);

        await sendAppointmentConfirmation({
            to: user.email,
            patientName: profile.name,
            doctorName: doctor.name,
            date: appointmentDate,
            type
        });

        res.status(201).json({
            message: 'Appointment created successfully.',
            appointment: newAppointment
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to create appointment.',
            error: error.message
        });
    }
};


// Hiển thị toàn bộ danh sách đặt lịch của chính người dùng
exports.getAppointmentsByUser = async (req, res) => {
    const userId = req.user.id;

    try {
        const appointments = await Appointment.find({ userId })
            .populate('profileId doctorId')
            .sort({ appointmentDate: -1 });

        res.status(200).json(appointments);
    } catch (err) {
        res.status(500).json({ message: 'Failed to get appointments', error: err.message });
    }
};

// Hủy lịch hẹn
exports.cancelAppointment = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const appointment = await Appointment.findOne({ _id: id, userId });
        if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

        if (appointment.status === 'Canceled') {
            return res.status(400).json({ message: 'Appointment is already canceled' });
        }

        appointment.status = 'Canceled';
        await appointment.save();

        res.status(200).json({ message: 'Appointment canceled successfully', appointment });
    } catch (err) {
        res.status(500).json({ message: 'Failed to cancel appointment', error: err.message });
    }
};

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
