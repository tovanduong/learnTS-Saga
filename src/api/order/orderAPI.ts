import axiosClient from 'api/common/axiosClient';
import { GET_ORDER_BY_ID, GET_ORDER_LIST } from 'constant';
import { ListParams } from 'model';

export async function getOrderList(filter: ListParams) {
  const { size, page, order } = filter;
  const url = GET_ORDER_LIST;
  const response = await axiosClient.get(url + `?size=${size}&page=${page}&order=${order}`);
  return response.data.orders;
}

export async function getOrderById(id: number) {
  const url = GET_ORDER_BY_ID;
  const response = await axiosClient.get(url + id);
  return response.data;
}
