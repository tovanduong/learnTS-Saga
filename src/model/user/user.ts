import { accesstoken } from 'model/common';

export interface User {
  email: string;
  deviceId: string;
  password: string | number;
}

export interface InfoUser {
  user: any;
  tokens: accesstoken;
  deviceId: string;
}

export interface UserDetail {
  id?: number;
  username?: string;
  email?: string;
  password?: string;
  contact?: string;
  avatar?: string;
  role?: string;
  isEmailVerified?: Boolean;
  isContactVerified?: Boolean;
  isActive?: Boolean;
  createdAt?: string;
  updatedAt?: string;
}
