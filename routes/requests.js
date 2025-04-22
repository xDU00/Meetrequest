const express = require('express');
const router = express.Router();
const Request = require('../models/Request');

// Get all requests
router.get('/', async (req, res) => {
    try {
        const requests = await Request.find();
        res.json(requests);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new request
router.post('/', async (req, res) => {
    const { date, time, place, message } = req.body;
    const request = new Request({ date, time, place, message });

    try {
        const newRequest = await request.save();
        res.status(201).json(newRequest);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a request
router.put('/:id', async (req, res) => {
    const { status, response } = req.body;

    try {
        const request = await Request.findById(req.params.id);
        if (!request) return res.status(404).json({ message: 'Request not found' });

        request.status = status;
        request.response = response;
        await request.save();
        res.json(request);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;