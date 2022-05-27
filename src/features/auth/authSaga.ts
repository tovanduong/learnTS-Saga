import { PayloadAction } from '@reduxjs/toolkit';
import { postLogin, postLogout } from 'api/auth/authAPI';
import { logoutType } from 'component/AppBar';
import { call, fork, put, take } from 'redux-saga/effects';
import { login, loginFail, LoginPayLoad, loginSuccess, logout } from './authSlice';

function* handleLogin(payload: LoginPayLoad): any {
  try {
    const response = yield call(postLogin, payload);
    localStorage.setItem('accesstoken', JSON.stringify(response.tokens));
    localStorage.setItem('user', JSON.stringify(response.user));
    yield put(loginSuccess(response.user));
  } catch (error: any) {
    yield put(loginFail(error.response.data.message));
  }
}
function* handleLogout(payload: logoutType): any {
  // console.log('logout');
  localStorage.removeItem('accesstoken');
  localStorage.removeItem('user');
  try {
    const response = yield call(postLogout, payload);
    yield put(logout(response.data.user));
  } catch (error) {}
}

function* wacthAuth(): any {
  const isLogin = Boolean(localStorage.getItem('accesstoken'));

  while (true) {
    if (!isLogin) {
      const action: PayloadAction<LoginPayLoad> = yield take(login.type);
      yield fork(handleLogin, action.payload);
    }

    const action: PayloadAction<logoutType> = yield take(logout.type);
    yield call(handleLogout, action.payload);
  }
}

export default function* authSaga() {
  yield fork(wacthAuth);
}
