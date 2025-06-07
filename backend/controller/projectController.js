import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Project } from "../models/projectSchema.js";
import {v2 as cloudinary} from "cloudinary";



export const addNewProject =catchAsyncErrors(async(req,res,next) =>{
    if(!req.files || Object.keys(req.files).length ===0){
        return next(new ErrorHandler("Project   Required!",400));
    
    };

    if (!req.body) {
        return next(new ErrorHandler("Project details are required!", 400));
    }

    const {projectBanner} =req.files;
    const { 
        title,
        description,
        gitRepoLink,
        projectLink,
        technologies ,
        stack,
        deployed ,
    } = req.body;
      

    if(
        !title ||
        !description ||
        !gitRepoLink ||
        !projectLink ||
        !technologies  ||
        !stack ||
        !deployed  
    ){
        return next(new ErrorHandler("please fill  all Fields! ",400));
    }
    
    const cloudinaryResponse =await cloudinary.uploader.upload(
        projectBanner.tempFilePath,
        {folder :"PROJECT_BANNERS"}
    );
    
    if(!cloudinaryResponse || cloudinaryResponse.error){
        console.error(
            "cloudinary Error:",
            cloudinaryResponse.error || "unknown cloudinary Error"
        );
        return next(new ErrorHandler("failed to upload banners to cloudinary",500))
    }

  
 const project =await Project.create({
    title,
    description,
    gitRepoLink,
    projectLink,
    technologies ,
    stack,
    deployed ,
    projectBanner:{
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
    },
 });

    res.status(200).json({
        success:true,
        message:"New project added! ",
        project,
    });
});

export const deleteProject =catchAsyncErrors(async(req,res,next) =>{
    const {id} =req.params;
    const project =await Project.findById(id);
    if(!project){
        return next(new ErrorHandler("project  not found! ",404));

    }
    
    await project.deleteOne();
    res.status(200).json({
        success:true,
        message:" project  deleted! ",
    });
})
export const updateProject =catchAsyncErrors(async(req,res,next) =>{
    const newProjectData = {
        title: req.body?.title,
        description: req.body?.description,
        gitRepoLink: req.body?.gitRepoLink,
        projectLink: req.body?.projectLink,
        technologies: req.body?.technologies,
        stack: req.body?.stack,
        deployed: req.body?.deployed,
      };
      
    
    if(req.files && req.files.projectBanner){
            const projectBanner =req.files.projectBanner;
            const project =await Project.findById(req.params.id);
            const projectBannerId =project.projectBanner.public_id;
            await cloudinary.uploader.destroy(projectBannerId);
            const cloudinaryResponse =await cloudinary.uploader.upload(
                projectBanner.tempFilePath,
                {folder:"PROJECT_BANNERS"}
            );
    
            newProjectData.projectBanner={
                public_id:cloudinaryResponse.public_id,
                url: cloudinaryResponse.secure_url,
            };
        }
        const project =await Project.findByIdAndUpdate(
            req.params.id,
            newProjectData,
            {
                new:true,
                runValidators:true,
                useFindAndModify:false,
            }
        );
        res.status(200).json({
            success:true,
            message:" project  updated! ",
            project,
        });
});
export const getAllProjects =catchAsyncErrors(async(req,res,next) =>{
    const projects =await Project.find();
            res.status(200).json({
                success:true,
                projects,
            });
    
});

export const getSingleProject =catchAsyncErrors(async(req,res,next) =>{
    const {id} =req.params;
    const project =await Project.findById(id);
    if(!project){
        return next(new ErrorHandler("project  not found! ",404));

    }
    res.status(200).json({
        success:true,
        project,
    });
    
});
