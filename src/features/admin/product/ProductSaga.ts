import { PayloadAction } from '@reduxjs/toolkit';
import { getProductList, getSearchProduct } from 'api';
import { DataResponse, ListParams, Product } from 'model';
import { call, debounce, put, takeLatest } from 'redux-saga/effects';
import { ProductAction } from './ProductSlice';

function* fetchProduct(action: PayloadAction<ListParams>) {
  try {
    const response: DataResponse<Product> = yield call(getProductList, action.payload);

    yield put(ProductAction.getProductSuccess(response));
  } catch (error) {
    console.log('error: ', error);
    yield put(ProductAction.getProductFail);
  }
}

function* fetchSearchDebounce(action: PayloadAction<ListParams>) {
  try {
    const response: DataResponse<Product> = yield call(getSearchProduct, action.payload);
    yield put(ProductAction.getProductSuccess(response));
  } catch (error: any) {
    yield put(ProductAction.getProductFail(error.response.data.message));
  }
}

export function* ProductSaga() {
  yield takeLatest(ProductAction.getProduct, fetchProduct);

  yield debounce(500, ProductAction.getProductSearch, fetchSearchDebounce);
}
