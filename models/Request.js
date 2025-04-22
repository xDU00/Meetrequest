const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
    date: { type: String, required: true },
    time: { type: String, required: true },
    place: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, default: '' },
    response: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Request', RequestSchema);