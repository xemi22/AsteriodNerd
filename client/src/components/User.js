import { useState, useEffect, useCallback } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
const User = () => {
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    id: "",
    name: "",
    lastname: "",
    favoriteAsteriods: [],
  });
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const getUserInfo = useCallback(async () => {
    try {
      const response = await axiosPrivate.get("/user");
      setUserInfo({
        username: response.data.username,
        email: response.data.email,
        name: response.data.name,
        lastname: response.data.lastname,
      });
    } catch (err) {
      console.error(err);
      navigate("/auth", { state: { from: location }, replace: true });
    }
  },[axiosPrivate,location,navigate]);
  useEffect(() => {
    getUserInfo();

    return () => {
      setLoading(false);
    };
  }, [getUserInfo]);

  if (loading) {
    return <></>;
  } else
    return (
      <>
        <div className="userInfo">
          <div className="info-group">
            <label htmlFor="Name">Fullname:</label>
            <section>
              {userInfo.name} {userInfo.lastname}
            </section>
          </div>
          <div className="info-group">
            <label htmlFor="Name">Email:</label>
            <section>{userInfo.email}</section>
          </div>
          <div className="info-group">
            <label htmlFor="Name">Username:</label>
            <section>{userInfo.username}</section>
          </div>
          <div className="info-group">
            <label htmlFor="Name">Number of Favorite Asteriods:</label>
            <section>{userInfo.favoriteAsteriods}</section>
          </div>
        </div>
        {/* {userInfo.favoriteAsteriods.length>0 && 
     userInfo.favoriteAsteriods.map(asteriod=>
       <div>{asteriod.id}</div>
      )
    } */}
      </>
    );
};
export default User;
