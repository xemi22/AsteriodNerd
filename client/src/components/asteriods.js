import { useEffect } from "react";
import Asteriod from "./asteriod";

const Asteriods = ({ asterObj }) => {
  //objektin e te dhenave kthej ne array me vlera te qasshme me map
  let asteriods_data;
  if(asterObj.favorites){
    asteriods_data= asterObj.near_earth_objects;
  } 
  else {asteriods_data=Object.entries(asterObj.near_earth_objects)}

  if (asterObj.favorites) {
    return (
      <div className="asteroid-container">
        <h3>
          Number of Asteriods is
          <span style={{ color: "rgba(100,20,20,0.9)" }}>
            {" "}
            {asterObj.element_count}
          </span>
        </h3>
        <div className="asteroids">
          {asteriods_data.map((asteriod) => {
            return (
              <Asteriod
                key={asteriod.id}
                asteriodData={asteriod}
                favorites={asterObj.favorites}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    
    return (
      <>
        {asterObj.element_count !== "" ? (
          <div className="asteroid-container">
            <h3>
              Number of Asteriods is
              <span style={{ color: "rgba(100,20,20,0.9)" }}>
                {" "}
                {asterObj.element_count}
              </span>
            </h3>
            <div className="asteroids">
              {asteriods_data.map(([date, asteriod_on_date]) => {
                return (
                  <div key={date}>
                    {asteriod_on_date.map((asteriod) => {
                      return (
                        <Asteriod
                          key={asteriod.id}
                          asteriodData={asteriod}
                          favorites={asterObj.favorites}
                        />
                      );
                    })}
                    <hr />
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          ""
        )}
      </>
    );
  }
};
export default Asteriods;
