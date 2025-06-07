import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { SoftwareApplication } from "../models/softwareApplicationSchema.js";
import {v2 as cloudinary} from "cloudinary";

export const addNewApplication =catchAsyncErrors(async(req,res,next) =>{
    if(!req.files || Object.keys(req.files).length ===0){
        return next(new ErrorHandler("sofware img Required!",400));
    
    };

    if (!req.body || !req.body.name) {
        return next(new ErrorHandler("software name is required", 400));
      }
      const { name } = req.body;
      
    const {svg} =req.files;

    if(!name){
        return next(new ErrorHandler("software name is required",400));
    }
    
    const cloudinaryResponse =await cloudinary.uploader.upload(
        svg.tempFilePath,
        {folder :"PORTFOLIO_SOFTWARE_APPLICATIONS"}
    );
    
    if(!cloudinaryResponse || cloudinaryResponse.error){
        console.error(
            "cloudinary Error:",
            cloudinaryResponse.error || "unknown cloudinary Error"
        );
    }

    const softwareApplication =await SoftwareApplication.create({
        name,
        svg:{
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        }
    });

    res.status(200).json({
        success:true,
        message:"New software application added! ",
        softwareApplication,
    });
});
export const deleteApplication =catchAsyncErrors(async(req,res,next) =>{
    const {id} =req.params;
    const softwareApplication =await SoftwareApplication.findById(id);
    if(!softwareApplication){
        return next(new ErrorHandler("software application  not found! ",400));

    }
    const softwareApplicationSvgId =softwareApplication.svg.public_id;
    await cloudinary.uploader.destroy(softwareApplicationSvgId);
    await softwareApplication.deleteOne();
    res.status(200).json({
        success:true,
        message:"software application deleted! ",
    });

});
export const getAllApplications =catchAsyncErrors(async(req,res,next) =>{
      const softwareApplications =await SoftwareApplication.find();
        res.status(200).json({
            success:true,
            softwareApplications,
        });
});