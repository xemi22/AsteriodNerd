import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Asteroids from "./asteroids.js";
import AsteroidControl from "./asteroidcontrol";
import "./css/loading.css";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Home = () => {
  const [loading, setLoading] = useState(null);
  const [asteroidRequestState, setAsteroidRequestState] = useState(null);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [asteroids, setAsteroids] = useState({
    favorites: "",
    links: {},
    element_count: Number,
    near_earth_objects: {},
  });

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const controller = new AbortController();
    if (asteroidRequestState) {
      setLoading(true);
      const getAsteroids = async () => {
        try {
          const response = await axiosPrivate.get("/asteroids", {
            params: {
              sdate: startDate,
              edate: endDate,
            },
            signal: controller.signal,
          });
          return response.data;
        } catch (err) {
          if ((err.name = "AborError")) console.log("Aborted Request");
          else console.error(err);
          navigate("/auth", { state: { from: location }, replace: true });
        }
      };

      console.log("getAsteriodsEffect is happening");
      getAsteroids()
        .then((data) => {
          console.log("data recieve from api:");
          console.log(data);
          setAsteroids(() => ({
            // Retain the existing values
            favorites: false,
            links: data.links,
            element_count: parseInt(data.element_count),
            near_earth_objects: data.near_earth_objects,
          }));
        })
        .then(() => {
          console.log(asteroids);
          setAsteroidRequestState(false);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setAsteroidRequestState(false);
          setLoading(false);
        });
    }
    return () => {
      controller.abort();
    };
  }, [
    asteroidRequestState,
    axiosPrivate,
    startDate,
    endDate,
    navigate,
    asteroids,
    location,
  ]);

  return (
    <div className="asteriods_content">
      <AsteroidControl
        setLoading={setLoading}
        setAsteroidRequestState={setAsteroidRequestState}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />

      {loading ? (
        <div class="loading">
          Loading
          <div className="inner-loading"></div>
        </div>
      ) : null}
      {!loading && parseInt(asteroids.element_count) > 0 ? (
        <Asteroids asterObj={asteroids} />
      ) : null}
    </div>
  );
};
export default Home;
