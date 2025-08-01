import React from "react";
import { Navigate } from "react-router-dom";

const UserPrivateRoute = ({ children }) => {
  const authStatus = !!localStorage.getItem("jobSeekerLoginToken");
  return authStatus ? <>{children}</> : <Navigate to="/user/login" replace />;
};

export default UserPrivateRoute;
