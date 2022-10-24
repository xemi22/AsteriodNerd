import { useState, useRef, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Asteroid = ({ asteroidDataProp, favorites }) => {
  const axiosPrivate = useAxiosPrivate();
  const asteroidInfoRef = useRef(null);
  const [hideLightbox, setHideLightbox] = useState(true);
  const [asteroidData, setAsteroidData] = useState({
    aName: "",
    aId: "",
    absMagnitude: "",
    diameterMax: "",
    diameterMin: "",
    isHazard: "",
  });

  useEffect(() => {
    if (asteroidDataProp) {
      console.log("adding data for single componenet");
      if (favorites) {
        setAsteroidData({
          aName: asteroidDataProp.asteriodName,
          aId: asteroidDataProp.asteriodId,
        });
      } else {
        setAsteroidData({
          aName: asteroidDataProp.name,
          aId: asteroidDataProp.id,
          absMagnitude: asteroidDataProp.absolute_magnitude_h,
          diameterMax:
            asteroidDataProp.estimated_diameter.kilometers
              .estimated_diameter_max,
          diameterMin:
            asteroidDataProp.estimated_diameter.kilometers
              .estimated_diameter_min,
          isHazard: asteroidDataProp.is_potentially_hazardous_asteroid,
        });
      }
    }
  }, [asteroidDataProp, favorites]);

  const handleChange = async (e) => {
    const asteroidInfo = asteroidInfoRef.current.textContent;
    const { checked } = e.target;

    if (checked !== true) {
      try {
        const response = await axiosPrivate.post(
          `/fav-asteroids/rm/:${asteroidData.aId}`,
          {
            asteriodId: asteroidData.aId,
          }
        );
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    } else if (checked === true) {
      try {
        const response = await axiosPrivate.post(
          `/fav-asteroids/add/:${asteroidData.aId}`,
          {
            asteriodId: asteroidData.aId,
            asteriodName: asteroidData.aName,
            asteriodInfo: asteroidInfo,
          }
        );
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  if (asteroidDataProp) {
    if (favorites) {
      return (
        <div className="asteroid">
          <div className="pretty p-icon p-round p-smooth">
            <input onChange={handleChange} type="checkbox" />
            <div className="state p-success">
              <i className="icon mdi mdi-check"></i>
              <label></label>
            </div>
          </div>
          <div
            className="base-info"
            onMouseEnter={() => setHideLightbox(false)}
            onMouseLeave={() => setHideLightbox(true)}
          >
            Asteroid {asteroidData.aName} and id:{asteroidData.aId}
          </div>
          <br />
          <div
            ref={asteroidInfoRef}
            className={`lightbox ${hideLightbox ? "hide-lightbox" : ""}`}
          >
            {asteroidDataProp.asteriodInfo}
          </div>
        </div>
      );
    } else {
      return (
        <div className="asteroid">
          <div className="pretty p-icon p-round p-smooth">
            <input onChange={handleChange} type="checkbox" />
            <div className="state p-success">
              <i className="icon mdi mdi-check"></i>
              <label></label>
            </div>
          </div>
          <div
            className="base-info"
            onMouseEnter={() => setHideLightbox(false)}
            onMouseLeave={() => setHideLightbox(true)}
          >
            Asteroid {asteroidData.aName} and id {asteroidData.aId}
          </div>
          <br />
          <div
            ref={asteroidInfoRef}
            className={`lightbox ${hideLightbox ? "hide-lightbox" : ""}`}
          >
            Absolute magnitude of {asteroidData.absMagnitude}, maximal diameter
            of {parseFloat(asteroidData.diameterMin).toFixed(2)}km and minimal{" "}
            {parseFloat(asteroidData.diameterMax).toFixed(2)}km, also was
            considered {asteroidData.isHazard ? "hazardous" : "non-Hazardous"}
          </div>
        </div>
      );
    }
  }
};
export default Asteroid;
