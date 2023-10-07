const User = require('../models/userModel');

exports.home = async (req,res)=>{
    res.send('Home Route');
}