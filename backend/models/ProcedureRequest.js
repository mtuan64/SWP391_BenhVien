const mongoose = require('mongoose');

const procedureRequestSchema = new mongoose.Schema({
    medicalRecordId: { type: mongoose.Schema.Types.ObjectId, ref: 'MedicalRecord', required: true },
    profileId: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    requestedAt: { type: Date, default: Date.now },
    status: { type: String, enum: ['Pending', 'InProgress', 'Completed', 'Canceled'], default: 'Pending' },
    services: [{
        serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Services' },
        scheduledTime: Date,
        status: { type: String, enum: ['Waiting', 'InProgress', 'Completed'], default: 'Waiting' },
        resultFile: String,
        resultNote: String,
        doctorId2: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
       testType: { type: String, enum: ['blood', 'urine', 'xray', 'ultrasound', 'ecg', 'lipid'], required: true }
    }]
}, { timestamps: true });

module.exports = mongoose.model('ProcedureRequest', procedureRequestSchema);