const express = require('express');
const {BookingHotel, Users, RoomType, Room}= require('../config');
const router = express.Router()


router.post('/', async (req, res) => {
    try {
        const newRoomType = await RoomType.create(req.body);
        res.status(201).json(newRoomType);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all RoomType
router.get('/', async (req, res) => {
    try {
        const allRoomTypes = await RoomType.findAll();
        res.json(allRoomTypes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get RoomType by ID
router.get('/:id', async (req, res) => {
    try {
        const roomType = await RoomType.findByPk(req.params.id);
        if (!roomType) {
            res.status(404).json({ error: 'RoomType not found' });
        } else {
            res.json(roomType);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update RoomType by ID
router.put('/:id', async (req, res) => {
    try {
        const roomType = await RoomType.findByPk(req.params.id);
        if (!roomType) {
            res.status(404).json({ error: 'RoomType not found' });
        } else {
            await roomType.update(req.body);
            res.json(roomType);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete RoomType by ID
router.delete('/:id', async (req, res) => {
    try {
        const roomType = await RoomType.findByPk(req.params.id);
        if (!roomType) {
            res.status(404).json({ error: 'RoomType not found' });
        } else {
            await roomType.destroy();
            res.status(204).end();
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
