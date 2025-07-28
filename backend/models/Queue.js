const mongoose = require('mongoose');

const queueSchema = new mongoose.Schema({
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    date: { type: Date, required: true },
    tickets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' }]
});

queueSchema.index({ doctorId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Queue', queueSchema);
