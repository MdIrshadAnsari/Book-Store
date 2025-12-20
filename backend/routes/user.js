const router = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {authenticateToken} = require('./userAuth')

//Sign-Up
router.post('/sign-up', async(req, res)=>{
    try {
        
        const{username, email, password, address} = req.body;
        // check username length is more than 3
        if(username.length < 4){
            return res.status(400).json({message: "username length should be greater than 3"})
        }
        // check username already exist
        const existingusername = await User.findOne({username : username})
        if(existingusername){
            return res.status(400).json({message: "username already exist"})
        }
         // check email already exist
        const existingemail = await User.findOne({email : email})
        if(existingemail){
            return res.status(400).json({message: "email already exist"})
        }
         // check password length
        if(password.length < 5){
            return res.status(400).json({message: "password length should be greater than 5"})
        }
        const hashpassword = await bcrypt.hash(password, 10);
        const newuser = await new User({
            username,
            email,
            password: hashpassword,
            address,
        })
        await newuser.save();
        return res.status(200).json({message: "Signup Successfully"})

    } catch (error) {
        res.status(500).json({message: "Internal server error"})
    }
})

//Login
router.post('/sign-in', async(req, res)=>{
    try {
        const{username, password} = req.body;
        const existinguser = await User.findOne({username});
        if(!existinguser){
            return res.status(400).json({message: "Invalid crendentials"})
        }
        await bcrypt.compare(password, existinguser.password, (err, data)=>{
            if(data){
                const authClaim = {name: existinguser.username, role: existinguser.role}
                const token = jwt.sign({authClaim}, "secretkey", {expiresIn: "30d"});
                res.status(200).json({id: existinguser._id, role: existinguser.role, token: token})
            }
            else{
                res.status(400).json({message: "Invalid crendentials"})
            }
        })
    } catch (error) {
        res.status(500).json({message: "Internal server error"})
    }
})

// get-user information
router.get("/get-user-information", authenticateToken, async(req, res)=>{
    try {
        const {id} = req.headers;
        const data = await User.findById(id).select("-password")
        return res.status(200).json(data)
        
    } catch (error) {
         res.status(500).json({message: "Internal server error"})
    }
})

router.put('/update-address', authenticateToken,  async(req, res)=>{
    try {
        
        const{id} = req.headers;
        const {address} = req.body;
        await User.findByIdAndUpdate(id, {address: address})
        return res.status(200).json({message: "Address updated successfully"})

    } catch (error) {
        res.status(500).json({message: "Internal server error"})
    }
})



module.exports = router;
