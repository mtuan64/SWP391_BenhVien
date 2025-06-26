const Profile = require("../../models/Profile");
const Employee = require('../../models/Employee');
const Medicine = require("../../models/Medicine");

exports.getAllProfile = async (req, res) => {
  try {
    const profiles = await Profile.find()
      .populate('doctorId', 'name')
      .populate('medicine', 'name type unitPrice');
    res.json(profiles);
  } catch (error) {
    console.error('Lỗi khi lấy tất cả hồ sơ:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.createProfile = async (req, res) => {
  try {
    const { name, dateOfBirth, gender, diagnose, note, issues, doctorId, medicine } = req.body;
    if (!name || !dateOfBirth || !gender) {
      return res.status(400).json({ message: 'Tên, ngày sinh và giới tính là bắt buộc' });
    }
    if (!['Male', 'Female', 'Other'].includes(gender)) {
      return res.status(400).json({ message: 'Giới tính không hợp lệ' });
    }
    const profile = new Profile({ name, dateOfBirth, gender, diagnose, note, issues, doctorId, medicine });
    const savedProfile = await profile.save();
    const populatedProfile = await Profile.findById(savedProfile._id)
      .populate('doctorId', 'name email role')
      .populate('medicine', 'name type unitPrice');
    res.status(201).json(populatedProfile);
  } catch (error) {
    console.error('Lỗi khi tạo hồ sơ:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, dateOfBirth, gender, diagnose, note, issues, doctorId, medicine } = req.body;
    if (!name || !dateOfBirth || !gender) {
      return res.status(400).json({ message: 'Tên, ngày sinh và giới tính là bắt buộc' });
    }
    if (!['Male', 'Female', 'Other'].includes(gender)) {
      return res.status(400).json({ message: 'Giới tính không hợp lệ' });
    }
    const profile = await Profile.findByIdAndUpdate(
      id,
      { name, dateOfBirth, gender, diagnose, note, issues, doctorId, medicine },
      { new: true }
    )
      .populate('doctorId', 'name email role')
      .populate('medicine', 'name type unitPrice');
    if (!profile) {
      return res.status(404).json({ message: 'Hồ sơ không tìm thấy' });
    }
    res.json(profile);
  } catch (error) {
    console.error('Lỗi khi sửa hồ sơ:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await Profile.findByIdAndDelete(id);
    if (!profile) {
      return res.status(404).json({ message: 'Hồ sơ không tìm thấy' });
    }
    res.json({ message: 'Hồ sơ đã được xóa thành công' });
  } catch (error) {
    console.error('Lỗi khi xóa hồ sơ:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.getDoctors = async (req, res) => {
  try {
    const doctors = await Employee.find({ role: 'Doctor' }).select('name email role');
    res.json(doctors);
  } catch (error) {
    console.error('Lỗi khi lấy danh sách bác sĩ:', error);
    res.status(500).json({ message: 'Lỗi server khi lấy danh sách bác sĩ' });
  }
};

exports.getAllMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find().select('name type unitPrice');
    res.json(medicines);
  } catch (error) {
    console.error('Lỗi khi lấy danh sách thuốc:', error);
    res.status(500).json({ message: 'Lỗi server khi lấy thuốc' });
  }
};