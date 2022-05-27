import { Box, Grid } from '@mui/material';
import Navigation from 'component/navigation/Navigation';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './admin.scss';
import OrderDetail from './order/page/OrderDetail';
import OrderList from './order/page/OrderList';
import AddEditProduct from './product/page/AddEditProduct';
import ProductList from './product/page/ProductList';

import AddEditUser from './user/page/AddEditUser';
import UserList from './user/page/UserList';

const Admin = () => {
  return (
    <Box className="DashBoard">
      {/* {userLoading && <LinearProgress className="loading" />} */}
      <Grid container width="100%" height="100%">
        <Grid item width="350px" pt="0">
          <Navigation />
        </Grid>
        <Grid item flex="1" className="DashBoard-content">
          <Routes>
            <Route path="user" element={<UserList />} />
            <Route path="user/:id" element={<AddEditUser />} />
            <Route path="user/add" element={<AddEditUser />} />
            <Route path="order" element={<OrderList />} />
            <Route path="order/:id" element={<OrderDetail />} />
            <Route path="product" element={<ProductList />} />
            <Route path="product/:id" element={<AddEditProduct />} />
            <Route path="product/add" element={<AddEditProduct />} />
          </Routes>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Admin;
