import axiosClient from 'api/common/axiosClient';
import {
  DELETE_PRODUCT_BY_ID,
  GET_PRODUCT_BY_ID,
  GET_PRODUCT_LIST,
  GET_SEARCH_PRODUCT,
  PATCH_EDIT_PRODUCT,
  POST_CREATE_PRODUCT,
} from 'constant/product/product';
import { ListParams, Product } from 'model';

export async function getProductList(filter: ListParams) {
  const { size, page, order } = filter;
  const url = GET_PRODUCT_LIST;
  const response = await axiosClient.get(url + `?size=${size}&page=${page}&order=${order}`);
  return response.data;
}

export async function getProductById(id: number) {
  const url = GET_PRODUCT_BY_ID;

  const response = await axiosClient.get(url + id);
  return response.data;
}

export interface AddEditProduct {
  FormValue: Product;
  id?: string;
}

export async function patchEditProduct({ FormValue, id }: AddEditProduct) {
  const { name, brand, price, countInStock, category, description, rating } = FormValue;
  const url = PATCH_EDIT_PRODUCT;
  const response = await axiosClient.patch(url + id, {
    name,
    brand,
    price,
    countInStock,
    category,
    description,
    rating,
  });
  return response.data;
}

export async function postAddProduct({ FormValue }: AddEditProduct) {
  const url = POST_CREATE_PRODUCT;
  const { name, brand, price, countInStock, category, description, rating, imageUrls } = FormValue;
  const response = await axiosClient.post(url, {
    name,
    brand,
    price,
    countInStock,
    category,
    description,
    rating,
    imageUrls,
  });
  return response.data;
}

export async function deleteProductById(id: number | undefined) {
  const url = DELETE_PRODUCT_BY_ID;
  const response = await axiosClient.delete(url + id);
  return response.data;
}

export async function getSearchProduct(filter: ListParams) {
  const url = GET_SEARCH_PRODUCT;
  const { size, page, order, keyword } = filter;
  if (keyword === '') {
    const url = GET_PRODUCT_LIST;
    const response = await axiosClient.get(url + `?size=${size}&page=${page}&order=${order}`);
    return response.data;
  }
  const response = await axiosClient.get(
    url + keyword + `&size=${size}&page=${page}&order=${order}`
  );
  return response.data.products;
}
