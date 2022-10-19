import { useState, useEffect, useRef } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

const Asteriod = ({ asteriodData, favorites }) => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const asteriodInfoRef = useRef(null);
  const [hideLightbox, setHideLightbox] = useState(true);
  let name;
  let id;
  if (!favorites) {
    const id = asteriodData.id;
    const name = asteriodData.name;
    const absMagnitude = asteriodData.absolute_magnitude_h;
    const diameter_min =
      asteriodData.estimated_diameter.kilometers.estimated_diameter_min;
    const diameter_max =
      asteriodData.estimated_diameter.kilometers.estimated_diameter_max;
    const isHazadous = asteriodData.is_potentially_hazardous_asteroid;
  } else {
    const name = asteriodData.asteriodName;
    const id = asteriodData.asteriodId;
  }

  const handleChange = async (e) => {
    const asteriodInfo = asteriodInfoRef.current.textContent;
    const { checked } = e.target;

    if (checked !== true) {
      try {
        const response = await axiosPrivate.post(`/fav-asteroids/rm/:${id}`, {
          asteriodId: id,
        });
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    } else if (checked === true) {
      try {
        const response = await axiosPrivate.post(
          `/fav-asteroids/add/:${asteriodData.id}`,
          {
            asteriodId: asteriodData.id,
            asteriodName: name,
            asteriodInfo: asteriodInfo,
          }
        );
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    }
  };

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
          className="text"
          onMouseEnter={() => setHideLightbox(false)}
          onMouseLeave={() => setHideLightbox(true)}
        >{`Asteriod ${asteriodData.asteriodName} and id ${asteriodData.asteriodId}`}</div>
        <br />
        <div
          ref={asteriodInfoRef}
          className={`lightbox ${hideLightbox ? "hide-lightbox" : ""}`}
        >
          {asteriodData.asteriodInfo}
        </div>
      </div>
    );
  } else {
    const name = asteriodData.name;
    const absMagnitude = asteriodData.absolute_magnitude_h;
    const diameter_min =
      asteriodData.estimated_diameter.kilometers.estimated_diameter_min;
    const diameter_max =
      asteriodData.estimated_diameter.kilometers.estimated_diameter_max;
    const isHazadous = asteriodData.is_potentially_hazardous_asteroid;

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
          className="text"
          onMouseEnter={() => setHideLightbox(false)}
          onMouseLeave={() => setHideLightbox(true)}
        >{`Asteriod ${name} and id ${asteriodData.id}`}</div>
        <br />
        <div
          ref={asteriodInfoRef}
          className={`lightbox ${hideLightbox ? "hide-lightbox" : ""}`}
        >
          {`Absolute magnitude of ${absMagnitude},
          diameter min ${parseFloat(diameter_min).toFixed(2)}km, 
          max ${parseFloat(diameter_max).toFixed(2)}km
         and is considered ${isHazadous ? "hazardous" : "non-Hazardous"}`}
        </div>
      </div>
    );
  }
};
export default Asteriod;
