const SoldMedicine = require('../Models/soldMedicineSchema');

// Get all sold medicines
exports.getSoldMedicines = async (req, res) => {
    try {
      const soldMedicines = await SoldMedicine.find().populate('medicineId', 'medicineCategory medicineDescription');
      res.status(200).json(soldMedicines);
    } catch (error) {
      console.error('Error fetching sold medicines:', error.message);
      res.status(500).json({ error: 'Failed to fetch sold medicines' });
    }
  };

  // Add a sold medicine entry
  
exports.addSoldMedicine = async (req, res) => {
  try {
    console.log('Request Body:', req.body); // Add this log
    const { medicineId, medicineName, quantitySold, totalPrice } = req.body;

    const newSoldMedicine = new SoldMedicine({
      medicineId,
      medicineName,
      quantitySold,
      totalPrice,
    });

    await newSoldMedicine.save();
    res.status(201).json({ message: 'Sold medicine recorded successfully!', data: newSoldMedicine });
  } catch (error) {
    console.error('Error adding sold medicine:', error.message);
    res.status(500).json({ error: 'Failed to record sold medicine' });
  }
};

  //sales by date
//   exports.getSalesByDate = async (req, res) => {
//     const { startDate, endDate } = req.query;
  
//     try {
//       const sales = await SoldMedicine.find({
//         saleDate: { $gte: new Date(startDate), $lte: new Date(endDate) },
//       });
  
//       res.status(200).json(sales);
//     } catch (error) {
//       console.error('Error fetching sales by date:', error.message);
//       res.status(500).json({ error: 'Failed to fetch sales data' });
//     }
//   };