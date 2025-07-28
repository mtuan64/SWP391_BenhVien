const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    date: { type: Date, required: true },
    queueNumber: { type: Number, required: true }, // Ví dụ: số 5 trong ngày đó
    type: { type: String, enum: ['Online', 'Offline'], required: true },
    status: { type: String, enum: ['Waiting', 'Completed', 'Cancelled'], default: 'Waiting' },
    statusMedical: { type: String, enum: ['Labtest', 'Exam', 'Done'], default: 'Exam' },
    medicalRecordId: { type: mongoose.Schema.Types.ObjectId, ref: 'MedicalRecord' }

}, { timestamps: true });

ticketSchema.index({ doctorId: 1, date: 1, queueNumber: 1 }, { unique: true });

module.exports = mongoose.model('Ticket', ticketSchema);
