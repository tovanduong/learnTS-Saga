import { UserDetail } from 'model';
import React from 'react';
import { Navigate, Route, RouteProps, Outlet } from 'react-router-dom';

export const PrivateRoute = () => {
  const isLoggin = Boolean(localStorage.getItem('accesstoken'));
  const user: UserDetail = JSON.parse(localStorage.getItem('user') || '{}');
  return isLoggin && user?.role === 'admin' ? <Outlet /> : <Navigate to="/" />;
};
