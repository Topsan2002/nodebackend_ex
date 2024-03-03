const express = require('express');
const {Admin}= require('../config');
const router = express.Router()



//---Room----------------------------------------------------------------------------------------------
// Create a new room
router.post('/', async (req, res) => {
    try {
        const newAdmin = await Admin.create(req.body);
        res.status(201).json(newAdmin);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all rooms
router.get('/', async (req, res) => {
    try {
        const all = await Admin.findAll();
        res.json(all);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get room by ID
router.get('/:id', async (req, res) => {
    try {
        const data = await Admin.findByPk(req.params.id);
        if (!data) {
            res.status(404).json({ error: 'Data not found' });
        } else {
            res.json(data);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update room by ID
router.put('/:id', async (req, res) => {
    try {
        const data = await Admin.findByPk(req.params.id);
        if (!data) {
            res.status(404).json({ error: 'Data not found' });
        } else {
            await data.update(req.body);
            res.json(data);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete room by ID
router.delete('/:id', async (req, res) => {
    try {
        const data = await Admin.findByPk(req.params.id);
        if (!data) {
            res.status(404).json({ error: 'Data not found' });
        } else {
            await data.destroy();
            res.status(204).end();
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



module.exports = router;



module.exports = router;
