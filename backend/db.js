import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config({
    path:'.envs/.env'
});
const mongoURI = process.env.MONGODB_URI;
const connectToMongo = async()=>{
    mongoose.connect(mongoURI)
    .then(()=> console.log("connected to database"))
    .catch((err)=> console.log(err))
    
}
export default connectToMongo