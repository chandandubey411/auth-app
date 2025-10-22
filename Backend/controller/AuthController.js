const userModel = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const signup = async(req,res)=>{
    try{
        const {name,email,password} = req.body;
        const user = await userModel.findOne({email});
        if(user){
            return res.status(409)
                .json({message: 'user already exist , you can login', success: false})
        }
        const UserModel = new userModel({name,email,password});
        UserModel.password = await bcrypt.hash(password, 10);
        await UserModel.save();
        res.status(201)
        .json({
            message
            : "signup succesfully",
            success:true
        })
    }catch(err){
        res.status(500)
            .json({
                message: err.message,
                success: false
            })
    }
}

const login = async(req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await userModel.findOne({email});
        const errorMsg = 'Auth failed email or password is wrong'
        if(!user){
            return res.status(409)
                .json({message: errorMsg, success: false})
        }
        const isPassEqual = await bcrypt.compare(password, user.password);
        if(!isPassEqual){
            return res.status(409)
                .json({message: errorMsg, success: false})
        }
        const jwtToken = jwt.sign(
            {email: user.email, _id: user._id},
            process.env.JWT_SECRET,
            {expiresIn : '24h'}
        )
        res.status(200)
        .json({
            message
            : "login succesfully",
            success:true,
            jwtToken,
            email,
            name: user.name
        })
    }catch(err){
        res.status(500)
            .json({
                message: err.message,
                success: false
            })
    }
}

module.exports = {signup, login }