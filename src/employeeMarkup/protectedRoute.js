import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { isEmployeeAuthenticated } from "../store/selectors/AuthSelectors";

const EmployeePrivateRoute = ({ children }) => {
  const authStatus = useSelector(isEmployeeAuthenticated);

  if (authStatus) {
    return <div>{children}</div>;
  } else {
    return <Navigate to="/employer/login" />;
  }
};

export default EmployeePrivateRoute;
