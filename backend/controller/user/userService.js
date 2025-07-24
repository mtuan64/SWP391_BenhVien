const Profile = require("../../models/Profile");
const Question = require("../../models/Question");
const User = require("../../models/User");
const Appointment = require("../../models/Appointment");
const Feedback = require("../../models/Feedback");
const Schedule = require("../../models/Schedule");
const { sendAppointmentConfirmation } = require("../../utils/mailService");
const Employee = require("../../models/Employee");
const Notification = require("../../models/Notification");
const mongoose = require('mongoose');

const doctorRepo = require("../../repository/employee.repository");
const serviceRepo = require("../../repository/service.repository");
const departmentRepo = require("../../repository/department.repository");
const medicineRepo = require("../../repository/medicine.repository");

// Đặt lịch khám
const getMyProfiles = async (req, res) => {
  try {
    const UserId = req.user.id;

    // Lấy danh sách ID hồ sơ từ tài khoản
    const user = await User.findById(UserId);
    if (!user)
      return res.status(404).json({ message: "Không tìm thấy tài khoản" });

    const profileIds = user.profiles || [];

    // Lấy thông tin hồ sơ
    const profiles = await Profile.find({ _id: { $in: profileIds } })
      .populate("doctorId", "name") // chỉ lấy trường name của bác sĩ
      .populate("medicine", "name type") // chỉ lấy name và type thuốc
      .sort({ createdAt: -1 }); // mặc định sort mới nhất trước

    res.json(profiles);
  } catch (err) {
    console.error("Lỗi khi lấy hồ sơ:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

const sendQA = async (req, res) => {
  const { userId = null, email, title, message, status = "pending" } = req.body;

  try {
    if (!email || !title || !message) {
      return res
        .status(400)
        .json({ message: "Thiếu thông tin bắt buộc (email, title, message)." });
    }

    const question = new Question({
      userId,
      email,
      title,
      message,
      status,
    });

    await question.save();

    res.status(201).json({
      success: true,
      message: "Yêu cầu hỗ trợ đã được gửi.",
      data: question,
    });
  } catch (error) {
    console.error("Lỗi khi gửi yêu cầu:", error);
    res.status(500).json({ message: "Đã xảy ra lỗi khi gửi yêu cầu." });
  }
};

const getAllQAUser = async (req, res) => {
  const {
    sort,
    statusfilter,
    search,
    page = 1,
    limit = 10,
    idUser,
  } = req.query;

  try {
    if (!idUser) {
      return res
        .status(401)
        .json({ success: false, message: "Chưa đăng nhập." });
    }

    const filter = { userId: idUser };
    if (statusfilter) filter.status = statusfilter;
    if (search) filter.title = { $regex: search, $options: "i" };

    const sortOption = {};
    if (sort) {
      const [field, order] = sort.split("_");
      sortOption[field] = order === "asc" ? 1 : -1;
    } else {
      sortOption.createdAt = -1;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Question.countDocuments(filter);

    const QAs = await Question.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      data: QAs,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách Q&A:", error);
    res.status(500).json({ success: false, message: "Đã xảy ra lỗi máy chủ." });
  }
};

// Đặt lịch khám
const createAppointment = async (req, res) => {
  const { profileId, doctorId, department, appointmentDate, type } = req.body;
  const userId = req.user.id;

  const session = await mongoose.startSession(); // Bắt đầu transaction
  session.startTransaction();

  try {
    const apptDate = new Date(appointmentDate);

    // Kiểm tra existing appointment cho doctor tại thời gian chính xác
    const existingAppointment = await Appointment.findOne({
      doctorId,
      appointmentDate: apptDate,
      status: { $ne: "Canceled" },
    }).session(session);

    if (existingAppointment) {
      await session.abortTransaction();
      return res.status(409).json({
        message: "Lịch này đã được đặt bởi người khác. Vui lòng chọn thời gian khác.",
      });
    }

    // Tìm schedule của bác sĩ cho ngày tương ứng
    const schedule = await Schedule.findOne({
      employeeId: doctorId,
      date: {
        $gte: new Date(apptDate.getFullYear(), apptDate.getMonth(), apptDate.getDate()),
        $lt: new Date(apptDate.getFullYear(), apptDate.getMonth(), apptDate.getDate() + 1),
      },
    }).session(session);

    if (!schedule) {
      await session.abortTransaction();
      return res.status(404).json({
        message: "Không tìm thấy lịch làm việc của bác sĩ cho ngày này.",
      });
    }

    // Kiểm tra slot chứa appointmentDate có 'Available' không
    let slotAvailable = false;
    let slotIndex = -1;
    for (let i = 0; i < schedule.timeSlots.length; i++) {
      const slot = schedule.timeSlots[i];
      if (
        new Date(slot.startTime) <= apptDate &&
        new Date(slot.endTime) > apptDate &&
        slot.status === 'Available'
      ) {
        slotAvailable = true;
        slotIndex = i;
        break;
      }
    }

    if (!slotAvailable) {
      await session.abortTransaction();
      return res.status(409).json({
        message: "Slot thời gian này đã được đặt hoặc không available. Vui lòng chọn thời gian khác.",
      });
    }

    // Nếu OK, tạo appointment
    const newAppointment = new Appointment({
      userId,
      profileId,
      doctorId,
      department,
      appointmentDate,
      type,
      status: "Booked",
    });

    await newAppointment.save({ session });

    // Cập nhật status slot thành 'Booked'
    schedule.timeSlots[slotIndex].status = 'Booked';
    await schedule.save({ session });

    // Commit transaction
    await session.commitTransaction();

    // Tiếp tục gửi email xác nhận
    const [user, profile, doctor] = await Promise.all([
      User.findById(userId),
      Profile.findById(profileId),
      Employee.findById(doctorId),
    ]);

    await sendAppointmentConfirmation({
      to: user.email,
      patientName: profile.name,
      doctorName: doctor.name,
      date: appointmentDate,
      type,
    });

    res.status(201).json({
      message: "Appointment created successfully.",
      appointment: newAppointment,
    });
  } catch (error) {
    await session.abortTransaction();
    console.error("Error creating appointment:", error);
    res.status(500).json({
      message: "Failed to create appointment.",
      error: error.message,
    });
  } finally {
    session.endSession();
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
      .populate("department", "name") // NEW: Populate department để lấy name
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

// POST: User gửi feedback
const createFeedback = async (req, res) => {
  const userId = req.user.id;
  try {
    const { content, rating, appointmentId } = req.body;
    const feedback = new Feedback({
      userId,
      appointmentId,
      content,
      rating,
    });
    await feedback.save();
    res.status(201).json({ message: 'Feedback sent successfully', feedback });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send feedback' });
  }
};

module.exports = {
  getMyProfiles,
  sendQA,
  getAllQAUser,
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
  createFeedback,
};

