const mongoose = require('mongoose');
const MedicalRecord = require('../../models/MedicalRecord'); // Adjust path
const Profile = require('../../models/Profile'); // Adjust path
const Employee = require('../../models/Employee'); // Adjust path
const User = require('../../models/User');
const createMedicalRecord = async (req, res) => {
    console.log("dd");
    try {
        const { userId, profileId, doctorId, diagnose, treatment, notes } = req.body;
        console.log(req.body);
        // Kiểm tra các trường bắt buộc
        if (!userId || !profileId || !doctorId || !diagnose || !treatment) {
            return res.status(400).json({
                success: false,
                message: 'Vui lòng cung cấp đầy đủ userId, profileId, doctorId, diagnose và treatment'
            });
        }

        // Kiểm tra userId hợp lệ
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: 'ID người dùng không hợp lệ' });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'Không tìm thấy người dùng' });
        }

        // Kiểm tra profileId hợp lệ và thuộc user
        if (!mongoose.Types.ObjectId.isValid(profileId)) {
            return res.status(400).json({ success: false, message: 'ID hồ sơ không hợp lệ' });
        }
        const profile = await Profile.findById(profileId);
        if (!profile || !user.profiles.includes(profileId)) {
            return res.status(404).json({ success: false, message: 'Hồ sơ không tồn tại hoặc không thuộc người dùng' });
        }

        // Kiểm tra doctorId hợp lệ
        if (!mongoose.Types.ObjectId.isValid(doctorId)) {
            return res.status(400).json({ success: false, message: 'ID bác sĩ không hợp lệ' });
        }
        const doctor = await Employee.findById(doctorId);
        // if (!doctor || doctor.role !== 'Doctor') {
        //     return res.status(400).json({ success: false, message: 'ID bác sĩ không hợp lệ hoặc không phải bác sĩ' });
        // }

        // Tạo MedicalRecord
        const medicalRecord = await MedicalRecord.create({
            userId,
            profileId,
            doctorId,
            diagnose,
            treatment,
            notes,
            createdBy: doctorId // Giả định bác sĩ tạo là bác sĩ phụ trách
        });

        res.status(201).json({
            success: true,
            data: medicalRecord
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server',
            error: error.message
        });
    }
};
const allMedicalRecord = async (req, res) => {
    try {
        const { page = 1, limit = 10, search, profileId } = req.query;
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const skip = (pageNum - 1) * limitNum;

        let query = {};

        // Tìm theo tên hồ sơ nếu có search
        if (search) {
            const profileIds = await Profile.find({
                name: { $regex: search, $options: 'i' }
            }).distinct('_id');
            query.profileId = { $in: profileIds };
        }

        // Nếu có profileId thì kết hợp với điều kiện hiện tại
        if (profileId) {
            if (query.profileId && query.profileId.$in) {
                // Nếu đã có điều kiện $in từ search thì lấy giao giữa search và profileId
                query.profileId.$in = query.profileId.$in.filter(
                    id => id.toString() === profileId
                );

                // Nếu không còn ID nào khớp, trả về rỗng ngay
                if (query.profileId.$in.length === 0) {
                    return res.status(200).json({
                        success: true,
                        count: 0,
                        total: 0,
                        page: pageNum,
                        totalPages: 0,
                        data: []
                    });
                }
            } else {
                // Nếu không có search thì chỉ lọc theo profileId
                query.profileId = profileId;
            }
        }

        // Lấy danh sách hồ sơ bệnh án
        const medicalRecords = await MedicalRecord.find(query)
            .populate('userId', 'name email')
            .populate('profileId', 'name gender dateOfBirth')
            .populate('doctorId', 'name email specialization')
            .populate('createdBy', 'name email')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitNum);

        const total = await MedicalRecord.countDocuments(query);

        res.status(200).json({
            success: true,
            count: medicalRecords.length,
            total,
            page: pageNum,
            totalPages: Math.ceil(total / limitNum),
            data: medicalRecords
        });
    } catch (error) {
        console.error('Error in allMedicalRecord:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi server',
            error: error.message
        });
    }
};

//
const editMedicalRecord = async (req, res) => {
    try {
        const { diagnose, treatment, notes } = req.body;
        const updatedRecord = await MedicalRecord.findByIdAndUpdate(
            req.params.id,
            { diagnose, treatment, notes },
            { new: true }
        );
        if (!updatedRecord) {
            return res.status(404).json({ message: 'Không tìm thấy hồ sơ' });
        }
        res.json({ message: 'Cập nhật thành công', data: updatedRecord });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error });
    }
}

module.exports = {
    createMedicalRecord, allMedicalRecord, editMedicalRecord
}