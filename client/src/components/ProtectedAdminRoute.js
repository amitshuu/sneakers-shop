import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedAdminRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.user);

  if (userInfo && !userInfo.isAdmin) {
    return <Navigate to='/' />;
  }
  return children;
};

export default ProtectedAdminRoute;
