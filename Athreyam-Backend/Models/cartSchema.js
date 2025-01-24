const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Link cart to user
  items: [
    {
      medicineId: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine', required: true },
      quantity: { type: Number, required: true },
    },
  ],
});

module.exports = mongoose.model('Cart', cartSchema);