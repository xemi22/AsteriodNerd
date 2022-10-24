import { useNavigate, Link, Outlet } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const Navbar = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const logout = async () => {
    setAuth({});
    navigate("/auth");
  };
  return (
    <div className="outlet">
      <div className="navbar">
        <div className="left-nav">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/favorite-asteriods">Favorites</Link>
            </li>
            <li>
              <Link to="/user">User </Link>
            </li>
          </ul>
        </div>
        <div className="right-nav">
          <section>Welcome Asteriod Fan</section>
          <button className="styled-btn" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Navbar;
