import React from "react";
import Asteroids from "./asteroids";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useFavorite from "../hooks/useFavorite";
import { useCallback } from "react";

const FavAsteroids = () => {
  const [loading, setLoading] = useState(true);
  const [asteroids, setAsteriods] = useState({
    favorites: true,
    element_count: Number,
    near_earth_objects: [],
  });
 
  const navigate = useNavigate();
  const location = useLocation();
  const response=useFavorite()
  

  const getAsteriods =useCallback(
  async()=>{
    let {message,data}=await response();
    if(message==="error")
    { 
      console.error(data);
      navigate("/auth", { state: { from: location }, replace: true });
    }
    else if (message==="success")
    {
      setAsteriods({
              favorites: true,
              element_count: data.length,
              near_earth_objects: data
            });
          
    }
    else console.log("why am i here");
  },[response,location,navigate])

  useEffect(() => {
    console.log("loading state "+loading);
    if (loading) {
        console.log("calling getAsteriods");
        getAsteriods();
      
    }
    return()=>{
      setLoading(loadingState=>{
        return false;
      })
    }
  }, [getAsteriods,loading]);

  if (loading) return <></>;
  else
    return (
      <div className="asteriods_content">
        <Asteroids asterObj={asteroids} />
      </div>
    );
};
export default FavAsteroids;
