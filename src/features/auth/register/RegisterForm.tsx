import InputField from 'component/formField/InputField';
import InputForm from 'component/formField/InputField';
import { User } from 'model';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { SignUpPayLoad } from '../authSlice';
export interface LoginFormProps {
  initialValue: SignUpPayLoad;
  onSubmit: (formValue: SignUpPayLoad) => void;
}

const RegisterForm = ({ initialValue, onSubmit }: LoginFormProps) => {
  const { control, handleSubmit } = useForm<SignUpPayLoad>({
    defaultValues: initialValue,
  });

  const handleSubmitForm = (formValue: SignUpPayLoad) => {
    onSubmit(formValue);
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)} className="form-auth">
      <InputField
        name="username"
        placeholder="user name"
        control={control}
        type="text"
        className="auth-input"
      />
      <InputField
        name="email"
        placeholder="email"
        control={control}
        type="text"
        className="auth-input"
      />
      <InputField
        name="password"
        placeholder="password"
        control={control}
        type="password"
        className="auth-input"
      />
      <input className="auth-btn" type="submit" value="Login" />
      <div className="sw-auth">
        <p className="sw-link">
          <Link to="/login">Login</Link>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;
