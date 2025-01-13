import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRouteadmin = ({ children }) => {
  const authToken = localStorage.getItem('authToken');
  return authToken ? children : <Navigate to="/admin/login" />;
};

export default PrivateRouteadmin;
