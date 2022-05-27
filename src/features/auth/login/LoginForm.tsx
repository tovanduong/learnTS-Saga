import InputField from 'component/formField/InputField';
import InputForm from 'component/formField/InputField';
import { User } from 'model';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { LoginPayLoad } from '../authSlice';
import { FormLogin } from './Login';
export interface LoginFormProps {
  initialValue: FormLogin;
  onSubmit: (formValue: FormLogin) => void;
}

const LoginForm = ({ initialValue, onSubmit }: LoginFormProps) => {
  const { control, handleSubmit } = useForm<FormLogin>({
    defaultValues: initialValue,
  });

  const handleSubmitForm = (formValue: FormLogin) => {
    onSubmit(formValue);
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)} className="form-auth">
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
        <p className="fogetPw">
          Forget Password ?<Link to="/"> Click Here</Link>
        </p>
        <p className="sw-link">
          <Link to="/signup">Sign up</Link>
        </p>
      </div>
      <p className="sw-google">
        <Link to="/signup">Login With Google</Link>
      </p>
    </form>
  );
};

export default LoginForm;
