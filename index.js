const express = require('express');
const app = express();
// app.js or index.js
require('dotenv').config();

const books = require('./router/booking');
const users = require('./router/users');
const rooms = require('./router/rooms');
const roomType = require('./router/roomType');
const admin = require('./router/admin')

app.use(express.json());
app.use('/Booking',books);
app.use('/users',users)
app.use('/RoomType',roomType)
app.use('/Room',rooms)
app.use('/Admin',admin)
// Start the server

console.log(process.env.TEST);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));