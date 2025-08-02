// POST /api/appointments/online
const Appointment = require('../../models/Appointment');
const Schedule = require('../../models/Schedule');
const moment = require('moment');
const Profile = require('../../models/Profile');
const Ticket = require('../../models/Ticket');
const Employee = require('../../models/Employee');
const Queue = require('../../models/Queue');
const Department = require('../../models/Department');
// controller/doctor/binhtroller.js

exports.checkticket = async (req, res) => {
    const { doctorId, profileId, date, ticketNumber } = req.query;

    if (!doctorId || !profileId || !date || ticketNumber == null) {
        return res.status(400).json({ message: 'Thiếu thông tin' });
    }

    try {
        const start = new Date(date);
        start.setHours(0, 0, 0, 0);
        const end = new Date(date);
        end.setHours(23, 59, 59, 999);

        const ticket = await Ticket.findOne({
            doctorId,
            patientId: profileId,
            date: { $gte: start, $lte: end },
            queueNumber: Number(ticketNumber),
        });

        if (!ticket) return res.status(404).json({ message: 'Không tìm thấy ticket' });

        res.json({ status: ticket.status });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Lỗi server' });
    }
};


exports.HasArrived = async (req, res) => {
    const { doctorId, profileId, date, ticketNumber } = req.body;

    if (!doctorId || !profileId || !date || ticketNumber == null) {
        return res.status(400).json({ message: 'Thiếu thông tin yêu cầu' });
    }

    try {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        const ticket = await Ticket.findOneAndUpdate(
            {
                doctorId,
                patientId: profileId,
                date: { $gte: startOfDay, $lte: endOfDay },
                queueNumber: ticketNumber,
                status: 'Waiting'
            },
            { status: 'Completed' },
            { new: true }
        );

        if (!ticket) {
            return res.status(404).json({ message: 'Không tìm thấy ticket phù hợp hoặc đã được xử lý' });
        }

        res.json(ticket);
    } catch (error) {
        console.error('Lỗi cập nhật ticket:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
}


exports.getDepartments = async (req, res) => {
    try {
        const departments = await Department.find();
        res.json(departments);
    } catch (err) {
        console.error('Lỗi khi lấy danh sách khoa:', err);
        res.status(500).json({ message: 'Lỗi server' });
    }
};


exports.getAppointments = async (req, res) => {
    try {
        const { status, department, date } = req.query;

        const filter = {};

        if (status) filter.status = status;
        if (department) filter.department = department;
        if (date) {
            const d = new Date(date);
            const start = new Date(d.setHours(0, 0, 0, 0));
            const end = new Date(d.setHours(23, 59, 59, 999));
            filter.appointmentDate = { $gte: start, $lte: end };
        }

        const appointments = await Appointment.find(filter)
            .populate('profileId')
            .populate('doctorId')
            .populate('department');

        res.json(appointments);
    } catch (err) {
        console.error('❌ getAppointments error:', err);
        res.status(500).json({ message: 'Lỗi server' });
    }
};


// exports.getTodayQueue = async (req, res) => {
//     try {
//         const { doctorId, date } = req.query;

//         if (!doctorId || !date) {
//             return res.status(400).json({ message: "Thiếu doctorId hoặc date" });
//         }

//         const targetDate = new Date(date);
//         targetDate.setHours(0, 0, 0, 0);

//         const queue = await Queue.findOne({
//             doctorId,
//             date: targetDate
//         }).populate({
//             path: 'tickets',
//             populate: [
//                 {
//                     path: 'patientId',
//                     model: 'Profile'
//                 },
//                 {
//                     path: 'medicalRecordId',
//                     model: 'MedicalRecord'
//                 }
//             ]
//         });

//         if (!queue) {
//             return res.status(200).json([]);
//         }

//         res.status(200).json(queue.tickets);
//     } catch (err) {
//         console.error("❌ Lỗi khi lấy hàng chờ:", err);
//         res.status(500).json({ message: "Lỗi server khi lấy danh sách bệnh nhân." });
//     }
// };


exports.getTodayQueue = async (req, res) => {
    try {
        const { doctorId, date } = req.query;

        if (!doctorId || !date) {
            return res.status(400).json({ message: "Thiếu doctorId hoặc date" });
        }

        const targetDate = new Date(date);
        targetDate.setHours(0, 0, 0, 0);

        const queue = await Queue.findOne({
            doctorId,
            date: targetDate
        }).populate({
            path: 'tickets',
            populate: [
                {
                    path: 'patientId',
                    model: 'Profile'
                },
                {
                    path: 'medicalRecordId',
                    model: 'MedicalRecord',
                    populate: {
                        path: 'procedureRequests',
                        model: 'ProcedureRequest'
                    }
                }
            ]
        });

        if (!queue) {
            return res.status(200).json([]);
        }

        res.status(200).json(queue.tickets);
    } catch (err) {
        console.error("❌ Lỗi khi lấy hàng chờ:", err);
        res.status(500).json({ message: "Lỗi server khi lấy danh sách bệnh nhân." });
    }
};


exports.LayDanhSachProfile = async (req, res) => {
    try {
        const userId = req.query.userId;

        if (!userId) {
            return res.status(400).json({ message: 'Thiếu userId trong query' });
        }

        const profiles = await Profile.find({ userId });

        res.status(200).json(profiles);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.LayTatCaDanhSachProfile = async (req, res) => {
    try {
        const identityNumber = req.query.cccd;

        const profiles = await Profile.find({ identityNumber });

        res.status(200).json(profiles);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.TaoProfile = async (req, res) => {
    try {
        const { name, dateOfBirth, gender, identityNumber } = req.body;
        const userId = req.query.userId;

        if (!userId) {
            const newProfile = new Profile({
                name,
                dateOfBirth,
                gender,
                identityNumber,
            });
            const savedProfile = await newProfile.save();
            res.status(201).json(savedProfile);
        }
        else {
            const newProfile = new Profile({
                name,
                dateOfBirth,
                gender,
                identityNumber,
                userId,
            });

            const savedProfile = await newProfile.save();
            res.status(201).json(savedProfile);
        }

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



exports.getScheduleByEmployeeAndDate = async (req, res) => {
    const { employeeId, date } = req.query;

    if (!employeeId || !date) {
        return res.status(400).json({ message: "Thiếu employeeId hoặc date" });
    }

    try {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        const schedule = await Schedule.findOne({
            employeeId,
            date: { $gte: startOfDay, $lte: endOfDay },
        });

        if (!schedule) {
            return res.status(200).json({ timeSlots: [] }); // Không có lịch
        }

        return res.status(200).json(schedule);
    } catch (err) {
        console.error("Lỗi khi lấy lịch:", err);
        return res.status(500).json({ message: "Lỗi server" });
    }
};
// POST /api/appointments/book
function normalizeDateOnly(dateStr) {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return null;
    date.setHours(0, 0, 0, 0);
    return date;
}

exports.createOnlineTicket = async (req, res) => {
    try {
        const { profileId, doctorId, date, timeSlot, department } = req.body;
        console.log('📅 Date từ client gửi lên:', date);
        var patientId = profileId;
        const normalizedDate = normalizeDateOnly(date);
        if (!normalizedDate) {
            return res.status(400).json({ message: 'Ngày không hợp lệ.' });
        }

        const selectedDate = new Date(date);
        const nextDate = new Date(selectedDate);
        nextDate.setDate(nextDate.getDate() + 1);

        const schedule = await Schedule.findOne({
            employeeId: doctorId,
            date: {
                $gte: selectedDate,
                $lt: nextDate
            }
        });

        if (!schedule || !Array.isArray(schedule.timeSlots)) {
            return res.status(400).json({ message: 'Bác sĩ không có lịch làm việc trong ngày đã chọn.' });
        }

        const slotIndex = schedule.timeSlots.findIndex(slot =>
            new Date(slot.startTime).getTime() === new Date(timeSlot.startTime).getTime() &&
            new Date(slot.endTime).getTime() === new Date(timeSlot.endTime).getTime()
        );

        if (slotIndex === -1) {
            return res.status(400).json({ message: 'Thời gian đã chọn không hợp lệ.' });
        }

        schedule.timeSlots[slotIndex].status = 'Booked';
        await schedule.save();

        const queueNumber = slotIndex + 1;

        const newTicket = new Ticket({
            patientId,
            doctorId,
            department,
            date: normalizedDate,
            queueNumber,
            type: 'Online',
            status: 'Waiting',
            statusMedical: 'Exam',
        });

        const newAppointment = new Appointment({
            profileId: patientId,
            doctorId,
            department,
            appointmentDate: normalizedDate,
            type: 'Online',
            status: 'Booked',
            timeSlot: {
                startTime: new Date(timeSlot.startTime),
                endTime: new Date(timeSlot.endTime),
                status: 'Booked',
            },
            ticketNumber: queueNumber,
        });

        await Promise.all([
            newTicket.save(),
            newAppointment.save()
        ]);

        const queue = await Queue.findOne({ doctorId, date: normalizedDate });

        if (!queue) {
            const newQueue = new Queue({
                doctorId,
                date: normalizedDate,
                type: "Online",
                department: department,
                tickets: [newTicket._id]
            });
            await newQueue.save();
        } else {
            if (!queue.tickets.includes(newTicket._id)) {
                queue.tickets.push(newTicket._id);
                await queue.save();
            }
        }

        res.status(201).json({
            message: 'Đặt lịch thành công',
            ticket: newTicket,
            appointment: newAppointment
        });
    } catch (error) {
        console.error('❌ Error creating ticket & appointment:', error);
        res.status(500).json({ message: 'Lỗi server khi đặt lịch' });
    }
};
exports.createOfflineTicket = async (req, res) => {
    try {
        const { profileId, doctorId, date, timeSlot, department } = req.body;
        console.log('📅 Date từ client gửi lên:', date);
        var patientId = profileId;
        const normalizedDate = normalizeDateOnly(date);
        if (!normalizedDate) {
            return res.status(400).json({ message: 'Ngày không hợp lệ.' });
        }

        const selectedDate = new Date(date);
        const nextDate = new Date(selectedDate);
        nextDate.setDate(nextDate.getDate() + 1);

        const schedule = await Schedule.findOne({
            employeeId: doctorId,
            date: {
                $gte: selectedDate,
                $lt: nextDate
            }
        });

        if (!schedule || !Array.isArray(schedule.timeSlots)) {
            return res.status(400).json({ message: 'Bác sĩ không có lịch làm việc trong ngày đã chọn.' });
        }

        const slotIndex = schedule.timeSlots.findIndex(slot =>
            new Date(slot.startTime).getTime() === new Date(timeSlot.startTime).getTime() &&
            new Date(slot.endTime).getTime() === new Date(timeSlot.endTime).getTime()
        );

        if (slotIndex === -1) {
            return res.status(400).json({ message: 'Thời gian đã chọn không hợp lệ.' });
        }

        schedule.timeSlots[slotIndex].status = 'Booked';
        await schedule.save();

        const queueNumber = slotIndex + 1;

        const newTicket = new Ticket({
            patientId,
            doctorId,
            department,
            date: normalizedDate,
            queueNumber,
            type: 'Offline',
            status: 'Completed',
            statusMedical: 'Exam',

        });

        const newAppointment = new Appointment({
            profileId: patientId,
            doctorId,
            department,
            appointmentDate: normalizedDate,
            type: 'Offline',
            status: 'Booked',
            timeSlot: {
                startTime: new Date(timeSlot.startTime),
                endTime: new Date(timeSlot.endTime),
                status: 'Booked',
            },
            ticketNumber: queueNumber,
        });

        await Promise.all([
            newTicket.save(),
            newAppointment.save()
        ]);

        const queue = await Queue.findOne({ doctorId, date: normalizedDate });

        if (!queue) {
            const newQueue = new Queue({
                doctorId,
                date: normalizedDate,
                type: "Offline",
                department: department,
                tickets: [newTicket._id]
            });
            await newQueue.save();
        } else {
            if (!queue.tickets.includes(newTicket._id)) {
                queue.tickets.push(newTicket._id);
                await queue.save();
            }
        }

        res.status(201).json({
            message: 'Đặt lịch thành công',
            ticket: newTicket,
            appointment: newAppointment
        });
    } catch (error) {
        console.error('❌ Error creating ticket & appointment:', error);
        res.status(500).json({ message: 'Lỗi server khi đặt lịch' });
    }
};


exports.bookOnlineAppointment = async (req, res) => {
    try {
        const { userId, profileId, doctorId, department, appointmentDate, type } = req.body;

        const dateStart = moment(appointmentDate).startOf('day');
        const dateEnd = moment(appointmentDate).endOf('day');

        // 1. Lấy lịch làm việc của bác sĩ hôm đó
        const schedule = await Schedule.findOne({
            employeeId: doctorId,
            date: { $gte: dateStart.toDate(), $lte: dateEnd.toDate() },
        });

        if (!schedule) {
            return res.status(404).json({ message: 'Bác sĩ không có lịch khám hôm đó' });
        }

        // 2. Lấy slot còn trống
        const availableSlot = schedule.timeSlots.find(slot => slot.status === 'Available');

        if (!availableSlot) {
            return res.status(400).json({ message: 'Không còn slot trống' });
        }

        // 3. Đánh dấu slot là Booked
        availableSlot.status = 'Booked';
        await schedule.save();

        // 4. Tính số phiếu = số slot đã được booked trước đó + 1
        const allBooked = schedule.timeSlots.filter(s => s.status === 'Booked');
        const ticketNumber = allBooked.findIndex(s => s.startTime.getTime() === availableSlot.startTime.getTime()) + 1;

        // 5. Tạo Appointment
        const newAppointment = await Appointment.create({
            userId,
            profileId,
            doctorId,
            department,
            appointmentDate,
            type: type || 'Online',
            timeSlot: availableSlot,
            ticketNumber,
        });

        res.json({
            message: 'Đặt lịch thành công',
            ticketNumber,
            appointment: newAppointment
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Lỗi server' });
    }
};



////// api tao schele
function generateTimeSlots(dateStr, startHour = 8, endHour = 17, duration = 15) {
    const slots = [];
    const date = new Date(dateStr);
    let current = new Date(date.setHours(startHour, 0, 0, 0));
    const end = new Date(date.setHours(endHour, 0, 0, 0));

    while (current < end) {
        const startTime = new Date(current);
        const endTime = new Date(current.getTime() + duration * 60 * 1000);

        slots.push({
            startTime,
            endTime,
            duration,
            status: 'Available',
        });

        current = endTime;
    }

    return slots;
}


exports.createSchedule = async (req, res) => {
    try {
        const { employeeId, department, date } = req.body;

        // Generate time slots từ 8:00 - 17:00
        const timeSlots = generateTimeSlots(date);

        const schedule = new Schedule({
            employeeId,
            department,
            date,
            timeSlots,
        });

        await schedule.save();

        res.status(201).json({ message: 'Schedule created', schedule });
    } catch (err) {
        res.status(500).json({ message: 'Error creating schedule', error: err.message });
    }
};
