const userModel = require('../models/userModel');
const emailValidator = require('email-validator');


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
    try {
        if(!email || !password){
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

        const result = await userModel.findOne({email:email});
        if(!result){
            return res.status(400).json({
                status:"fail",
                message:"Email does not exist"
            })
        }

        if(password != result.password){
            return res.status(400).json({
                status:"fail",
                message:"Invalid Password"
            })
        }

        return res.status(200).json({
            success:true,
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
}

module.exports = {
    home,
    signUp,
    signIn
}