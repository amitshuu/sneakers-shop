import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, path }) => {
  const { userInfo } = useSelector((state) => state.user);

  const location = useLocation();
  const redirect = location.search ? location.search.split('=')[1] : null;

  if (userInfo && redirect) {
    return <Navigate to={`/shop/${redirect}`} />;
  } else if (userInfo) {
    return <Navigate to='/' />;
  }
  return children;
};

export default ProtectedRoute;
