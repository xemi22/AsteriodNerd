import Layout from "./components/Layout";
import Login from "./components/Login";

import Navbar from "./components/navbar";
import Home from "./components/Home";
import FavAsteroids from "./components/FavAsteroids";
import User from "./components/User";
import Register from "./components/RegisterForm.js";
// import NoPage from "./components/NoPage";
import { Routes, Route } from "react-router-dom";
// import api from "./components/api/posts.js";

function App() {
  

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/auth" element={<Login />} />
       
        <Route path="/register" element={<Register />} />
        {/* <Route element={<RequireAuth />}> */}
        <Route path="/" element={<Navbar />}>
          <Route
            index
            element={<Home  />}
          />
          <Route
            path="/favorite-asteriods"
            element={
              <FavAsteroids  />
            }
          />
          <Route path="/user" element={<User />} />
        </Route>
      </Route>
      {/* </Route> */}
    </Routes>
  );
}

export default App;
