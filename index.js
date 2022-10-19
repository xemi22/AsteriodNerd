import app from "./server.js";
import mongoose from "mongoose";
import connectDB from "./config/dbConn.js";
import dotenv from "dotenv";

dotenv.config();
connectDB();


const PORT = process.env.PORT || 3001;



mongoose.connection.once('open',()=>{
    console.log('connect to mongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});