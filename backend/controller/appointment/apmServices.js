const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');

/////////////////////////////////////////////////////////// doctor controller ///////////////////////////////////////////////////////////////////////
// @desc    Get all doctors
// @route   GET /api/doctors
// @access  Public
const getDoctors = asyncHandler(async (req, res) => {
    const doctors = await Employee.find({ role: 'Doctor' }).select('-password');
    res.status(200).json({
        success: true,
        count: doctors.length,
        data: doctors,
    });
});

// @desc    Get single doctor by ID
// @route   GET /api/doctors/:id
// @access  Public
const getDoctor = asyncHandler(async (req, res) => {
    const doctor = await Employee.findOne({
        _id: req.params.id,
        role: 'Doctor',
    }).select('-password');

    if (!doctor) {
        res.status(404);
        throw new Error('Doctor not found');
    }

    res.status(200).json({
        success: true,
        data: doctor,
    });
});

// @desc    Create new doctor
// @route   POST /api/doctors
// @access  Private/Admin
const createDoctor = asyncHandler(async (req, res) => {
    const {
        email,
        password,
        name,
        department,
        specialization,
        phone,
    } = req.body;

    // Kiểm tra email đã tồn tại
    const doctorExists = await Employee.findOne({ email });
    if (doctorExists) {
        res.status(400);
        throw new Error('Email already in use');
    }

    // Tạo doctor mới
    const doctor = await Employee.create({
        email,
        password, // Password sẽ được hash tự động bởi middleware trong schema
        name,
        role: 'Doctor', // Đặt role mặc định là Doctor
        department,
        specialization,
        phone,
    });

    res.status(201).json({
        success: true,
        data: {
            _id: doctor._id,
            email: doctor.email,
            name: doctor.name,
            department: doctor.department,
            specialization: doctor.specialization,
            phone: doctor.phone,
        },
    });
});

// @desc    Update doctor
// @route   PUT /api/doctors/:id
// @access  Private/Admin
const updateDoctor = asyncHandler(async (req, res) => {
    const doctor = await Employee.findOne({
        _id: req.params.id,
        role: 'Doctor',
    });

    if (!doctor) {
        res.status(404);
        throw new Error('Doctor not found');
    }

    const {
        email,
        name,
        department,
        specialization,
        phone,
        password,
    } = req.body;

    // Cập nhật các trường
    doctor.email = email || doctor.email;
    doctor.name = name || doctor.name;
    doctor.department = department || doctor.department;
    doctor.specialization = specialization || doctor.specialization;
    doctor.phone = phone || doctor.phone;

    // Nếu có password mới, cập nhật
    if (password) {
        doctor.password = password; // Sẽ được hash bởi middleware
    }

    const updatedDoctor = await doctor.save();

    res.status(200).json({
        success: true,
        data: {
            _id: updatedDoctor._id,
            email: updatedDoctor.email,
            name: updatedDoctor.name,
            department: updatedDoctor.department,
            specialization: updatedDoctor.specialization,
            phone: updatedDoctor.phone,
        },
    });
});

// @desc    Delete doctor
// @route   DELETE /api/doctors/:id
// @access  Private/Admin
const deleteDoctor = asyncHandler(async (req, res) => {
    const doctor = await Employee.findOne({
        _id: req.params.id,
        role: 'Doctor',
    });

    if (!doctor) {
        res.status(404);
        throw new Error('Doctor not found');
    }

    await doctor.remove();

    res.status(200).json({
        success: true,
        message: 'Doctor deleted successfully',
    });
});

module.exports = {
    getDoctors,
    getDoctor,
    createDoctor,
    updateDoctor,
    deleteDoctor,
};