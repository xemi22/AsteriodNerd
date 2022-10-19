import dotenv from "dotenv";

dotenv.config();
const url = 'https://api.nasa.gov/neo/rest/v1/feed?start_date=2022-06-01&end_date=2022-06-07&api_key=K2RbbQU3RuFxf5zBPqglNq8Ge9wFn8iE8C5tt1Pa'

const requrl=`${process.env.NASA_API}start_date=2022-06-01&end_date=2022-06-07&api_key=${process.env.NASA_API_KEY}`
import fetch from "node-fetch";
// const getAsteroids = async () => {
//   const res = await fetch(url);
//   const data =await res.json();
  
//   return await data;
// };
const printData=(data)=>{
  console.log(`The number of asteroids in forementioned time period is ${data.element_count} `)
  const asteroids=data.near_earth_objects;
  console.log(typeof(asteroids))
  console.log(asteroids)
}

fetch(requrl)
.then(res=>res.json())
.then(data=>printData(data))
.catch(err=>{
    console.error(err.stack)
})

