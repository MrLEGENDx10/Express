const userModel = require('../models/userModel');


exports.home = async (req,res)=>{
    res.send('Home Route');
}

exports.signUp = async (req,res) =>{
    const { name,email,password,ConfirmPassword } = req.body;
    try {
        const userInfo = new userModel({
            name,
            email,
            password,
            ConfirmPassword
        });
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