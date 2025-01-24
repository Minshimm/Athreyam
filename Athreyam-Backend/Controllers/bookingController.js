const Booking = require('../Models/bookingSchema');
const Room = require('../Models/roomSchema')
// Get all bookings
exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
          .populate('userId', 'email') // Ensure 'userId' ref matches 'users' model
          .populate('roomId', 'roomType'); // Ensure 'roomId' ref matches 'rooms' model
        res.status(200).json(bookings);
      } catch (error) {
        console.error('Error fetching bookings:', error.message);
        res.status(500).json({ error: 'Failed to fetch bookings' });
      }
};

// Add a booking (if needed for testing)
exports.addBooking = async (req, res) => {
    try {
    console.log("Received booking data:", req.body); // Debug log

    const { userId, userEmail, roomId, roomType, startDate, endDate, totalAmount } = req.body;

    // Check if all required fields are present
    if (!userId || !userEmail || !roomId || !roomType || !startDate || !endDate || !totalAmount) {
      return res.status(400).json({ message: "Missing required booking details" });
    }

    // Check if room exists
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    // Check if enough rooms are available
    if (room.noOfRooms <= 0) {
      return res.status(400).json({ message: "Room full. No available rooms." });
    }

    // Deduct room count
    room.noOfRooms -= 1;
    await room.save();

    // Create new booking
    const newBooking = new Booking({
      userId,
      userEmail,
      roomId,
      roomType,
      startDate,
      endDate,
      totalAmount,
    });
    await newBooking.save();

    res.status(201).json({ message: "Booking added successfully", data: newBooking });
  } catch (error) {
    console.error("Error adding booking:", error.message); // Log error details
    res.status(500).json({ error: "Failed to add booking" });
  }
};
