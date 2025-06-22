const Appointment = require("../../models/Appointment");

module.exports.getAll = async (req, res) => {
    const data = await Appointment.find({})
    res.status(200).json({
        data,
        message: "Created successfully"
    });
}