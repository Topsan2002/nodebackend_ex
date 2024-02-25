const express = require('express');
const {BookingHotel, Users, RoomType, Room}= require('../config');
const router = express.Router()

router.get('/', (req, res) => {
    BookingHotel.findAll({
      include: [
        {
          model: Users,
          as: 'belongsToUsers',
          attributes: ['Users'],
        },
        {
          model: RoomType,
          as: 'belongsToRoomType',
          attributes: ['RoomType'],
        },
        {
        model: Room,
        as: 'belongsToRoom',
        attributes: ['Room_id'],
        },
      ],
    })
      .then(Booking => {
        // Process the retrieved values here
        const formattedBooking = Booking.map(Booking => {
          return {
            Booking_id: Booking .Booking_id,
            User_id: Booking .User_id,
            Type_id: Booking .Type_id,
            Room: Booking .Room,
            Users: Booking .belongsToUsers.Users,
            RoomType: Booking .belongsToRoomType.RoomType,
            Room: Booking .belongsToRoom.Room,
          };
        });
        console.log(formattedBooking);
        res.json(formattedBooking); 
      })
      .catch(err => {
        res.status(500).send(err);
      });
  });

  
  router.get('/Booking', (req, res) => {
    BookingHotel.findAll({
      attributes: [
        'Booking_id',
        'User_id',
        'Type_id',
        'Room',
        'Room_id',
        [sequelize.fn('GROUP_CONCAT', sequelize.col('belongsToRoomType.RoomType')), 'RoomTypes'],
      ],
      include: [
        {
          model: Users,
          as: 'belongsToUsers',
          attributes: [],
        },
        {
          model: RoomType,
          as: 'belongsToRoomType',
          attributes: [],
        },
        {
          model: Room,
          as: 'belongsToRoom',
          attributes: [],
        },
      ],
      group: ['Booking_id', 'User_id', 'Type_id', 'Room', 'room_id'],
    })
      .then(bookings => {
        const formattedBookings = bookings.map(booking => ({
          Booking_id: booking.Booking_id,
          User_id: booking.User_id,
          Type_id: booking.Type_id,
          Room: booking.Room,
          Room_id: booking.room_id,
          RoomTypes: booking.getDataValue('RoomTypes'),
        }));
        console.log(formattedBookings);
        res.json(formattedBookings);
      })
      .catch(err => {
        res.status(500).send(err);
      });
});
//---Booking--------------------------------------------------------------------------------
router.post('/', async (req, res) => {
    try {
        const newBooking = await BookingHotel.create(req.body);
        res.status(201).json(newBooking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all Booking
router.get('/Booking', async (req, res) => {
    try {
        const allBookings = await BookingHotel.findAll();
        res.json(allBookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get Booking by ID
router.get('/Booking/:id', async (req, res) => {
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

// Update Booking by ID
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

// Delete Booking by ID
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
