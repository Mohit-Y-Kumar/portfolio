import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'



const userSchema =new mongoose.Schema({
    fullName: {
        type:String,
        required: [true,"Name Required"],
    },
    email: {
        type:String,
        required: [true,"Email Required"],
        unique:true,
    },
    phone: {
        type:String,
        required: [true,"Phone Number Required"],
    },
    aboutMe: {
        type:String,
        required: [true,"About Me Field Is Required"],
    },
    password: {
        type:String,
        required: [true,"Password is Required"],
        minLength: [8,"Password must contain at least 8 characters:"],
        select:false,
    },
    avatar: {
       public_id:{
        type:String,
        required:true,
        
       },
       url:{
        type:String,
        required:true,
       },
    },
    resume: {
        public_id:{
         type:String,
         required:true,
        },
        url:{
         type:String,
         required:true,
        },
     },
     portfolioURL :{
        type:String,
        required:[true,"Portfolio url is required"],
     },
    github_URL: {
  type: String,
  default: null,
},
instagram_URL: {
  type: String,
  default: null,
},
twitter_URL: {
  type: String,
  default: null,
},
linkedin_URL: {
  type: String,
  default: null,
},
    resetPasswordToken:String,
    resetPasswordExpire:Date,
  
});

userSchema.pre("save",async function (next) {
    if(!this.isModified("password")){
         next();
    }
    this.password =await bcrypt.hash(this.password,10);
});

userSchema.methods.comparePassword =async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password);
};

//gen json  web token
userSchema.methods.generateJsonWebToken =  function(){
  return jwt.sign({id:this._id}, process.env.JWT_SECRET_KEY,{
    expiresIn:process.env.JWT_EXPIRES,
  });
};

userSchema.methods.getResetPasswordToken =function(){
    const resetToken =crypto.randomBytes(20).toString("hex");
    
    this.resetPasswordToken =crypto.createHash("sha256")
    .update(resetToken)
    .digest("hex");
    this.resetPasswordExpire =Date.now() +15 *60*1000;
    return resetToken;
}


export const User =mongoose.model("User",userSchema);
