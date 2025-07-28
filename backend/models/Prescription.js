const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema({
    medicalRecordId: { type: mongoose.Schema.Types.ObjectId, ref: 'MedicalRecord' },
    medicines: [{
        name: String,
        dosage: String,
        frequency: String,
        duration: String,
        note: String
    }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }
}, { timestamps: true });
module.exports = mongoose.model('Prescription', prescriptionSchema);
