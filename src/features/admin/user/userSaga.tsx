import { PayloadAction } from '@reduxjs/toolkit';
import { getAllUser } from 'api';
import { UserDetail } from 'model';
import { DataResponse, ListParams, ListResponse } from 'model/common';
import { call, put, takeLatest } from 'redux-saga/effects';
import { userAction } from './userSlice';

function* fetchUser(action: PayloadAction<ListParams>) {
  try {
    const response: DataResponse<UserDetail> = yield call(getAllUser, action.payload);
    yield put(userAction.fetchUserListSuccess(response));
  } catch (error) {
    console.log('error: ', error);
    yield put(userAction.fetchUserListFail);
  }
}

export function* UserSaga() {
  yield takeLatest(userAction.fetchUserList, fetchUser);
}
