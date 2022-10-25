import useAxiosPrivate from "../hooks/useAxiosPrivate";
// import { useCallback } from "react";

const useFavorite = (signal) => {
  const axiosPrivate = useAxiosPrivate();
  const getFavAsteroids = async () => {
    try {
      const response = await axiosPrivate.get("/fav-asteroids", {
        signal: signal,
      });

      return { message: "success", data: response.data };
    } catch (err) {
      return { message: "error", data: err };
    }
  };
  return getFavAsteroids;
};

export default useFavorite;
