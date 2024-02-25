const express = require('express');
const app = express();
// require('./config');


const bookingRoutes = require('./router/book');
const usersRouter = require('./router/users');


app.use(express.json());
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use('/Booking',bookingRoutes)
app.use('/users',usersRouter)



let port = 3002
app.listen(port, () => {
    console.log(`Listening on port:${port}`);
});