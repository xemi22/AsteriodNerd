import { useMemo } from "react";
import Asteroid from "./asteroid";

const setData = (asterObj) => {
  if (asterObj.favorites) return asterObj.near_earth_objects;
  else return Object.entries(asterObj.near_earth_objects);
};

const Asteroids = ({ asterObj }) => {
  //objektin e te dhenave kthej ne array me vlera te qasshme me map

  const asteroidsData = useMemo(() => setData(asterObj), [asterObj]);

  if (asterObj?.element_count > 0) {
    if (asterObj?.favorites) {
      return (
        <div className="asteroid-container">
          <div className="asteriod-num">
            Number of asteroids is {asterObj.element_count}
          </div>
          <div className="asteroids">
            {asteroidsData.map((asteroid) => {
              return (
                <Asteroid
                  key={asteroid.id}
                  asteroidDataProp={asteroid}
                  favorites={asterObj.favorites}
                />
              );
            })}
          </div>
        </div>
      );
    } else if (!asterObj?.favorites) {
      return (
        <>
          {asterObj?.element_count !== "" ? (
            <div className="asteroid-container">
              <div className="asteriod-num">
                Number of asteroids is {asterObj.element_count}
              </div>
              <div className="asteroids">
                {asteroidsData.map(([date, asteroid_on_date]) => {
                  return (
                    <div key={date}>
                      {asteroid_on_date.map((asteroid) => {
                        return (
                          <Asteroid
                            key={asteroid.id}
                            asteroidDataProp={asteroid}
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
    } else return "";
  }
};
export default Asteroids;
