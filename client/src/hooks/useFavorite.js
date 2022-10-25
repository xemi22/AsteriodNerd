import useAxiosPrivate from "../hooks/useAxiosPrivate";
// import { useCallback } from "react";

const useFavorite = () => {
  const axiosPrivate = useAxiosPrivate();
  const getFavAsteroids = async () => {
    try {
      const response = await axiosPrivate.get("/fav-asteroids");
      let responseData = Object.values(response.data);
      console.log("useFavorite instance called and returned");
      return { message: "success", data: responseData };
    } catch (err) {
      return { message: "error", data: err };
    }
  };
  return getFavAsteroids;
};

export default useFavorite;
