const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');

const Login = async (req, res) => {
  const { userEmail, userPassword } = req.body;
  try{
    //tim ng dung trong db
    console.log(req.body);
    const user = await User.findOne({email :userEmail});
    if(!user) {
      return res.status(400).json({message: "invalid email"});
    }
    if(userPassword !== user.password){
      return res.status(400).json({message: "invalid password"});
    }

    const payLoad = {
      id: user._id,
      email: user.email,
      name: user.name
    };

    const token = jwt.sign(payLoad,"3ubgunbguisgy47ni7rynvgtkuenkjdsfnhrvbyr7tvbkuynv",{expiresIn: '1h'});
    res.status(200).json({message: "OK", token:token, user : user});
  } catch(error){
    res.status(500).json({message: "loi server"});
  }
}



const Signup = async (req, res) => {
   if (!req.body) {
    return res.status(400).json({ error: "Missing request body" });
  }
  const { email, password, name, phone } = req.body;
  try {
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res.status(400).json({ message: 'Email da ton tai'});
    }

    const newUser = new User({
      email,
      password,
      name,
      phone,
      status: 'active'
    });
    await newUser.save();

    res.status(200).json({message: "Dang ky thanh cong"});
  } catch (error) {
    
    res.status(500).json({message: "Lỗi máy chủ"});
  }
};
const check = async (req, res) => {
  

    res.status(200).json({message: "API hoat dong"});
  
};

module.exports = {
  Login,Signup,check
}

