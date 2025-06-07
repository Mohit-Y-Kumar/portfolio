import mongoose from "mongoose";

const timelineSchema =new mongoose.Schema({
    title:{
        type:String,
        required :[true,"Title Required!  "],

    },
    description:{
        type:String,
        required :[true,"Description Required!"],
        
    },
    timeline:{
        from: {
            type: String,
            required: [true, "Timeline Starting Date is Required!"],
            match: [/^\d{4}-(0[1-9]|1[0-2])$/, "Format should be YYYY-MM (e.g., 2024-06)"]
        },
        to: {
            type: String,
            match: [/^\d{4}-(0[1-9]|1[0-2])$/, "Format should be YYYY-MM (e.g., 2024-06)"]
        }
    },

    
});

export const Timeline =mongoose.model("Timeline",timelineSchema);