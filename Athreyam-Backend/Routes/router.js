//Routes used to call all functions in the controller. so 1st import the controller & express
const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController')
//function calling
router.post('/api/register',userController.registerAPI)
module.exports=router