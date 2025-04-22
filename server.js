require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('Connection error:', err));

// Meeting Request Model
const RequestSchema = new mongoose.Schema({
    date: String,
    time: String,
    place: String,
    message: String,
    status: String,
    response: String,
    createdAt: { type: Date, default: Date.now }
});
const MeetingRequest = mongoose.model('MeetingRequest', RequestSchema);

// API Routes
// Get all requests
app.get('/api/requests', async (req, res) => {
    try {
        const requests = await MeetingRequest.find().sort({ createdAt: -1 });
        res.json(requests);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create new request
app.post('/api/requests', async (req, res) => {
    const request = new MeetingRequest({
        date: req.body.date,
        time: req.body.time,
        place: req.body.place,
        message: req.body.message,
        status: "",
        response: ""
    });

    try {
        const newRequest = await request.save();
        res.status(201).json(newRequest);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update request status
app.patch('/api/requests/:id', async (req, res) => {
    try {
        const updatedRequest = await MeetingRequest.findByIdAndUpdate(
            req.params.id,
            { 
                status: req.body.status,
                response: req.body.response 
            },
            { new: true }
        );
        res.json(updatedRequest);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));