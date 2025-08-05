import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoutevendor = ({ children }) => {
  const authToken = localStorage.getItem('vendorToken');

  return authToken ? (
    children
  ) : (
    <Navigate to="/vendor/login" replace={true} />
  );
};

export default PrivateRoutevendor;
