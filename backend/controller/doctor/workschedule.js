const Schedule = require("../../models/Schedule"); // đường dẫn đúng đến model của bạn

const getByDoctor = async (req, res) => {
  const doctorId = req.params.id;

  try {
    const schedules = await Schedule.find({ employeeId: doctorId });
    res.status(200).json({ data: schedules });
  } catch (error) {
    res.status(500).json({ msg: "Lỗi server", error });
  }
};

module.exports = { getByDoctor };
