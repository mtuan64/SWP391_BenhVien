const mongoose = require('mongoose'); // Thêm dòng này
const Employee = require("../../models/Employee");
const User = require("../../models/User");
const Profile = require("../../models/Profile");
// Lấy tất cả bác sĩ

const getAllDoctors = async (req, res) => {
    try {
        const doctors = await Employee.find({ role: 'Doctor' })
            .select('name email department specialization phone');
        res.status(200).json({
            success: true,
            count: doctors.length,
            data: doctors
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server',
            error: error.message
        });
    }
};

// Tìm kiếm bác sĩ theo tên
const searchDoctorsByName = async (req, res) => {
    try {
        const { name } = req.body; // Lấy name từ body JSON
        if (!name) {
            return res.status(400).json({
                success: false,
                message: 'Vui lòng cung cấp tên để tìm kiếm'
            });
        }

        const doctors = await Employee.find({
            role: 'Doctor',

            name: { $regex: name, $options: 'i' }
        }).select('name email department specialization phone');

        res.status(200).json({
            success: true,
            count: doctors.length,
            data: doctors
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server',
            error: error.message
        });
    }
};

// Lấy bác sĩ theo phân trang
const getDoctorsPaginated = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const doctors = await Employee.find({ role: 'Doctor' })
            .select('name email department specialization phone')
            .skip(skip)
            .limit(limit);

        const total = await Employee.countDocuments({ role: 'Doctor' });

        res.status(200).json({
            success: true,
            count: doctors.length,
            total,
            page,
            totalPages: Math.ceil(total / limit),
            data: doctors
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server',
            error: error.message
        });
    }
};

// Lấy tất cả hồ sơ theo Employee ID
const getProfilesByUserId = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                success: false,
                message: 'ID người dùng không hợp lệ'
            });
        }

        const user = await User.findById(userId)
            .populate({
                path: 'profiles',
                select: 'name dateOfBirth gender diagnose note issues doctorId',
                populate: {
                    path: 'doctorId',
                    select: 'name email specialization'
                }
            });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy người dùng'
            });
        }

        res.status(200).json({
            success: true,
            count: user.profiles.length,
            data: user.profiles
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server',
            error: error.message
        });
    }
};


module.exports = {
    getAllDoctors, searchDoctorsByName, getDoctorsPaginated, getProfilesByUserId
}