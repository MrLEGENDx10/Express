import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true , "Name is required"],
        maxLength:[50, "Name is too long"]
    },
    size:Number,
    email:{
        type:String,
        unique:true
    },
    username:{
        type:String,
        unique:[true, "Username is already in use"]
    },
    password:{
        type:String,
        required:[true, "Password is required"],
        minLength:[8, "Password is too short"],
        maxLength:[16, "Password is too long"],
    }
});

export default mongoose.model("User", userSchema);