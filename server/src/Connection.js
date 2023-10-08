import mongoose from "mongoose";

const Connection =async ()=>{
    try{
        const connect=await mongoose.connect(process.env.CONNECTION_STRING);
        console.log(`Database Conected Successfuly. `, connect.connection.host, connect.connection.name);
    }
    catch (err){
        console.log(err);
        process.exit(1);
    }
}

export {Connection as connectDB};