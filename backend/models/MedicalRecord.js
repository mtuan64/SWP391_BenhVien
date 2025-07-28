const mongoose = require('mongoose');

const medicalRecordSchema = new mongoose.Schema({
    profileId: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true },

    symptoms: {
        type: String,
    },
    diagnosis: {
        type: String,
    },
    conclusion: {
        type: String,
    },
    status: { type: String, enum: ['in-progress', 'completed'], default: 'in-progress' },

    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee"
    },

    procedureRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProcedureRequest' }],
    prescriptions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Prescription' }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' } // Bác sĩ tạo bản ghi
}, { timestamps: true });

module.exports = mongoose.model('MedicalRecord', medicalRecordSchema);