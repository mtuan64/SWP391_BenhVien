// models/ProcedureResult.js
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
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending'
    },
    resultDetails: [ResultDetailSchema],
    resultNote: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ProcedureResult', ProcedureResultSchema);
