const near_earth_objects= {
    '2022-06-06': 
      [{
        name:"asteriod1"
      },
      {
        name:"asteriod1"
      }]
    ,
    '2022-06-07': [ {
        name:"asteriod2"
    },{
        name:"asteriod3"
    }]
}



const asteriod_data=Object.entries(near_earth_objects);



asteriod_data.map(([key,values])=>{
  console.log(key);
  values.map(value=>{
    console.log(value);
  })
})




