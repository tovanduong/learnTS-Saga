import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { DataResponse, ListParams, Product } from 'model';
import { Order } from 'model/order/order';

export interface OrderState {
  filter: ListParams;
  list?: Order[];
  pagination: DataResponse<number>;
  loading: boolean;
  messageError: string;
}

export const initialState: OrderState = {
  filter: {
    page: 1,
    size: 10,
    order: 'asc',
  },
  list: [],
  pagination: {
    total: 1,
    totalPages: 1,
    currentPage: 1,
  },
  loading: false,
  messageError: '',
};
export const OrderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    getOrder: (state, action: PayloadAction<ListParams>) => {
      state.loading = true;
    },
    getOrderSuccess: (state, action: PayloadAction<DataResponse<Order>>) => {
      state.list = action.payload.result;
      state.pagination.total = action.payload.total;
      state.pagination.totalPages = action.payload.totalPages;
      state.pagination.currentPage = action.payload.currentPage;
      state.loading = false;
    },
    getOrderFail: (state, action: PayloadAction<string>) => {
      state.messageError = action.payload;
      state.loading = false;
    },

    setFilter: (state, action: PayloadAction<ListParams>) => {
      state.filter = action.payload;
    },
  },
});

export const OrderAction = OrderSlice.actions;

export const selectOrderList = (state: RootState) => state.order.list;
export const selectFilter = (state: RootState) => state.order.filter;
export const selectPagination = (state: RootState) => state.order.pagination;
export const selectLoading = (state: RootState) => state.order.loading;

export default OrderSlice.reducer;
