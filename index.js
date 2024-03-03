const e = require('express');
const express = require('express');
const app = express();
const books = require('./router/booking');
const users = require('./router/users');
const rooms = require('./router/rooms');
const roomType = require('./router/roomType');

const {BookingHotel, Users, RoomType, Room}= require('./config');


app.use(express.json());
app.use('/Booking',books);
app.use('/users',users)
app.use('/RoomType',roomType)
app.use('/Room',rooms)


// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));