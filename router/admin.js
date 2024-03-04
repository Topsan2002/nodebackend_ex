const express = require('express');
const {Admin}= require('../config');
const { error } = require('console');
const router = express.Router()



router.post('/login', async (req, res) =>{
    try{
        const data = await Admin.findOne({
            where:{
                admin_username:req.body.admin_username,
                admin_password:req.body.admin_password
            }}
            )
            // console.log(data);
        if(data == null){
            res.status(201).json({"status":false,"message":"ลงชื่อเข้าใช้ไม่สำเร็จ"});

        }else{
            res.status(201).json({"status":true,"message":"ลงชื่อเข้าใช้เร็จ","data":data});

        }
    }catch(error){
        res.status(500).json({ error: error.message });

    }
    
})


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
