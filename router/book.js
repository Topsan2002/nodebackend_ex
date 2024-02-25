const express = require('express');
const {Book, Shelves, sequelize} = require('../config');
const router = express.Router()

router.get( '/', (req, res) =>{
    res.send("dfsdfdsfdsfds")
})




module.exports = router;
