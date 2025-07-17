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
const createAppointment = async (req, res) => {
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
const getAppointmentsByUser = async (req, res) => {
  const userId = req.user.id;
  const page = parseInt(req.query.page) || 1; // Mặc định là trang 1
  const limit = parseInt(req.query.limit) || 10; // Mặc định là 10 bản ghi mỗi trang
  const skip = (page - 1) * limit; // Tính toán số lượng bản ghi bỏ qua

  try {
    // Lấy tổng số cuộc hẹn để tính toán tổng số trang
    const totalAppointments = await Appointment.countDocuments({ userId });
    const totalPages = Math.ceil(totalAppointments / limit);

    // Lấy các cuộc hẹn theo phân trang
    const appointments = await Appointment.find({ userId })
      .populate('profileId doctorId')
      .sort({ appointmentDate: -1 })
      .skip(skip) // Bỏ qua số lượng bản ghi trước đó
      .limit(limit); // Giới hạn số bản ghi trả về

    // Trả về kết quả phân trang
    res.status(200).json({
      appointments,
      totalAppointments,
      totalPages,
      currentPage: page,
      perPage: limit,
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to get appointments', error: err.message });
  }
};


// Hủy lịch hẹn
const cancelAppointment = async (req, res) => {
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
// const getAllDoctors = async (req, res) => {
//     try {
//         const doctors = await doctorRepo.getAllDoctors();
//         res.status(200).json({ message: "OK", doctors });
//     } catch (err) {
//         res.status(500).json({ message: "Error", error: err.message });
//     }
// };

const getAllDoctors = async (req, res) => {
  const { page = 1, limit = 10, searchTerm = "", specialization = "" } = req.query;

  const skip = (parseInt(page) - 1) * parseInt(limit);

  try {
    // Đếm tổng số bác sĩ
    const totalDoctors = await doctorRepo.countDoctors(searchTerm, specialization);

    // Lấy các bác sĩ với phân trang
    const doctors = await doctorRepo.getDoctorsWithPagination(skip, limit, searchTerm, specialization);

    res.status(200).json({
      doctors,
      totalDoctors,
      totalPages: Math.ceil(totalDoctors / limit),
      currentPage: parseInt(page),
      perPage: parseInt(limit),
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching doctors', error: err.message });
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
  const page = parseInt(req.query.page) || 1;  // Mặc định trang 1
  const limit = parseInt(req.query.limit) || 10;  // Mặc định 10 dịch vụ mỗi trang
  const skip = (page - 1) * limit;  // Tính toán số lượng dịch vụ cần bỏ qua
  const searchTerm = req.query.searchTerm || "";  // Lấy tham số tìm kiếm từ query

  try {
    // Lấy tổng số dịch vụ để tính số trang
    const totalServices = await serviceRepo.countServices(searchTerm);
    const totalPages = Math.ceil(totalServices / limit);

    // Lấy dịch vụ với phân trang và tìm kiếm
    const services = await serviceRepo.getServicesWithPagination(skip, limit, searchTerm);

    res.status(200).json({
      message: "OK",
      services,
      totalServices,
      totalPages,
      currentPage: page,
      perPage: limit,
    });
  } catch (err) {
    res.status(500).json({ message: "Error", error: err.message });
  }
};



const getServiceById = async (req, res) => {
  try {
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
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const searchTerm = req.query.searchTerm || "";  // Lấy tham số tìm kiếm từ query

  try {
    // Lấy tổng số phòng ban để tính số trang
    const totalDepartments = await departmentRepo.countDepartments();
    const totalPages = Math.ceil(totalDepartments / limit);

    // Lấy phòng ban với phân trang
    const departments = await departmentRepo.getDepartmentsWithPagination(skip, limit, searchTerm);

    res.status(200).json({
      message: "OK",
      departments,
      totalDepartments,
      totalPages,
      currentPage: page,
      perPage: limit,
    });
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
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const searchTerm = req.query.searchTerm || "";  // Lấy tham số tìm kiếm từ query

  try {
    // Lấy tổng số thuốc để tính số trang
    const totalMedicines = await medicineRepo.countMedicines(searchTerm);
    const totalPages = Math.ceil(totalMedicines / limit);

    // Lấy thuốc với phân trang và tìm kiếm
    const medicines = await medicineRepo.getMedicinesWithPagination(skip, limit, searchTerm);

    const filtered = medicines.map(medicine => ({
      _id: medicine._id,
      name: medicine.name,
    }));

    res.status(200).json({
      message: "OK",
      data: filtered,
      totalMedicines,
      totalPages,
      currentPage: page,
      perPage: limit,
    });
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
  createAppointment,
  getAppointmentsByUser,
  cancelAppointment,
  getAllDoctors,
  getDoctorById,
  getAllServices,
  getServiceById,
  getAllDepartment,
  getDepartmentById,
  getAllMedicines,
  getMedicineById,
};
