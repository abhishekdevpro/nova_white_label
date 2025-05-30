import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../store/selectors/AuthSelectors";

const UserPrivateRoute = ({ children }) => {
  const authStatus = useSelector(isAuthenticated);

  if (authStatus) {
    return <div>{children}</div>;
  } else {
    return 
    <Navigate to="/user/login" />;
  }
};

export default UserPrivateRoute;
