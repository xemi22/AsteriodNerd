
import fetch from "node-fetch";
const handleAsteroidRequest  =async(req,res)=>{

    if(!req?.query?.sdate || !req?.query?.edate)
    return res.status(400)
        .json({message:"Need to provide start and end date for asteriod information."})
    const sdate=req.query.sdate;
    const edate=req.query.edate;
    if(!sdate || !edate)
        return res.status(400)
        .json({message:"Need to provide start and end date for asteriod information."})
    const requrl=`${process.env.NASA_API}start_date=${sdate}&end_date=${edate}&detailed=false&api_key=${process.env.NASA_API_KEY}`
    console.log(typeof(requrl))
    try{
        const nasa_res= await fetch(requrl)
        const data=await nasa_res.json()
            console.log(data);
            res.json(data)
        }
        catch(err){
            console.error(err.stack);
        }
}

export default handleAsteroidRequest;