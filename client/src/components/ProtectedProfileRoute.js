import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
const ProtectedProfileRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.user);
  if (!userInfo) {
    return <Navigate to='/' />;
  }
  return children;
};

export default ProtectedProfileRoute;
