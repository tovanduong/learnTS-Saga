import { PayloadAction } from '@reduxjs/toolkit';
import { getOrderList } from 'api';
import { DataResponse, ListParams, Product } from 'model';
import { call, put, takeLatest } from 'redux-saga/effects';
import { OrderAction } from './OrderSlice';

function* fetchOrder(action: PayloadAction<ListParams>) {
  try {
    const response: DataResponse<Product> = yield call(getOrderList, action.payload);
    yield put(OrderAction.getOrderSuccess(response));
  } catch (error) {
    console.log('error: ', error);
    yield put(OrderAction.getOrderFail);
  }
}

export function* OrderSaga() {
  yield takeLatest(OrderAction.getOrder, fetchOrder);
}
