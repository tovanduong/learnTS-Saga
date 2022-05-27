import { useAppDispatch, useAppSelector } from 'app/hooks';
import Loading from 'component/common/Loading';
import { UserDetail } from 'model';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../authSlice';
import '../login.scss';
import LoginForm from './LoginForm';

export interface FormLogin {
  email: string;
  password: string | number;
}

const Login = () => {
  const initialValue: FormLogin = {
    email: '',
    password: '',
  };
  const navigate = useNavigate();
  const loading = useAppSelector((state) => state.auth.loading);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const userLocal: UserDetail = JSON.parse(localStorage.getItem('user') || '{}');
  const handleSubmit = (value: FormLogin) => {
    dispatch(login({ ...value, deviceId: 'deviceId' }));
  };

  useEffect(() => {
    if (user?.role === 'admin' || userLocal.role === 'admin') {
      navigate('/admin');
    }
    if (user?.role === 'user' || userLocal.role === 'user') {
      navigate('/');
    }
  }, [user]);

  if (loading) {
    return <Loading />;
  } else
    return (
      <div className="auth-container">
        <div className="box-auth">
          <h2>To Learn Front End - Login</h2>
          <LoginForm initialValue={initialValue} onSubmit={handleSubmit} />
        </div>
      </div>
    );
};

export default Login;
