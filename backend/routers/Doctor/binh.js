const express = require("express");
const router = express.Router();
const { checkticket, HasArrived, getDepartments, getAppointments, createSchedule, getScheduleByEmployeeAndDate, getTodayQueue, createOfflineTicket, createOnlineTicket, TaoProfile, LayDanhSachProfile, LayTatCaDanhSachProfile } = require('../../controller/doctor/binhtroller');
const Schedule = require('../../models/Schedule');
const Department = require('../../models/Department');
const Services = require('../../models/Service');
const ProcedureRequest = require('../../models/ProcedureRequest');
const Employee = require('../../models/Employee');
const MedicalRecord = require('../../models/MedicalRecord');
const Prescription = require('../../models/Prescription');
const Profile = require('../../models/Profile');
const Ticket = require('../../models/Ticket');
const ProcedureResult = require('../../models/ProcedureResult');

// router.get('/today', binhtroll.getTodayAppointmentsByDoctor);


///// tao schelde
// API để tạo hoặc cập nhật lịch khám cho bác sĩ
router.post('/taolich', createSchedule);
router.get('/lich', getScheduleByEmployeeAndDate);
router.post('/datlich', createOnlineTicket);

router.post('/staffdatlich', createOfflineTicket);

router.post('/taoprofile', TaoProfile);
router.get('/danhsachprofile', LayDanhSachProfile);
router.get('/danhsachprofile/tatca', LayTatCaDanhSachProfile);
router.get("/today-queue", getTodayQueue);

router.get('/appointments', getAppointments); // <-- thêm dòng này
router.get('/department', getDepartments); // <-- thêm dòng này

router.put('/arrived', HasArrived); // <-- thêm dòng này
router.get('/ticket/status', checkticket); // <-- thêm dòng này

/////
// routes/service.js
router.get('/dichvu', async (req, res) => {
    try {
        const services = await Services.find();
        res.json(services);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// routes/employee.js
router.get('/bacsixetnghiem', async (req, res) => {
    const query = {};
    if (req.query.role) query.role = req.query.role;

    try {
        const doctors = await Employee.find(query);
        res.json(doctors);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.get('/bacsi2', async (req, res) => {

    try {
        const doctors = await Employee.find({ role: "Doctor2" });
        res.json(doctors);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.patch('/updatemedicalrecord/:id', async (req, res) => {
    try {
        const updates = req.body;
        const record = await MedicalRecord.findByIdAndUpdate(req.params.id, updates, { new: true });

        if (!record) return res.status(404).json({ message: 'Không tìm thấy hồ sơ' });

        res.json(record);
    } catch (err) {
        console.error('Lỗi cập nhật hồ sơ:', err);
        res.status(500).json({ message: 'Lỗi cập nhật hồ sơ bệnh án' });
    }
});
// routes/medicalRecord.js
router.post('/taohosobenhnhan', async (req, res) => {
    try {
        const { profileId, doctorId, createdBy, symptoms, diagnosis, conclusion, status } = req.body;

        const record = new MedicalRecord({
            profileId,
            doctorId,
            createdBy,
            symptoms,
            diagnosis,
            conclusion,
            status: status || 'Exam'
        });

        await record.save();
        res.status(201).json(record);
    } catch (err) {
        console.error('Lỗi tạo hồ sơ:', err);
        res.status(500).json({ message: 'Lỗi tạo hồ sơ bệnh án' });
    }
});
// routes/procedureRequest.js
router.post('/chidinhdichvu', async (req, res) => {
    try {
        const {
            medicalRecordId,
            profileId,
            doctorId,
            services // [{ serviceId, scheduledTime?, status?, doctorId }]
        } = req.body;

        const formattedServices = services.map(s => ({
            serviceId: s.serviceId,
            scheduledTime: s.scheduledTime || null,
            status: s.status || 'Waiting',
            doctorId2: s.doctorId,
            testType: s.testType || 'other'
        }));

        const request = await ProcedureRequest.create({
            medicalRecordId,
            profileId,
            doctorId,
            services: formattedServices
        });
        await MedicalRecord.findByIdAndUpdate(
            medicalRecordId,
            { $push: { procedureRequests: request._id } }
        );
        res.status(201).json(request);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
router.patch('/updateticket/:id', async (req, res) => {
    try {
        const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
        res.json(ticket);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.post('/taodonthuoc', async (req, res) => {
    try {
        const {
            medicalRecordId,
        } = req.body;
        const prescription = await Prescription.create(req.body);
        await MedicalRecord.findByIdAndUpdate(
            medicalRecordId,
            { $push: { prescriptions: prescription._id } }
        );
        res.status(201).json(prescription);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
// routes/medicalRecord.js
router.patch('/capnhathosobenhan/:id', async (req, res) => {
    try {
        const record = await MedicalRecord.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!record) return res.status(404).json({ message: 'Medical record not found' });
        res.json(record);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
router.get('/medicalrecord/:id', async (req, res) => {
    try {
        const record = await MedicalRecord.findById(req.params.id)
            .populate('prescriptions')
            .populate({
                path: 'procedureRequests',
                populate: {
                    path: 'services.serviceId',
                    model: 'Services'
                }
            });

        if (!record) return res.status(404).json({ message: 'Không tìm thấy hồ sơ' });

        res.json(record);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/danhsachhosocuatatcabenhnhan', async (req, res) => {
    const { search = '', gender, sortBy = 'name', page = 1, limit = 10 } = req.query;

    const filter = {
        ...(gender && { gender }),
        ...(search && {
            $or: [
                { name: { $regex: search, $options: 'i' } },
                { identityNumber: { $regex: search, $options: 'i' } }
            ]
        })
    };

    const total = await Profile.countDocuments(filter);
    const profiles = await Profile.find(filter)
        .sort({ [sortBy]: 1 })
        .skip((page - 1) * limit)
        .limit(parseInt(limit));

    res.json({ profiles, total });
});
router.get('/danhsachhosobenhancuabenhnhan', async (req, res) => {
    const { profileId } = req.query;

    if (!profileId) return res.status(400).json({ message: 'Missing profileId' });

    const records = await MedicalRecord.find({ profileId }).populate({
        path: 'procedureRequests',
        populate: {
            path: 'services',
            model: 'Service'
        }
    });
    res.json(records);
});
router.get('/ketquakham', async (req, res) => {
    try {
        const { procedureRequestId, testType } = req.query;

        if (!procedureRequestId || !testType) {
            return res.status(400).json({ message: 'Thiếu procedureRequestId hoặc testType' });
        }

        const result = await ProcedureResult.findOne({
            procedureRequestId,
            testType
        });

        if (!result) {
            return res.status(404).json({ message: 'Không tìm thấy kết quả xét nghiệm' });
        }

        res.json(result);
    } catch (error) {
        console.error('Lỗi khi lấy kết quả xét nghiệm:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
}
);

module.exports = router;
