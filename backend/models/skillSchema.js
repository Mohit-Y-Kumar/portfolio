import mongoose from "mongoose";

const skillSchem =new mongoose.Schema({
    title:String,
    proficiency:String,
    svg:{
        public_id:{
            type:String,
            requrired:true,
        },
        url:{
            type:String,
            required:true,
        },

    },

});

export const Skill =mongoose.model("Skill",skillSchem);
