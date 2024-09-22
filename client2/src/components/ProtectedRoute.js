// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookie from 'js-cookie';

const ProtectedRoute = ({ element: Component }) => {
  const token = Cookie.get('jwt_token');

  // If token doesn't exist, redirect to login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the component
  return <Component />;
};

export default ProtectedRoute;
