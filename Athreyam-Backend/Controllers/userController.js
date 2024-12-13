//controller works based on models . so 1st import modelschema
const users = require('../Models/userSchema')

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