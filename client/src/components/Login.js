import { useRef, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth.js";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "./api/posts.js";

const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");

  const [error, setError] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setError("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "/auth",
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));

      const accessToken = response?.data?.accessToken;
      console.log(accessToken);
      setAuth({ user, pwd, accessToken });
      setUser("");
      setPwd("");
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setError("No Server Response");
      } else if (err.response?.status === 400) {
        setError("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setError("Unauthorized");
      } else {
        setError("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-inner">
        <h2>Login</h2>
        {error !== "" ? (
          <div ref={errRef} className="error">
            {error}
          </div>
        ) : (
          ""
        )}
        <div className="form-group">
          <label htmlFor="email">Username:</label>
          <input
            ref={userRef}
            type="text"
            name="username"
            id="usernam"
            onChange={(e) => setUser(e.target.value)}
            value={user}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
          />
        </div>
        <input type="submit" value="Login" className="styled-btn" />
        <button className="styled-btn">
          <Link to="/register" style={{ textDecoration: "none", color: "white" }}>
            Register
          </Link>
        </button>
      </div>
    </form>
  );
};
export default Login;
