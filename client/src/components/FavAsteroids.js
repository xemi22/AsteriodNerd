import React from "react";
import Asteroids from "./asteroids";
import { useState, useEffect, useCallback } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

const FavAsteroids = () => {
  const [loading, setLoading] = useState(true);
  const [asteroids, setAsteriods] = useState({
    favorites: true,
    element_count: Number,
    near_earth_objects: [],
  });
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const getFavAsteroids = useCallback(async () => {
    try {
      const response = await axiosPrivate.get("/fav-asteroids");

      let responseData = Object.values(response.data);
      setAsteriods({
        favorites: true,
        element_count: responseData.length,
        near_earth_objects: responseData,
      });
    } catch (err) {
      console.log(err);
      navigate("/auth", { state: { from: location }, replace: true });
    }
  }, [ axiosPrivate, location, navigate]);

  useEffect(() => {
    if (loading) {
      getFavAsteroids().then(setLoading(false));
      console.log("favorit asteroid request logging ");
    }
  }, [getFavAsteroids, loading]);

  if (loading) return <></>;
  else
    return (
      <div className="asteriods_content">
        <Asteroids asterObj={asteroids} />
      </div>
    );
};
export default FavAsteroids;
