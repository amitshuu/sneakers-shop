import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedOrderRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.user);

  if (userInfo) {
    return <Navigate to='/' />;
  }
  return children;
};

export default ProtectedOrderRoute;
