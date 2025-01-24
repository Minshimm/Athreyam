const mongoose = require('mongoose')
//1. Schema creation
const medicineSchema = new mongoose.Schema({
    medicineName : {
        type :  String,
        required : true
    },
    medicineCategory : {
        type : String,
        required : true
    },
    medicinePrice : {
        type : Number,
        required : true
        },
        medicineQty : {
            type : Number,
            required : true
        },
        medicineDescription : {
            type : String,
            required : true
        },
        medicineImg :{
            type : String,
            required : true
        }
})
//2. Model creation
const medicines = mongoose.model('medicines', medicineSchema)
module.exports = medicines