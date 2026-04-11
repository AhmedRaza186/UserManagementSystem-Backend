let mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const responseHandler = require('./responseHandle');
const formatMongoError = require('./formantMongoErrors');

async function connectDB(){
try{
   const con = await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB' + con.connection.host);
}
catch(err){
    return err
}
}



module.exports =  connectDB ;