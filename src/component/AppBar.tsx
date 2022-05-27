import MenuIcon from '@mui/icons-material/Menu';
import { Box, Button } from '@mui/material';
import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { logout } from 'features/auth/authSlice';
import { UserDetail } from 'model';
import { accesstoken } from 'model/common';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loading from './common/Loading';

export interface logoutType {
  deviceId: string;
  refreshToken: string;
}

export default function ButtonAppBar() {
  const dispatch = useAppDispatch();
  const accesstoken = localStorage.getItem('accesstoken');
  const token: accesstoken = JSON.parse(accesstoken || '{}') as accesstoken;
  const user: UserDetail = JSON.parse(localStorage.getItem('user') || '{}');
  const isLoggIn = useAppSelector((state) => state.auth.isLoggIn);
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout({ deviceId: 'deviceId', refreshToken: token.refresh?.token || '' }));
    navigate('/login');
  };
  const loading = useAppSelector((state) => state.auth.loading);
  if (loading) {
    return <Loading />;
  } else
    return (
      <Box>
        <AppBar position="static" sx={{ bgcolor: '#C4C4C4', color: '#000' }}>
          <Toolbar>
            <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {token && user.role === 'admin' ? (
                <Link to="/admin">Learn Saga - TypeScript</Link>
              ) : (
                <Link to="/">Learn Saga - TypeScript</Link>
              )}
            </Typography>

            {accesstoken || isLoggIn ? (
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Button>
                <Link to="/login">login</Link>
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    );
}
