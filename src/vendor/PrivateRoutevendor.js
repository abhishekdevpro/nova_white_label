import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoutevendor = ({ children }) => {
  const authToken = localStorage.getItem('vendorToken');
  return authToken ? children : <Navigate to="/vendor/login" />;
};

export default PrivateRoutevendor;
