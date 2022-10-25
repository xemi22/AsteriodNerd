import { useState, useMemo, useEffect, useCallback } from "react";
import Asteroid from "./asteroid";
import useFavorite from "../hooks/useFavorite";
const setData = (asterObj) => {
  if (asterObj.favorites) return asterObj.near_earth_objects;
  else return Object.entries(asterObj.near_earth_objects);
};
const Asteroids = ({ asterObj }) => {
  //objektin e te dhenave kthej ne array me vlera te qasshme me map
  const [favAsteriods, setFavAsteriods] = useState([]);
  const response = useFavorite();
  const asteroidsData = useMemo(() => setData(asterObj), [asterObj]);
  console.log("rendered");
  const getAsteriods = useCallback(
    async (signal) => {
      let { message, data } = await response(signal);
      if (message === "error") {
        console.error(data);
        // navigate("/auth", { state: { from: location }, replace: true });
      } else if (message === "success") {
        Object.keys(data).forEach((key) => {
          setFavAsteriods((prevfavAsteriods) => [
            ...prevfavAsteriods,
            data[key].asteriodId,
          ]);
        });
      }
    },
    [response]
  );
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    if (!asterObj.favorites) {
      getAsteriods(signal);
    }
    return () => {
      controller.abort();
    };
  }, []);

  //render
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
                  favorite={true}
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
                        console.log("asteriod is in array"+favAsteriods.includes(parseInt(asteroid.id)))
                        return (
                          <Asteroid
                            key={asteroid.id}
                            asteroidDataProp={asteroid}
                            favorites={asterObj.favorites}
                            favorite={favAsteriods.includes(parseInt(asteroid.id))?true:false}
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
