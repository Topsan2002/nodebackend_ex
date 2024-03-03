const express = require('express');
const {BookingHotel, Users, RoomType, Room}= require('../config');
const router = express.Router()

// Create a new user
// Create a new booking
router.post('/', async (req, res) => {
    try {
        const newBooking = await BookingHotel.create(req.body);
        res.status(201).json(newBooking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all bookings
router.get('/', async (req, res) => {
    try {
        const allBookings = await BookingHotel.findAll();
        res.json(allBookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get booking by ID
router.get('/:id', async (req, res) => {
    try {
        const booking = await BookingHotel.findByPk(req.params.id);
        if (!booking) {
            res.status(404).json({ error: 'Booking not found' });
        } else {
            res.json(booking);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update booking by ID
router.put('/:id', async (req, res) => {
    try {
        const booking = await BookingHotel.findByPk(req.params.id);
        if (!booking) {
            res.status(404).json({ error: 'Booking not found' });
        } else {
            await booking.update(req.body);
            res.json(booking);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete booking by ID
router.delete('/:id', async (req, res) => {
    try {
        const booking = await BookingHotel.findByPk(req.params.id);
        if (!booking) {
            res.status(404).json({ error: 'Booking not found' });
        } else {
            await booking.destroy();
            res.status(204).end();
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



module.exports = router;
