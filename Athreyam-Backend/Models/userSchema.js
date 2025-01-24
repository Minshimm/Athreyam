//schema is the collection fields & model is copy of collections in DB
const mongoose = require('mongoose')
//1. Schema creation
const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    phone : {
        type : Number,
        required : true
    },
    address : {
        type : String,
        required : true
    }
})
//model creation using collection name in the DB. here my Db name: AthreyamDB & colletion name: users
const users = mongoose.model('users', userSchema)
module.exports=users