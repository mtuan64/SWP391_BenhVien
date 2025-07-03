const mongoose = require('mongoose');

const labTestSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    sampleType: {
        type: String,
        required: true,
    },
    collectionDate: {
        type: Date,
        default: Date.now,
    },
    collectedBy: {
        type: String,
        required: true,
    },
    containerType: {
        type: String,
        required: true,
    },
    result: {
        type: String,
        default: '',
    },
    status: {
        type: String,
        default: "pending",
    }
}, { timestamps: true });

module.exports = mongoose.model('LabTest', labTestSchema);
