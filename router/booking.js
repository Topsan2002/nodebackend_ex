const express = require("express");
const { BookingHotel, Users, RoomType, Room } = require("../config");
const { Op } = require("sequelize");
const router = express.Router();

// Create a new user
// Create a new booking
router.post("/", async (req, res) => {
  try {
    const check = await BookingHotel.findAll({
      where: {
        [Op.and]: [
            
            { date_checkin: { [Op.lte]: req.body.date_checkin } },
            { date_checkout: { [Op.gt]: req.body.date_checkin } },
            {Room_id:req.body.Room_id}
          ],
      },
    });
    console.log(check);
    if (check.length == 0) {
      const newBooking = await BookingHotel.create(req.body);
     
      res.status(201).json({ msg: "Create Success", status: true,data:req.body });
    } else {
      res.status(201).json({ msg: "Can not create book", status: false,data:req.body });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all bookings
router.get("/", async (req, res) => {
  try {
    const allBookings = await BookingHotel.findAll({
      include: [
        {
          model: Users,
        },
        {
          model: RoomType,
        },
        {
          model: Room,
        },
      ],
    });
    res.json(allBookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/userid/:id", async (req, res) => {
  try {
    const allBookings = await BookingHotel.findAll({
      include: [
        {
          model: Users,
        },
        {
          model: RoomType,
        },
        {
          model: Room,
        },
      ],
      where: {
        User_id: req.params.id,
      },
    });
    res.json(allBookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get booking by ID
router.get("/:id", async (req, res) => {
  try {
    const booking = await BookingHotel.findByPk(req.params.id, {
      include: [
        {
          model: Users,
        },
        {
          model: RoomType,
        },
        {
          model: Room,
        },
      ],
    });
    if (!booking) {
      res.status(404).json({ error: "Booking not found" });
    } else {
      res.json(booking);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update booking by ID
router.put("/:id", async (req, res) => {
  try {
    const booking = await BookingHotel.findByPk(req.params.id);
    if (!booking) {
      res.status(404).json({ error: "Booking not found" });
    } else {
      await booking.update(req.body);
      res.json(booking);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete booking by ID
router.delete("/:id", async (req, res) => {
  try {
    const booking = await BookingHotel.findByPk(req.params.id);
    if (!booking) {
      res.status(404).json({ error: "Booking not found" });
    } else {
      await booking.destroy();
      res.status(204).end();
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
