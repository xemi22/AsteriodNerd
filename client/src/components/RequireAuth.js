// import { useLocation, Navigate, Outlet } from "react-router-dom";
// import useAuth from "../hooks/useAuth";

// const RequireAuth = () => {
//     const { auth } = useAuth();
//     const location = useLocation();

//     return (
//          auth?.user
//                 ? <Navigate to="/unauthorized" state={{ from: location }} replace />
//                 : <Navigate to="/auth" state={{ from: location }} replace />
//     );
// }

// export default RequireAuth;