import mongoose from "mongoose";
const connectDB=async()=>{
    try{
            mongoose.connect(process.env.DATABASE_URI,{
            useUnifiedTopology:true,
            //useNewUrlParse:true
            wtimeoutMS: 2500,
           maxPoolSize: 50, 
        });
    }
    catch(err){
        console.log(err);
    }
}
export default connectDB;