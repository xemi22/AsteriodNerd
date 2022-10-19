import React from "react";
import Asteroids from "./asteriods";
import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

const FavAsteriods = () => {
  const [loading, setLoading] = useState(true);
  const [asteroids, setAsteriods] = useState({
    favorites:true,
    element_count: Number,
    near_earth_objects: [],
  });
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    getFavAsteroids()
      .then(setLoading(false))
  }, []);

  const getFavAsteroids = async () => {
    try {
      const response = await axiosPrivate.get("/fav-asteroids");
      
      let responseData=Object.values(response.data)
        console.log(responseData)
       setAsteriods({
        favorites:true,
        element_count:responseData.length,
        near_earth_objects:responseData,
      });
      
    } catch (err) {
      console.log(err);
       navigate("/auth", { state: { from: location }, replace: true });
    }
  };
  if (loading) 
    return <></>;
   else
  return (
    <div className="asteriods_content">
      <Asteroids asterObj={asteroids}/>
    </div>
  );
};
export default FavAsteriods;
