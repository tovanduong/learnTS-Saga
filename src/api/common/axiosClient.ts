import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { POST_REFRESH_TOKEN } from 'constant';

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'content-type': 'application/json',
  },
});

const refreshToken = async (data: any) => {
  const result = await axios.post(process.env.REACT_APP_API_URL + POST_REFRESH_TOKEN, data);
  return result.data;
};

axiosClient.interceptors.request.use(async function (req: AxiosRequestConfig) {
  // Do something before request is sent
  const AccessToken = JSON.parse(localStorage.getItem('accesstoken') || '{}');
  if (AccessToken && Object.keys(AccessToken).length !== 0) {
    const token = AccessToken.access.token;
    const tokenExpries = AccessToken.access.expires;
    const expires = Number(new Date(tokenExpries));
    const current = Number(new Date());
    const refreshtoken = AccessToken.refresh.token;
    if (expires && expires <= current) {
      const data: any = {
        refreshToken: refreshtoken,
        deviceId: 'deviceId',
      };
      const result = await refreshToken(data);
      console.log(result.data);
      localStorage.setItem('accesstoken', JSON.stringify(result.data));

      req.headers = {
        ...req.headers,
        Authorization: `Bearer ${result.data.access.token}`,
      };
      return req;
    }
    req.headers = {
      ...req.headers,
      Authorization: `Bearer ${token}`,
    };
    return req;
  }

  return req;
});

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosClient;
