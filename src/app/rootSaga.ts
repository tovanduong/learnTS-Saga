import { OrderSaga } from 'features/admin/order/OrderSaga';
import { ProductSaga } from 'features/admin/product/ProductSaga';
import { UserSaga } from 'features/admin/user/userSaga';
import { all } from 'redux-saga/effects';
import authSaga from '../features/auth/authSaga';

export default function* rootSaga() {
  yield all([authSaga(), UserSaga(), ProductSaga(), OrderSaga()]);
}
