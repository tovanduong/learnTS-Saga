import { useAppDispatch } from 'app/hooks';
import React from 'react';
import { login, LoginPayLoad, SignUpPayLoad } from '../authSlice';
import '../login.scss';
import RegisterForm from './RegisterForm';

const Register = () => {
  const initialValue: SignUpPayLoad = {
    username: '',
    password: '',
    email: '',
  };

  const dispatch = useAppDispatch();
  const handleSubmit = (value: SignUpPayLoad) => {
    console.log(value);
  };
  return (
    <div className="auth-container">
      <div className="box-auth">
        <h2>To Learn Front End - Register</h2>
        <RegisterForm initialValue={initialValue} onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default Register;
