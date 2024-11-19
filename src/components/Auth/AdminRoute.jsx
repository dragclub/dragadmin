/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");
  return token ? children : <Navigate to="/" />;
};

export default AdminRoute;
