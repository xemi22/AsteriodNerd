import React from "react";
import Asteroids from "./asteriods";
import AsteriodControl from "./asteriodcontrol";
import { useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
const Home = () => {
  const [loading,setLoading]=useState(false)
  const [asteroids, setAsteroids] = useState({
    favorite:false,
    links: {},
    element_count: "",
    near_earth_objects: {},
  });
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const getAsteroids = async (startDate, endDate) => {
    setLoading(true)
    try {
      const response = await axiosPrivate.get("/asteroids", {
        params: {
          sdate:startDate,
          edate:endDate,
        },
      });
      
      setAsteroids({
        links: response.data.links,
        element_count: response.data.element_count,
        near_earth_objects: response.data.near_earth_objects,
      });
      setLoading(false)
    } catch (err) {
      console.error(err);
       
    }
  };



  return (
    <div className="asteriods_content">
      <AsteriodControl getAsteroids={getAsteroids} />
      {loading?"":(
        <Asteroids asterObj={asteroids} />
      )}
      
    </div>
  );
};
export default Home;
