const mongoose =require ('mongoose');
const jwt = require('jsonwebtoken');
const {Schema}=mongoose;
const crypto = require('crypto');
require('dotenv').config(
    { path: '../.env' }
)
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    name:{
        type:String,
        required:[true, "Name is required"],
        minlength:[3,"Name must be at least 3 characters long"],
        maxlength:[20,"Name must be less than 20 characters long"],
        trim:true
    },
    email:{
        type:String,
        required:[true, "Email is required"],
        lowercase:true,
        unique:[true,"Email already exists"]
    },
    password:{
        type:String,
        required:[true, "Password is required"],
        minlength:[6,"Password must be at least 6 characters long"]
    },
    
    
    forgetPasswordToken:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    updatedAt:{
        type:Date,
        default:Date.now()
    }
})

/* The commented code is a pre-save middleware function in Mongoose. It is executed before saving a
user document to the database. */
// userSchema.pre('save',function(next){
//     if(!this.isModified('password')){
//         return next();
//     }
//     this.password = this.encryptPassword(this.password);
//     next();
// })
    

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next();
    }

    this.password = await bcrypt.hash(this.password,10);
    return next();
})

userSchema.methods = {
    jwtToken () {
        return jwt.sign({
            id: this._id,
            email: this.email
        }
        ,
        process.env.SECRET,
        {expiresIn:"24h"}
        )
    }
}

const userModel=mongoose.model("User",userSchema);
module.exports=userModel;
