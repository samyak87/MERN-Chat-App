import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { generateToken } from '../lib/utils.js';


export const signupController = async(req, res) => {
       const {fullName, email, password} = req.body;
    try{

        if(!fullName || !email || !password){
            return res.status(400).json({message: "All fields are required"});
        }

        if(password.length < 6){
            return res.status(400).json({message: "Password should be atleast 6 characters long"});
        }
       
        const user = await User.findOne({email});

        if(user){
            return res.status(400).json({message: "User already exists with this email"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({fullName, email, password: hashedPassword});


        if(newUser){
          // generate jwt token
          generateToken(newUser._id, res);

          await newUser.save();
          
          return res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            profilePic: newUser.profilePic,
            message: "User registered successfully"});
        }
        else{
            return res.status(400).json({message: "Failed to register user"});
        }

    }
    catch(error){
        console.log("error in signup controller :" + error);
    }
};




export const loginController =async(req, res) => {     
  const { email, password } = req.body;
    try {
      if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // generate jwt token
      generateToken(user._id, res);

      return res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePic: user.profilePic,
        message: "User logged in successfully"
      });
      

    } catch (error) {
      res.send({
        status: 500,
        message: "Error in login controller",
        error: error.message,
      })
      console.log("error in login controller :" + error);

    }
};  

export const logoutController = (req, res) => {          
  try {
    res.cookie('jwt', '', {maxAge: 0});
  res.json({message: "User logged out successfully"});
    
  } catch (error) {
    res.send({
      status: 500,
      message: "Error in logout controller",
      error: error.message,
    })
    
  }           
  
};