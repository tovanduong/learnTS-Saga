import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { logoutType } from 'component/AppBar';
import { UserDetail } from 'model';

export interface authState {
  isLoggIn: Boolean;
  loading: Boolean;
  user?: UserDetail;
  errorMessage: string;
}
export interface LoginPayLoad {
  email: string;
  password: string | number;
  deviceId: string;
}

export interface SignUpPayLoad {
  username: string;
  password: string | number;
  email: string;
}

const initialState: authState = {
  isLoggIn: false,
  loading: false,
  user: undefined,
  errorMessage: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginPayLoad>) => {
      state.loading = true;
    },
    loginSuccess: (state, action: PayloadAction<UserDetail>) => {
      state.isLoggIn = true;
      state.loading = false;
      state.user = action.payload;
    },
    loginFail: (state, action: PayloadAction<string>) => {
      state.isLoggIn = false;
      state.loading = false;
      state.errorMessage = action.payload;
    },
    logout: (state, action: PayloadAction<logoutType>) => {
      state.isLoggIn = false;
      state.user = undefined;
    },
  },
});

export const { login, loginFail, loginSuccess, logout } = authSlice.actions;

export const errorMessage = (state: any) => state.auth.errorMessage;

export default authSlice.reducer;
