import { BrowserRouter, Routes, Route, Router } from 'react-router-dom';

import {
  CartPage,
  HomePage,
  LoginPage,
  OrderPage,
  ProductPage,
  RegisterPage,
  ShopPage,
} from './pages';

import MobileMenu from './components/MoblieMenu';

import { ProtectedProfileRoute, ProtectedRoute, Footer } from './components';
import {
  MainLayout,
  UserProfile,
  UserShipping,
  PurchaseHistory,
} from './pages/UserDashboard';
import { AdminLayout, EditItem, NewItem } from './pages/AdminDashboard';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from './features/userSlice';
import { GET_USER_DETAILS } from './graphql/Queries/userQueries';
import { useQuery } from '@apollo/client';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import jwtDecode from 'jwt-decode';
import { useLogout } from './utils/customHooks';

const App = () => {
  const { userInfo } = useSelector((state) => state.user); // JWT details
  const { data, loading } = useQuery(GET_USER_DETAILS, {
    skip: !userInfo,
  });

  const { handleLogout } = useLogout();
  const dispatch = useDispatch();

  const token = localStorage.getItem('jwtToken');

  useEffect(() => {
    if (token && jwtDecode(token)?.exp < Date.now() / 1000) {
      localStorage.removeItem('jwtToken');
      handleLogout();
    }
  }, [token, handleLogout]);

  useEffect(() => {
    if (!loading && data && data?.getUserById.id === userInfo?.id) {
      dispatch(loginUser(data?.getUserById, loading));
    }
  }, [dispatch, data, loading, userInfo?.id]);

  return (
    <>
      <MobileMenu />
      <Routes>
        <Route exact path='/' element={<HomePage />} />
        <Route path='/shop' element={<ShopPage />} />
        <Route path='/shop/:id' element={<ProductPage />} />
        <Route path='/cart' element={<CartPage />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute>
              <LoginPage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute>
              <RegisterPage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/'
          element={
            <ProtectedProfileRoute>
              <MainLayout />
            </ProtectedProfileRoute>
          }
        >
          <Route path='/profile' element={<UserProfile />} />
          <Route path='/shipping' element={<UserShipping />} />
          <Route path='/history' element={<PurchaseHistory />} />
        </Route>
        <Route
          path='/'
          element={
            <ProtectedAdminRoute>
              <AdminLayout />
            </ProtectedAdminRoute>
          }
        >
          <Route path='/new-item' element={<NewItem />} />
          <Route path='/edit-item' element={<EditItem />} />
        </Route>
        <Route
          path='/order/'
          element={
            <ProtectedProfileRoute>
              <OrderPage />
            </ProtectedProfileRoute>
          }
        />
      </Routes>

      <Footer />
    </>
  );
};

export default App;
