//Routes used to call all functions in the controller. so 1st import the controller & express
const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');
const multerMiddleware = require('../Middlewares/multerMiddleware');
const medicineController = require('../Controllers/medicineController');
const paymentController = require('../Controllers/paymentController')
const cartController = require('../Controllers/cartController')
const soldMedicineController = require('../Controllers/soldMedicineController')
const roomController = require('../Controllers/roomController')
const bookingController = require('../Controllers/bookingController');
//function calling
router.post('/api/register',userController.registerAPI)
router.post('/api/login',userController.loginAPI)
router.put('/api/user/update/:userId', userController.updateUser);
router.get('/api/users', userController.getAllUsers);
router.post('/api/addMedicine',multerMiddleware.single('medicineImg'),medicineController.addMedicineAPI)
router.get('/api/getAllMedicines',medicineController.getAllMedicinesAPI)
router.get('/api/medicines/by-ids',medicineController.getMedicineById)
router.post('/api/medicines/by-ids',medicineController.getGuestCartDetails)
router.put('/api/updateMedicine/:id',multerMiddleware.single('medicineImg'),medicineController.updateMedicineAPI)
router.delete('/api/deleteMedicine/:id',medicineController.deleteMedicineAPI)
router.post('/api/updateStockAfterOrder', medicineController.updateStockAfterOrderAPI);
router.post('/api/cart/add', cartController.addToCart);
router.get('/api/cart/:userId', cartController.getCart);
router.delete('/api/cart/:userId', cartController.clearCart);
router.post('/api/cart/remove', cartController.removeFromCart);
router.post("/api/cart/merge", cartController.mergeCart);
//payment routes
router.post('/api/createOrder', paymentController.createOrder);
router.post('/api/verifyPayment', paymentController.verifyPayment);
//Sold Medicine
router.get('/api/sold-medicines', soldMedicineController.getSoldMedicines);
router.post('/api/sold-medicines', soldMedicineController.addSoldMedicine);
// router.get('/api/sold-medicines/date-range', soldMedicineController.getSalesByDate);
// Room Routes
router.get("/api/rooms", roomController.getAllRooms);
router.post("/api/rooms", roomController.addRoom);
router.delete("/api/rooms/:id", roomController.deleteRoom);
router.put("/api/rooms/:id", roomController.updateRoom);
router.get('/api/bookings', bookingController.getAllBookings);
router.post('/api/bookings', bookingController.addBooking);
module.exports=router