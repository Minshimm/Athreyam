//Backend creation using Express
//1. load .env file
require('dotenv').config();
//2. import express
const express = require('express');
//6. import cors
const cors = require('cors')
// checking DB connection is correct or not
const db = require('./DB/connection')
//getting router connection 
const router = require('./Routes/router')
//3. create an server application using express
const athreyamApp = express();
//7. use cors & json here. and router also
athreyamApp.use(cors());
athreyamApp.use(express.json());
athreyamApp.use(router);
athreyamApp.use('/uploads',express.static('./uploads'));
//4. Define PORT
const PORT = 3000 || process.env.PORT;
//5. Run application
athreyamApp.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
