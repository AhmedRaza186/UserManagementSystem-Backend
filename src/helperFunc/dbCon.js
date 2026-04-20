import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


async function connectDB(){
try{
   const con = await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB' + con.connection.host);
}
catch(err){
    console.error("MongoDB Connection Error:", err);
    return err
}
}



export default connectDB;
