const Profile = require("../../models/Profile");
const Employee = require('../../models/Employee');
const Medicine = require("../../models/Medicine");
const User = require("../../models/User");

// Hàm kiểm tra ngày sinh hợp lệ
const isValidDateOfBirth = (dateOfBirth) => {
  const currentDate = new Date();
  const inputDate = new Date(dateOfBirth);
  return inputDate <= currentDate;
};

// Get all profiles with user_code
exports.getAllProfile = async (req, res) => {
  try {
    const profiles = await Profile.find()
      .populate('user', 'name user_code')
      .populate('doctorId', 'name email role')
      .populate('medicine', 'name type unitPrice');

    const formattedProfiles = profiles.map(profile => ({
      _id: profile._id,
      name: profile.name,
      userName: profile.user?.name,
      userCode: profile.user?.user_code,
      dateOfBirth: profile.dateOfBirth,
      gender: profile.gender,
      diagnose: profile.diagnose,
      note: profile.note,
      issues: profile.issues,
      doctor: profile.doctorId ? {
        _id: profile.doctorId._id,
        name: profile.doctorId.name,
        email: profile.doctorId.email,
        role: profile.doctorId.role
      } : null,
      medicine: profile.medicine ? {
        _id: profile.medicine._id,
        name: profile.medicine.name,
        type: profile.medicine.type,
        unitPrice: profile.medicine.unitPrice
      } : null,
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt
    }));

    res.json({
      success: true,
      data: formattedProfiles
    });
  } catch (error) {
    console.error('Lỗi khi lấy tất cả hồ sơ:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server khi lấy danh sách hồ sơ',
      error: error.message
    });
  }
};

// Search user by user_code
exports.searchUserByCode = async (req, res) => {
  try {
    const { user_code } = req.params;

    if (!user_code) {
      return res.status(400).json({
        success: false,
        message: 'Mã người dùng là bắt buộc'
      });
    }

    const user = await User.findOne({ user_code }).select('name user_code');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy người dùng'
      });
    }

    res.json({
      success: true,
      data: {
        userId: user._id,
        name: user.name,
        user_code: user.user_code
      }
    });
  } catch (error) {
    console.error('Lỗi khi tìm kiếm người dùng:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server khi tìm kiếm người dùng',
      error: error.message
    });
  }
};

// Create profile (luồng STAFF)
exports.createProfile = async (req, res) => {
  try {
    const { name, identityNumber, dateOfBirth, gender } = req.body;

    // Kiểm tra các trường bắt buộc
    if (!name || !identityNumber || !dateOfBirth || !gender) {
      return res.status(400).json({
        success: false,
        message: 'Tên, CCCD, ngày sinh, và giới tính là bắt buộc'
      });
    }

    // Kiểm tra định dạng ngày sinh
    if (!isValidDateOfBirth(dateOfBirth)) {
      return res.status(400).json({
        success: false,
        message: 'Ngày sinh không được vượt quá ngày hiện tại'
      });
    }

    // Kiểm tra giới tính
    if (!['Male', 'Female', 'Other'].includes(gender)) {
      return res.status(400).json({
        success: false,
        message: 'Giới tính không hợp lệ'
      });
    }

    // Lưu hồ sơ
    const profile = new Profile({
      name,
      identityNumber,
      dateOfBirth,
      gender,
      createdBy: req.user._id // nhân viên đang đăng nhập tạo hồ sơ
    });

    const savedProfile = await profile.save();

    res.status(201).json({
      success: true,
      data: {
        _id: savedProfile._id,
        name: savedProfile.name,
        identityNumber: savedProfile.identityNumber,
        dateOfBirth: savedProfile.dateOfBirth,
        gender: savedProfile.gender,
        createdAt: savedProfile.createdAt
      }
    });
  } catch (error) {
    console.error('Lỗi khi tạo hồ sơ (staff):', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server khi tạo hồ sơ',
      error: error.message
    });
  }
};


// Update profile
exports.updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, dateOfBirth, gender, diagnose, note, issues, doctorId, medicine } = req.body;

    // Kiểm tra các trường bắt buộc
    if (!name || !dateOfBirth || !gender || !doctorId || !medicine) {
      return res.status(400).json({
        success: false,
        message: 'Tên, ngày sinh, giới tính, bác sĩ, và thuốc là bắt buộc'
      });
    }

    // Kiểm tra định dạng ngày sinh
    if (!isValidDateOfBirth(dateOfBirth)) {
      return res.status(400).json({
        success: false,
        message: 'Ngày sinh không được vượt quá ngày hiện tại'
      });
    }

    // Kiểm tra giới tính
    if (!['Male', 'Female', 'Other'].includes(gender)) {
      return res.status(400).json({
        success: false,
        message: 'Giới tính không hợp lệ'
      });
    }

    const doctor = await Employee.findById(doctorId);
    const medicineDoc = await Medicine.findById(medicine);
    if (!doctor || !medicineDoc) {
      return res.status(404).json({
        success: false,
        message: 'Bác sĩ hoặc thuốc không tìm thấy'
      });
    }

    const profile = await Profile.findByIdAndUpdate(
      id,
      { name, dateOfBirth, gender, diagnose, note, issues, doctorId, medicine },
      { new: true }
    )
      .populate('user', 'name user_code')
      .populate('doctorId', 'name email role')
      .populate('medicine', 'name type unitPrice');

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Hồ sơ không tìm thấy'
      });
    }

    res.json({
      success: true,
      data: {
        _id: profile._id,
        name: profile.name,
        userName: profile.user?.name,
        userCode: profile.user?.user_code,
        dateOfBirth: profile.dateOfBirth,
        gender: profile.gender,
        diagnose: profile.diagnose,
        note: profile.note,
        issues: profile.issues,
        doctor: profile.doctorId ? {
          _id: profile.doctorId._id,
          name: profile.doctorId.name,
          email: profile.doctorId.email,
          role: profile.doctorId.role
        } : null,
        medicine: profile.medicine ? {
          _id: profile.medicine._id,
          name: profile.medicine.name,
          type: profile.medicine.type,
          unitPrice: profile.medicine.unitPrice
        } : null,
        createdAt: profile.createdAt,
        updatedAt: profile.updatedAt
      }
    });
  } catch (error) {
    console.error('Lỗi khi sửa hồ sơ:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server khi sửa hồ sơ',
      error: error.message
    });
  }
};

// Delete profile
exports.deleteProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await Profile.findByIdAndDelete(id);
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Hồ sơ không tìm thấy'
      });
    }

    await User.findByIdAndUpdate(profile.user, {
      $pull: { profiles: profile._id }
    });

    res.json({
      success: true,
      message: 'Hồ sơ đã được xóa thành công'
    });
  } catch (error) {
    console.error('Lỗi khi xóa hồ sơ:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server khi xóa hồ sơ',
      error: error.message
    });
  }
};

// Get doctors
exports.getDoctors = async (req, res) => {
  try {
    const doctors = await Employee.find({ role: 'Doctor' }).select('name email role');
    res.json({
      success: true,
      data: doctors
    });
  } catch (error) {
    console.error('Lỗi khi lấy danh sách bác sĩ:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server khi lấy danh sách bác sĩ',
      error: error.message
    });
  }
};

// Get all medicines
exports.getAllMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find().select('name type unitPrice');
    res.json({
      success: true,
      data: medicines
    });
  } catch (error) {
    console.error('Lỗi khi lấy danh sách thuốc:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server khi lấy thuốc',
      error: error.message
    });
  }
};

// Get profiles by user_id
exports.getProfileByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;

    if (!user_id) {
      return res.status(400).json({
        success: false,
        message: 'ID người dùng là bắt buộc'
      });
    }

    const user = await User.findById(user_id).select('name user_code');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy người dùng'
      });
    }

    const profiles = await Profile.find({ user: user_id })
      .populate('user', 'name user_code')
      .populate('doctorId', 'name email role')
      .populate('medicine', 'name type unitPrice');

    const formattedProfiles = profiles.map(profile => ({
      _id: profile._id,
      name: profile.name,
      userName: profile.user?.name,
      userCode: profile.user?.user_code,
      dateOfBirth: profile.dateOfBirth,
      gender: profile.gender,
      diagnose: profile.diagnose,
      note: profile.note,
      issues: profile.issues,
      doctor: profile.doctorId ? {
        _id: profile.doctorId._id,
        name: profile.doctorId.name,
        email: profile.doctorId.email,
        role: profile.doctorId.role
      } : null,
      medicine: profile.medicine ? {
        _id: profile.medicine._id,
        name: profile.medicine.name,
        type: profile.medicine.type,
        unitPrice: profile.medicine.unitPrice
      } : null,
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt
    }));

    res.json({
      success: true,
      data: formattedProfiles
    });
  } catch (error) {
    console.error('Lỗi khi lấy hồ sơ theo user_id:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server khi lấy hồ sơ theo user_id',
      error: error.message
    });
  }
};