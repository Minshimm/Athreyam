const mongoose = require('mongoose');

const soldMedicineSchema = new mongoose.Schema({
  medicineId: { type: mongoose.Schema.Types.ObjectId, ref: 'medicines', required: true },
  medicineName: { type: String, required: true },
  quantitySold: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  saleDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('soldMedicine', soldMedicineSchema);