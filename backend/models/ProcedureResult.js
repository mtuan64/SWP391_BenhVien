const mongoose = require('mongoose');

const ResultDetailSchema = new mongoose.Schema({
    name: { type: String, required: true },
    value: { type: String, required: true },
    unit: { type: String },
    referenceRange: { type: String }
});

const ProcedureResultSchema = new mongoose.Schema({
    procedureRequestId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProcedureRequest',
        required: true
    },
    testType: {
        type: String,
        enum: ['blood', 'urine', 'xray', 'ultrasound', 'ecg', 'lipid'],
        required: true
    },
    resultDetails: [ResultDetailSchema],
    resultNote: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update timestamp on save
ProcedureResultSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('ProcedureResult', ProcedureResultSchema);