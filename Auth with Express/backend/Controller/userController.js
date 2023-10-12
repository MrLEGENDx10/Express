const userModel = require('../models/userModel');
const emailValidator = require('email-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const home = async (req,res)=>{
    res.send('Home Route');
}

const signUp = async (req,res) =>{
    const { name,email,password,ConfirmPassword } = req.body;
    try {
            if(!name || !email || !password || !ConfirmPassword){
                return res.status(400).json({
                    status:"fail",
                    message:"All fields are required"
                })
            }

        var validEmail = emailValidator.validate(email);
        if(!validEmail){
            return res.status(400).json({
                status:"fail",
                message:"Invalid Email"
            })
        }

        if(password != ConfirmPassword){
            return res.status(400).json({
                status:"fail",
                message:"Passwords do not match"
            })
        }


        const userInfo = new userModel(req.body);
        const result = await userInfo.save();
        return res.status(200).json({
            success:true,
            data: result
        })
    } catch (error) {
        if(error.code === 11000){
            return res.status(400).json({
                status:"fail",
                message:"Email already exists"
            })}
        console.log(error);
        res.status(400).json({
            status:"fail",
            message: error.message
        })
}}

const signIn = async (req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(400).json({
            status:"fail",
            message:"All fields are required"
        })
    }
    try {
        const user = await userModel.findOne({
            email
        })
        .select("+password");

        if ( !user || ! bcrypt.compare ( password,user.password) ){
            return res.status(400).json({
                status:"fail",
                message:"Invalid Credentials" 
            })
        }
        const token = user.jwtToken(); 
        user.password = undefined;
        
        const cookieOptions = {
            maxAge: 24 * 60 * 60 * 1000, // 24 hours
            httpOnly: true
        }

        res.cookie("token",token,cookieOptions);
        res.status(200).json({
            status:true,
            data:user
        })

        } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }

}

const getUser = async (req,res)=>{
    const userId = req.user.id;
    try{
        const user = await userModel.findById(userId);
        return res.status(200).json({
            status:true,
            data:user
        })
    } catch(error){
        return res.status(400).json({
            status:false,
            message:error.message
        })
    }
}

const logout = (res,req)=>{
    try {
        // res.cookie("token","",{maxAge:1}); in this way we can logout by making the cookie expire in 1ms
       /* `res.clearCookie("token");` is a method in Express.js that is used to clear a cookie from the
       response. In this case, it is used to clear the "token" cookie, which is typically used for
       authentication purposes. By clearing the cookie, the user is effectively logged out of the
       system. */
        
        const cookieOptions = {
            expires: new Date(),
            httpOnly: true
        }
        /* `res.cookie("token","",cookieOptions);` is used to set a cookie named "token" with an empty
        value and the specified options. In this case, the options include setting the cookie to
        expire immediately (`expires: new Date()`) and making it accessible only through HTTP
        (`httpOnly: true`). This effectively clears the "token" cookie from the response, which can
        be used to log out the user by removing their authentication token. */
        res.cookie("token","",cookieOptions);
        res.status(200).json({
            status:true,
            message:"Logged Out"
        })

        return res.status(200).json({
            status:true,
            message:"Logged Out"
        })
    } catch (error) {
        return res.status(400).json({
            status:false,
            message:error.message
        })
    }
}

module.exports = {
    home,
    signUp,
    signIn,
    getUser,
    logout
}