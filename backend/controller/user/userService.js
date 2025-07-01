const Appointment = require("../../models/Appointment");
const { sendAppointmentConfirmation } = require("../../utils/mailService");
const User = require("../../models/User");
const Profile = require("../../models/Profile");
const Employee = require("../../models/Employee");

// Đặt lịch khám
exports.createAppointment = async (req, res) => {
    const { profileId, doctorId, department, appointmentDate, type } = req.body;
    const userId = req.cc.id;

    try {
        // Kiểm tra xem bác sĩ đã có lịch vào giờ này chưa
        const existingAppointment = await Appointment.findOne({
            doctorId,
            appointmentDate: new Date(appointmentDate),
            status: { $ne: 'Canceled' }
        });

        if (existingAppointment) {
            return res.status(409).json({
                message: 'This doctor already has an appointment at the selected time.'
            });
        }

        // Nếu không trùng thì tạo mới lịch khám
        const newAppointment = new Appointment({
            userId,
            profileId,
            doctorId,
            department,
            appointmentDate,
            type,
            status: 'Booked'
        });

        await newAppointment.save();

        const [user, profile, doctor] = await Promise.all([
            User.findById(userId),
            Profile.findById(profileId),
            Employee.findById(doctorId)
        ]);

        await sendAppointmentConfirmation({
            to: user.email,
            patientName: profile.name,
            doctorName: doctor.name,
            date: appointmentDate,
            type
        });

        res.status(201).json({
            message: 'Appointment created successfully.',
            appointment: newAppointment
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to create appointment.',
            error: error.message
        });
    }
};


// Hiển thị toàn bộ danh sách đặt lịch của chính người dùng
exports.getAppointmentsByUser = async (req, res) => {
    const userId = req.cc.id;

    try {
        const appointments = await Appointment.find({ userId })
            .populate('profileId doctorId')
            .sort({ appointmentDate: -1 });

        res.status(200).json(appointments);
    } catch (err) {
        res.status(500).json({ message: 'Failed to get appointments', error: err.message });
    }
};

// Hủy lịch hẹn
exports.cancelAppointment = async (req, res) => {
    const { id } = req.params;
    const userId = req.cc.id;

    try {
        const appointment = await Appointment.findOne({ _id: id, userId });
        if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

        if (appointment.status === 'Canceled') {
            return res.status(400).json({ message: 'Appointment is already canceled' });
        }

        appointment.status = 'Canceled';
        await appointment.save();

        res.status(200).json({ message: 'Appointment canceled successfully', appointment });
    } catch (err) {
        res.status(500).json({ message: 'Failed to cancel appointment', error: err.message });
    }
};
