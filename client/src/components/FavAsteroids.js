import React from "react";
import Asteroids from "./asteroids";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useFavorite from "../hooks/useFavorite";
import { useCallback } from "react";

const FavAsteroids = () => {
  const [loading, setLoading] = useState(null);
  const [asteroids, setAsteriods] = useState({
    favorites: true,
    element_count: Number,
    near_earth_objects: [],
  });
 
  const navigate = useNavigate();
  const location = useLocation();
  const response=useFavorite()
  
  useEffect(()=>{
    setLoading(true);
  },[])

  const getAsteriods =useCallback(
  async(signal)=>{
    let {message,data}=await response(signal);
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
    const controller=new AbortController();
    const signal=controller.signal 
    console.log("loading state "+loading);
    if (loading) {
        console.log("calling getAsteriods");
        getAsteriods(signal);
      
    }
    return()=>{
      console.log("aborting controller")
      controller.abort();
      setLoading(false)
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
