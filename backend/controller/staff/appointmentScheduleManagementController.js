const Appointment = require("../../models/Appointment");

exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};
