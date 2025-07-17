// Update profile (luồng STAFF)
exports.updateProfile = async (req, res) => {
  try {
    const { profileId } = req.params;
    const {
      diagnose,
      note,
      issues,
      medicine,
      doctorId
    } = req.body;

    // Tìm profile theo ID
    const profile = await Profile.findById(profileId);
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy hồ sơ'
      });
    }

    // Cập nhật thông tin nếu có
    if (diagnose !== undefined) profile.diagnose = diagnose;
    if (note !== undefined) profile.note = note;
    if (issues !== undefined) profile.issues = issues;
    if (medicine !== undefined) profile.medicine = medicine;
    if (doctorId !== undefined) profile.doctorId = doctorId;

    const updatedProfile = await profile.save();

    res.status(200).json({
      success: true,
      message: 'Cập nhật hồ sơ thành công',
      data: updatedProfile
    });

  } catch (error) {
    console.error('Lỗi khi cập nhật hồ sơ:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server khi cập nhật hồ sơ',
      error: error.message
    });
  }
};
