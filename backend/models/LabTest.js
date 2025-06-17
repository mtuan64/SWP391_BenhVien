// models/LabTest.js
const mongoose = require('mongoose');

const labTestSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    gender: {
        type: String,
        enum: ['Nam', 'Nữ', 'Khác'],
        required: true,
    },
    sampleType: {
        type: String,
        required: true,
        trim: true,
    },
    collectionDate: {
        type: Date,
        required: true,
    },
    collectedBy: {
        type: String,
        required: true,
        trim: true,
    },
    containerType: {
        type: String,
        required: true,
        trim: true,
    },
    result: {
        type: String,
        default: '',
        trim: true,
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending',
    },
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
        required: true,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('LabTest', labTestSchema);