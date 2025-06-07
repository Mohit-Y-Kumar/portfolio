import mongoose from "mongoose";
const dbConnection =() =>{
    mongoose.connect(process.env.MONGO_URL,{
        dbName:"PORTFOLIO",
    })
    .then(() =>{
        console.log("connected to database");
    })
    .catch((error) =>{
        console.log(`some error occured while connect to database ${error}`)
    })
}

export default dbConnection;