const { response } = require('express');
const medicines = require('../Models/medicineSchema');
const SoldMedicine = require('../Models/soldMedicineSchema')

// add medicines to the server
exports.addMedicineAPI = async(req,res)=>{
  console.log("Inside Add Medicine API");
  const {medicineName,medicineCategory,medicinePrice,medicineQty,medicineDescription} = req.body;
  const medicineImg = req.file ? req.file.filename : null;
 try{
    const medicine = await medicines.findOne({medicineName})
   if(medicine){
    res.status(401).json("Project already existing")
   }
   else{
    const newMedicine = new medicines ({
      medicineName,
      medicineCategory,
      medicinePrice,
      medicineQty,
      medicineDescription,
      medicineImg
    });
    await newMedicine.save();
    res.status(201).json({ message: 'Medicine added successfully!', data: newMedicine });
   }
 }
 catch(err){
  res.status(406).json(err)
 }
}

// get all medicines from the server
exports.getAllMedicinesAPI = async(req,res) =>{
  const searchKey = req.query.search || "";
  const query = searchKey
    ? { medicineName: { $regex: searchKey, $options: 'i' } }
    : {};

  try {
    const allMedicines = await medicines.find(query);
    res.status(200).json(allMedicines);
  } catch (err) {
    console.error("Error fetching medicines:", err.message);
    res.status(500).json({ error: "Failed to fetch medicines" });
  }
}

// edit medicine from the server
exports.updateMedicineAPI = async(req,res)=>{
  try {
    const { id } = req.params;
    const { medicineName, medicineCategory, medicinePrice, medicineQty, medicineDescription } = req.body;
    const updatedData = {
        medicineName,
        medicineCategory,
        medicinePrice,
        medicineQty,
        medicineDescription
    };
    if (req.file) {
        updatedData.medicineImg = req.file.filename;
    }
    const updatedMedicine = await medicines.findByIdAndUpdate(id, updatedData, { new: true });
    res.status(200).json({ message: 'Medicine updated successfully!', data: updatedMedicine });
} catch (err) {
    res.status(406).json(err);
}
}

// delete a medicine from the server
exports.deleteMedicineAPI = async(req,res)=>{
  try {
    const { id } = req.params;
    const deletedMedicine = await medicines.findByIdAndDelete(id);
    if (!deletedMedicine) {
      return res.status(404).json({ message: 'Medicine not found' });
  }
  res.status(200).json({ message: 'Medicine deleted successfully' });
} catch (err) {
  res.status(500).json({ message: 'Error deleting medicine', error: err.message });
}
}

// //edit medicines stock after the user order
// exports.updateStockAfterOrderAPI = async (req, res) => {
//   try {
//     const { cartItems } = req.body; // cartItems: [{ id, quantity }]

//     for (const item of cartItems) {
//       // Find medicine by ID and reduce quantity
//       const updatedMedicine = await medicines.findByIdAndUpdate(
//         item.id,
//         { $inc: { medicineQty: -item.quantity } },
//         { new: true }
//       );

//       if (!updatedMedicine) {
//         return res.status(404).json({ message: `Medicine with ID ${item.id} not found.` });
//       }

//       if (updatedMedicine.medicineQty < 0) {
//         return res.status(400).json({ message: `Insufficient stock for ${updatedMedicine.medicineName}.` });
//       }
//     }

//     res.status(200).json({ message: 'Stock updated successfully!' });
//   } catch (err) {
//     res.status(500).json({ message: 'Error updating stock', error: err.message });
//   }
// };

// Fetch a single medicine by its ID
exports.getMedicineById = async (req, res) => {
  const { ids } = req.body; // Expect an array of medicine IDs
  try {
    const medicine = await medicines.find({ _id: { $in: ids } });
    res.status(200).json(medicine);
  } catch (err) {
    console.error("Error fetching medicines by IDs:", err.message);
    res.status(500).json({ error: "Failed to fetch medicines" });
  }
};

exports.getGuestCartDetails = async (req, res) => {
  const { ids } = req.body; // Array of medicine IDs
  console.log("Fetching Medicines for Guest Cart, IDs:", ids);

  try {
    if (!ids || ids.length === 0) {
      return res.status(400).json({ error: "No medicine IDs provided" });
    }

    const medicinesList = await medicines.find({ _id: { $in: ids } }).select(
      "medicineName medicinePrice medicineImg"
    );

    // Transform medicineImg field to include full URL
    const updatedMedicines = medicinesList.map((med) => ({
      ...med.toObject(),
      medicineImg: med.medicineImg
        ? `http://localhost:3000/uploads/${med.medicineImg}` // Adjust base URL as needed
        : "http://localhost:3000/uploads/default-image.jpg" // Fallback for missing images
    }));

    console.log("Fetched Medicines with Image URLs:", updatedMedicines);

    res.status(200).json({ medicines: updatedMedicines });
  } catch (error) {
    console.error("Error fetching guest cart details:", error.message);
    res.status(500).json({ error: "Failed to fetch guest cart details" });
  }
}

exports.updateStockAfterOrderAPI = async (req, res) => {
  try {
    const { cartItems } = req.body; // cartItems: [{ id, quantity }]

    for (const item of cartItems) {
      console.log(`Processing item: ${item.id}, Quantity: ${item.quantity}`);

      const medicine = await medicines.findById(item.id);

      if (!medicine) {
        return res.status(404).json({ message: `Medicine with ID ${item.id} not found.` });
      }

      if (medicine.medicineQty < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${medicine.medicineName}.` });
      }

      // Reduce stock in the medicines collection
      const updatedMedicine = await medicines.findByIdAndUpdate(
        item.id,
        { $inc: { medicineQty: -item.quantity } },
        { new: true }
      );

      console.log(`Stock updated for ${updatedMedicine.medicineName}: ${updatedMedicine.medicineQty}`);

      // Add sold medicine entry
      const soldMedicine = new SoldMedicine({
        medicineId: medicine._id,
        medicineName: medicine.medicineName,
        quantitySold: item.quantity,
        totalPrice: medicine.medicinePrice * item.quantity,
      });

      await soldMedicine.save();
    }

    res.status(200).json({ message: 'Stock updated and sales recorded successfully!' });
  } catch (err) {
    console.error('Error updating stock:', err.message);
    res.status(500).json({ message: 'Error updating stock', error: err.message });
  }
};