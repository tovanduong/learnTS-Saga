import {
  DELETE_USER_BY_ID,
  GET_ALL_USER,
  GET_USER_BY_ID,
  PATCH_EDIT_USER,
  POST_ADD_USER,
} from 'constant';
import { UserDetail } from 'model';
import { ListParams } from 'model/common';
import axiosClient from '../common/axiosClient';

export async function getAllUser({ size, page, role, order }: ListParams) {
  const url = GET_ALL_USER;

  const response = await axiosClient.get(
    role
      ? `${url}?size=${size}&page=${page}&order=${order}&role=${role}`
      : `${url}?size=${size}&order=${order}&page=${page}`
  );
  return response.data;
}

export async function getUserById(id: number) {
  const url = GET_USER_BY_ID;
  try {
    const response = await axiosClient.get(url + id);
    return response.data;
  } catch (error) {}
}

export interface AddEditUser {
  FormValue: UserDetail;
  id?: string;
}

export async function patchEditUser({ FormValue, id }: AddEditUser) {
  const { avatar, contact, email, role, username } = FormValue;
  const url = PATCH_EDIT_USER;
  const response = await axiosClient.patch(url + id, { avatar, contact, email, role, username });
  return response.data;
}

export async function postAddUser({ FormValue }: AddEditUser) {
  const url = POST_ADD_USER;
  const { username, email, password, contact, avatar, role } = FormValue;
  const response = await axiosClient.post(url, {
    username,
    email,
    password,
    contact,
    avatar,
    role,
  });
  return response.data;
}

export async function deleteUserById(id: number | undefined) {
  const url = DELETE_USER_BY_ID;
  const response = await axiosClient.delete(url + id);
  return response.data;
}
