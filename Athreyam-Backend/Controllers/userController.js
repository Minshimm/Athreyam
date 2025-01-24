//controller works based on models . so 1st import modelschema
const users = require('../Models/userSchema');
const jwt = require('jsonwebtoken')
// User Registration logic
exports.registerAPI = async(req,res) => {
    console.log("Inside the register API");
    const {username,email,password,phone,address} = req.body;
    const existingUser = await users.findOne({email:email});
    if(existingUser){
        res.status(402).json({message: "User Already Existing..."})
    }
    else{
        const newUser = new users({
            username:username,
            email:email,
            password:password,
            phone: phone,
            address : address
        })
        await newUser.save()
        res.status(200).json("User Registered Successfully...")
    }    
}

//user login 
exports.loginAPI = async (req,res) => {
    console.log("Inside the login API");
    const {email,password} = req.body;

    const adminEmail = "admin@gmail.com";
    const adminPassword = "admin123";

    // Check if admin login
    if (email === adminEmail && password === adminPassword) {
        const token = jwt.sign({ userId: "admin", role: "admin" }, process.env.jwtKey);
        return res.status(200).json({
            currentUser: { username: "Admin", email, role: "admin" },
            token
        });
    }

    const existingUser = await users.findOne({email,password});
    if(existingUser){
        const token = jwt.sign({userId:existingUser._id, role :"user"},process.env.jwtKey)
        console.log(token);
        
        res.status(200).json({currentUser:existingUser,token})
    }
    else
    res.status(402).json("User not registerd")
}

exports.updateUser = async (req, res) => {
    const { userId } = req.params;
    const { username, phone, address, password } = req.body;
  
    try {
      const updatedUser = await users.findByIdAndUpdate(
        userId,
        { username, phone, address, password },
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.status(200).json({ message: 'User updated successfully', updatedUser });
    } catch (error) {
      console.error('Error updating user:', error.message);
      res.status(500).json({ error: 'Failed to update user details' });
    }
  };

  // Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await users.find().select('username email phone address'); // Query the database
    res.status(200).json(allUsers); // Return the users
  } catch (error) {
    console.error('Error fetching users:', error.message); // Log the error
    res.status(500).json({ error: 'Failed to fetch users' }); // Return error response
  }
};