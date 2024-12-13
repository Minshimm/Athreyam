// mongoose is used to connect node & mongoDB => npm i mongoose
const mongoose = require('mongoose')

const connectionString = process.env.connectionString;

mongoose.connect(connectionString).then(res=>{
    console.log("PF Server is connected to MongoDB")
})
.catch(err => {
    console.log("Error: " +err)
})