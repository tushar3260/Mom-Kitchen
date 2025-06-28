import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
export const UserSignUp = async(req,res) =>{
    const {fullName,email,passwordHash,phone,address} = req.body;
    if(!fullName || !email || !passwordHash || !phone){
        return res.status(400).json({message: "All fields are required"});
    }
   const newPassword = await bcrypt.hash(passwordHash, 10);

   const newUser = new User({
       fullName,
       email,
       passwordHash: newPassword,
       phone,
       address
   });
   try {
         const user = await newUser.save();
         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
         res.status(201).json({message: "User created successfully", user, token});
    
   } catch (error) {
      res.status(500).json({message: "Error in user signup"});
      console.log(error)
   }

    
}

export const UserLogin = async(req,res) =>{
    const {email, passwordHash} = req.body;
    if(!email || !passwordHash){
        return res.status(400).json({message: "Email and password are required"});
    }
    
    try {
        const user = await User.findOne({ email });

        const passwordMatch = await bcrypt.compare(passwordHash, user.passwordHash);
        if (!user || !passwordMatch) {
            return res.status(401).json({message: "Invalid email or password"});
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({message: "User logged in successfully", user, token});


    } catch (error) {
        res.status(500).json({message: "Error in user login"});
    }

    

    
}