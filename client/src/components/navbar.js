import { useNavigate, Link ,Outlet} from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const Navbar = ({ FavoriteAsteriods }) => {
  const {setAuth}=useContext(AuthContext);
  const navigate = useNavigate();
  const logout=async()=>{
    setAuth({});
    navigate('/auth');
  }
  return (
    <><div className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/favorite-asteriods">FavoriteAsteriods</Link></li>
        <li><Link to="user">User Info</Link></li>
      </ul>
      <h4>
        Welcome <span>welcome</span>
      </h4>
      <button className="styled-btn" onClick={logout}>
        Logout
      </button>
     
    </div>
    <Outlet/>
    </>
  );
};

export default Navbar;
