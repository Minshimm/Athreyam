const mongoose = require("mongoose");

// Room Schema
const roomSchema = new mongoose.Schema({
  roomType: { type: String, required: true },
  price: { type: Number, required: true },
  capacity: { type: Number, required: true },
  noOfRooms:{type:Number,required:true}
});

module.exports = mongoose.model("rooms", roomSchema);