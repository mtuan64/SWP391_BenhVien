const Appointment = require("../../models/Appointment");
const Schedule = require("../../models/Schedule");
const User = require("../../models/User");
const sendMail = require("../../utils/sendMail");

exports.createAppointment = async (req, res) => {
  try {
    const {
      userId,
      profileId,
      doctorId,
      department,
      appointmentDate,
      type
    } = req.body;

    if (!userId || !profileId || !doctorId || !department || !appointmentDate || !type) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const dateObj = new Date(appointmentDate);
    if (dateObj < new Date()) {
      return res.status(400).json({ message: "Cannot book appointment in the past" });
    }

    const existing = await Appointment.findOne({
      doctorId,
      appointmentDate: dateObj,
      status: { $in: ["Booked", "In-Progress"] }
    });

    if (existing) {
      return res.status(409).json({ message: "Doctor is already booked at this time" });
    }

    const schedule = await Schedule.findOne({
      employeeId: doctorId,
      date: appointmentDate.toString().substring(0, 10)
    });

    if (!schedule) {
      return res.status(400).json({ message: "Doctor is not scheduled to work on this date" });
    }

    const appointment = new Appointment({
      userId,
      profileId,
      doctorId,
      department,
      appointmentDate: dateObj,
      type
    });

    await appointment.save();

    const user = await User.findById(userId);
    if (user) {
      await sendMail(
        user.email,
        "Appointment Confirmation",
        `<p>Your appointment has been successfully booked on ${appointmentDate}.</p>`
      );
    }

    res.status(201).json({ message: "Appointment created", appointment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    const { userId } = req.query;
    const appointments = await Appointment.find({
      userId,
      status: "Booked"
    }).populate("doctorId").populate("profileId");
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: "Appointment not found" });

    appointment.status = "Canceled";
    await appointment.save();

    const schedule = await Schedule.findOne({
      employeeId: appointment.doctorId,
      date: appointment.appointmentDate.toISOString().substring(0, 10)
    });

    if (schedule) {
      const slotIndex = schedule.timeSlots.findIndex(slot =>
        new Date(slot.startTime).getTime() === new Date(appointment.appointmentDate).getTime()
      );
      if (slotIndex !== -1) {
        schedule.timeSlots[slotIndex].status = "Available";
        await schedule.save();
      }
    }

    res.json({ message: "Appointment canceled successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.rescheduleAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    const { newDate } = req.body;

    if (!appointment) return res.status(404).json({ message: "Appointment not found" });

    const conflict = await Appointment.findOne({
      doctorId: appointment.doctorId,
      appointmentDate: newDate,
      status: { $in: ["Booked", "In-Progress"] }
    });

    if (conflict) return res.status(409).json({ message: "Time slot is already booked" });

    appointment.appointmentDate = newDate;
    appointment.status = "Booked";
    await appointment.save();

    res.json({ message: "Appointment rescheduled", appointment });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getAppointmentHistory = async (req, res) => {
  try {
    const { userId } = req.query;
    const history = await Appointment.find({
      userId,
      status: { $in: ["Completed", "Canceled"] }
    }).populate("doctorId").populate("profileId");
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.sendReminders = async (req, res) => {
  try {
    const now = new Date();
    const upcoming = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    const appointments = await Appointment.find({
      appointmentDate: { $gte: now, $lte: upcoming },
      status: "Booked",
      reminderSent: false
    }).populate("userId");

    for (const apm of appointments) {
      if (apm.userId?.email) {
        await sendMail(
          apm.userId.email,
          "Appointment Reminder",
          `<p>This is a reminder for your appointment on ${apm.appointmentDate}.</p>`
        );
        apm.reminderSent = true;
        await apm.save();
      }
    }

    res.json({ message: `Sent reminders for ${appointments.length} appointments.` });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};