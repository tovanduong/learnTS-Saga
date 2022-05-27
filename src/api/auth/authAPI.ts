import { logoutType } from 'component/AppBar';
import { POST_LOGIN, POST_LOGOUT } from 'constant/user/user';
import { User } from 'model';
import axiosClient from '../common/axiosClient';

export async function postLogin({ email, password, deviceId }: User) {
  const url = POST_LOGIN;
  const response = await axiosClient.post(url, {
    email,
    password,
    deviceId,
  });
  return response.data;
}

export async function postLogout({ refreshToken, deviceId }: logoutType) {
  const url = POST_LOGOUT;
  try {
    const response = await axiosClient.post(url, {
      refreshToken,
      deviceId,
    });
    return response.data;
  } catch (error) {}
}
