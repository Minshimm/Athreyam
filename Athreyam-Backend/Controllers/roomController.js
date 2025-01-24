const Room = require("../Models/roomSchema");

// Get all rooms
exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    console.error("Error fetching rooms:", error.message);
    res.status(500).json({ error: "Failed to fetch rooms" });
  }
};

// Add a new room
exports.addRoom = async (req, res) => {
  try {
    const { roomType, price, capacity, noOfRooms} = req.body;
    const newRoom = new Room({ roomType, price, capacity, noOfRooms});

    await newRoom.save();
    res.status(201).json({ message: "Room added successfully!" });
  } catch (error) {
    console.error("Error adding room:", error.message);
    res.status(500).json({ error: "Failed to add room" });
  }
};

// Delete a room
exports.deleteRoom = async (req, res) => {
    const { id } = req.params; // Extract room ID from params
    try {
      const deletedRoom = await Room.findByIdAndDelete(id);
      if (!deletedRoom) {
        return res.status(404).json({ error: "Room not found" });
      }
      res.status(200).json({ message: "Room deleted successfully!" });
    } catch (error) {
      console.error("Error deleting room:", error.message);
      res.status(500).json({ error: "Failed to delete room" });
    }
};

// Update a room (if needed for edit functionality in the future)
exports.updateRoom = async (req, res) => {
    const { id } = req.params; // Extract room ID from params
    const updatedData = req.body; // Updated room details
  
    try {
      const updatedRoom = await Room.findByIdAndUpdate(id, updatedData, {
        new: true, // Return the updated document
      });
  
      if (!updatedRoom) {
        return res.status(404).json({ error: "Room not found" });
      }
  
      res.status(200).json({ message: "Room updated successfully!", updatedRoom });
    } catch (error) {
      console.error("Error updating room:", error.message);
      res.status(500).json({ error: "Failed to update room" });
    }
};