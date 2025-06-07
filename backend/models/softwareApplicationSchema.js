import mongoose from "mongoose";

const softwareApplicationApplicationSchema =new mongoose.Schema({
    name:String,
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

export const SoftwareApplication =mongoose.model("SoftwareApplication",softwareApplicationApplicationSchema);
