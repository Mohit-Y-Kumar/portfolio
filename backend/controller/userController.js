import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import {v2 as cloudinary} from 'cloudinary'
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from 'crypto';

export const  register = catchAsyncErrors(async(req,res,next) =>{
if(!req.files || Object.keys(req.files).length ===0){
    return next(new ErrorHandler("Avatar And Resume Are Required!",400));

}
const {avatar,resume} =req.files;

const cloudinaryResponseForAvatar =await cloudinary.uploader.upload(
    avatar.tempFilePath,
    {folder :"AVATARS"}
);

if(!cloudinaryResponseForAvatar || cloudinaryResponseForAvatar.error){
    console.error(
        "cloudinary Error:",
        cloudinaryResponseForAvatar.error || "unknown cloudinary Error"
    );
}


const cloudinaryResponseForResume =await cloudinary.uploader.upload(
    resume.tempFilePath,
    {folder :"MY_RESUME"}
);

if(!cloudinaryResponseForResume || cloudinaryResponseForResume.error){
    console.error(
        "cloudinary Error:",
        cloudinaryResponseForResume.error || "unknown cloudinary Error"
    );
}


const {
    fullName,
    email,
    phone,
    aboutMe,
    password,
     portfolioURL ,
     github_URL,
     instagram_URL,
     twitter_URL,
     linkedin_URL,
    } =req.body;

const user =await User.create({
    fullName,
    email,
    phone,
    aboutMe,
    password,
     portfolioURL ,
     github_URL,
     instagram_URL,
     twitter_URL,
     linkedin_URL,
     avatar:{
        public_id:cloudinaryResponseForAvatar.public_id,
        url:cloudinaryResponseForAvatar.secure_url,
     },
     resume:{
        public_id:cloudinaryResponseForResume.public_id,
        url:cloudinaryResponseForResume.secure_url,
     },
});

generateToken(user,"user Registered",201,res);
});

export const login =catchAsyncErrors(async(req,res,next) =>{
    const {email,password} = req.body;
    if(!email || !password){
        return next(new ErrorHandler("Email And Password Are Required! "));
        
    }
    const user =await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler(" Invalid Email Or Password  "));

    }
    const isPasswordMatched =await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Email or Password"));
    }
    generateToken(user,"Logged In" ,200,res);
});

export const logout =catchAsyncErrors(async(req,res,next) =>{
   res.status(200).cookie("token","",{
    expires: new Date(Date.now()),
    httpOnly:true,

   }).json({
    success: true,
    message:"Logged Out"
   });
});

export const getUser =catchAsyncErrors(async(req,res,next) =>{
    const user =await User.findById(req.user.id);
    res.status(200).json({
        success:true,
        user,
    });

});

export const updateProfile =catchAsyncErrors(async(req,res,next)=>{

    const newUserdata = {};
       
    if (req.body && req.body.fullName) newUserdata.fullName = req.body.fullName;
    if (req.body && req.body.email) newUserdata.email = req.body.email;
    if (req.body && req.body.phone) newUserdata.phone = req.body.phone;
    if (req.body && req.body.aboutMe) newUserdata.aboutMe = req.body.aboutMe;
    if (req.body && req.body.portfolioURL) newUserdata.portfolioURL = req.body.portfolioURL;
    if (req.body && req.body.github_URL) newUserdata.github_URL = req.body.github_URL;
    if (req.body && req.body.instagram_URL) newUserdata.instagram_URL = req.body.instagram_URL;
    if (req.body && req.body.twitter_URL) newUserdata.twitter_URL = req.body.twitter_URL;
    if (req.body && req.body.linkedin_URL) newUserdata.linkedin_URL = req.body.linkedin_URL;
    
    if(req.files && req.files.avatar){
        const avatar =req.files.avatar;
        const user =await User.findById(req.user.id);
        const profileImagedId =user.avatar.public_id;
        await cloudinary.uploader.destroy(profileImagedId);
        const cloudinaryResponse =await cloudinary.uploader.upload(
            avatar.tempFilePath,
            {folder:"AVATARS"}
        );

        newUserdata.avatar ={
            public_id:cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        };
    }

    if(req.files && req.files.resume){
        const resume =req.files.resume;
        const user =await User.findById(req.user.id);
        const resumeId =user.resume.public_id;
        await cloudinary.uploader.destroy(resumeId);
        const cloudinaryResponse =await cloudinary.uploader.upload(
            resume.tempFilePath,
            {folder:"MY_RESUME"}
        );

        newUserdata.resume ={
            public_id:cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        };
    }

    const user =await User.findByIdAndUpdate(req.user.id,newUserdata,{
        new: true,
        runValidators: true,
        useFindAndModify:false,

    });
    res.status(200).json({
        success:true,
        message:"Profile Updated!",
        user,
    });

  

});

export const updatePassword =catchAsyncErrors(async(req,res,next) =>{
    const {currentPassword,newPassword,confirmNewPassword} =req.body;
    if(!currentPassword || !newPassword || ! confirmNewPassword){
        return next(new ErrorHandler("Please Fill All Fields",400));
    }
    const user =await User.findById(req.user.id).select("+password");
    const isPasswordMatched =await user.comparePassword(currentPassword);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Incorrect Current Password",400));
    }
    if(newPassword !== confirmNewPassword){
        return next(new ErrorHandler("New Password And Confirm  Password Do Not Matched",400));

    }

    user.password =newPassword;
    await user.save();
    res.status(200).json({
        success :true,
        message:"password updated!"
    });

});

export const getUserForPortfolio =catchAsyncErrors(async(req,res,next) => {
const id ="683e677ed925bba92f3b0a76";
const user =await User.findById(id);
res.status(200).json({
    success:true,
    user,
});
});

export const forgotPassword =catchAsyncErrors(async(req,res,next) =>{
    const user =await User.findOne({email: req.body.email});
    if(!user){
        return next(new ErrorHandler("User not found",404));
    }

    const resetToken =user.getResetPasswordToken();
    await user.save({validateBeforeSave:false});
    const resetPasswordUrl =`${process.env.DASHBOARD_URL}/password/reset/${resetToken}`;
    const message =`your reset password token is:- \n\n ${resetPasswordUrl} \n\n If you have not request
    for this please ignore it.`;

   try{
    await sendEmail({
        email:user.email,
        subject:"personal portfolio dashboard recovery password",
        message,
    });
    res.status(200).json({
        success:true,
        message:`email sent to ${user.email} successfully!`,
    });
   } catch(error){
    user.resetPasswordExpire =undefined;
    user.resetPasswordToken =undefined;
    await user.save();
    return next(new ErrorHandler(error.message,500));
   }
});

export const resetPassword =catchAsyncErrors(async(req,res,next) =>{
  const {token} =req.params;
    const resetPasswordToken =crypto
  .createHash("sha256")
  .update(token)
  .digest("hex");

  const user =await User.findOne({
    resetPasswordToken,
    resetPasswordExpire:{$gt:Date.now()},
  });

  if(!user){
    return next(
        new ErrorHandler(
            "reset password token is invalid or has been expired",
            400
        )
    );
  }
  
  if(req.body.password !== req.body.confirmPassword){
    return next(new ErrorHandler("password & Confirm password do not match."));
  }

  user.password =req.body.password;
  user.resetPasswordExpire =undefined;
  user.resetPasswordToken =undefined;

  await user.save();
  generateToken(user,"Reset Password Successfully! ",200,res);

});