const express = require('express');
const {BookingHotel, Users, RoomType, Room}= require('../config');
const router = express.Router()



router.post('/login', async (req, res) =>{
    try{
        const data = await Users.findOne({
            where:{
                email:req.body.email,
                password:req.body.password
            }}
            )
        if(data== null){
            res.status(201).json({"status":false,"message":"ลงชื่อเข้าใช้ไม่สำเร็จ"});

        }else{
            res.status(201).json({"status":true,"message":"ลงชื่อเข้าใช้ไม่สำเร็จ","data":data});

        }
    }catch(error){
        res.status(500).json({ error: error.message });
    }
})

//--Users-----------------------------------------------------------------------------
router.post('/', async (req, res) => {
    try {
        const newUser = await Users.create(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all users
router.get('/', async (req, res) => {
    try {
        const allUsers = await Users.findAll();
        res.json(allUsers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await Users.findByPk(req.params.id);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.json(user);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update user by ID
router.put('/:id', async (req, res) => {
    try {
        const user = await Users.findByPk(req.params.id);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
        } else {
            await user.update(req.body);
            res.json(user);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete user by ID
router.delete('/:id', async (req, res) => {
    try {
        const user = await Users.findByPk(req.params.id);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
        } else {
            await user.destroy();
            res.status(204).end();
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
