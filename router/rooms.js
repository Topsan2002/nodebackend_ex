const express = require('express');
const {BookingHotel, Users, RoomType, Room}= require('../config');
const router = express.Router()



//---Room----------------------------------------------------------------------------------------------
// Create a new room
router.post('/', async (req, res) => {
    try {
        const newRoom = await Room.create(req.body);
        res.status(201).json(newRoom);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all rooms
router.get('/', async (req, res) => {
    try {
        const allRooms = await Room.findAll();
        res.json(allRooms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get room by ID
router.get('/:id', async (req, res) => {
    try {
        const room = await Room.findByPk(req.params.id);
        if (!room) {
            res.status(404).json({ error: 'Room not found' });
        } else {
            res.json(room);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update room by ID
router.put('/:id', async (req, res) => {
    try {
        const room = await Room.findByPk(req.params.id);
        if (!room) {
            res.status(404).json({ error: 'Room not found' });
        } else {
            await room.update(req.body);
            res.json(room);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete room by ID
router.delete('/:id', async (req, res) => {
    try {
        const room = await Room.findByPk(req.params.id);
        if (!room) {
            res.status(404).json({ error: 'Room not found' });
        } else {
            await room.destroy();
            res.status(204).end();
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



module.exports = router;
