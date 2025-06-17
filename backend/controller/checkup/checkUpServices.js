const Profile = require('../../models/Profile'); // Adjust path
const Employee = require('../../models/Employee'); // Adjust path
const User = require('../../models/User');
const LabTest = require('../../models/LabTest');
const createCheckup = async (req, res) => {
  try {
    const { patientId, doctorId, date, time, symptoms } = req.body;
    if (!patientId || !doctorId || !date || !time || !symptoms) {
      return res.status(400).json({ message: "All fields are required" });
    }

    return res.status(201).json({ message: "Checkup created successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Lấy kết quả labtest của một profile
const LabTestbyProfileId = async (req, res) => {
  try {
    const { profileId } = req.params;

    // Kiểm tra xem profile có thuộc về user không
    const profile = await Profile.findOne({ _id: profileId });
    if (!profile) {
      return res.status(404).json({ message: 'Profile không tồn tại hoặc không thuộc về bạn' });
    }

    // Lấy danh sách labtest của profile
    const labTests = await LabTest.find({ profile: profileId }).sort({ collectionDate: -1 });
    res.json(labTests);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

module.exports = {
  createCheckup, LabTestbyProfileId
}