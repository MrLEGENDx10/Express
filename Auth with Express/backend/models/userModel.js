const mongoose =require ('mongoose');
const {Schema}=mongoose;

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
    }
})

const userModel=mongoose.model("User",userSchema);
module.exports=userModel;
