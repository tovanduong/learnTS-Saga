import ButtonAppBar from 'component/AppBar';
import Admin from 'features/admin/Admin';
import Login from 'features/auth/login/Login';
import Register from 'features/auth/register/Register';
import Home from 'features/user/Home';
import { UserDetail } from 'model';
import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';

function App() {
  const token = localStorage.getItem('accesstoken');
  const user: UserDetail = JSON.parse(localStorage.getItem('user') || '{}');
  const navigate = useNavigate();
  useEffect(() => {
    if (token && user.role === 'admin') {
      navigate('/admin');
    }
  }, []);

  return (
    <div className="App-container">
      <ButtonAppBar />
      <div className="App-main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/admin/*" element={<PrivateRoute />}> */}
          <Route path="/admin/*" element={<Admin />} />
          {/* </Route> */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
