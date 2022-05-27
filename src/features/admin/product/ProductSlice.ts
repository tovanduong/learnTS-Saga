import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { DataResponse, ListParams, Product } from 'model';

export interface ProductState {
  filter: ListParams;
  list?: Product[];
  pagination: DataResponse<number>;
  loading: boolean;
  messageError: string;
}

export const initialState: ProductState = {
  filter: {
    page: 1,
    size: 10,
    order: 'asc',
    keyword: '',
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
export const ProductSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    getProduct: (state, action: PayloadAction<ListParams>) => {
      state.loading = true;
    },
    getProductSuccess: (state, action: PayloadAction<DataResponse<Product>>) => {
      state.list = action.payload.result;
      state.pagination.total = action.payload.total;
      state.pagination.totalPages = action.payload.totalPages;
      state.pagination.currentPage = action.payload.currentPage;
      state.loading = false;
    },
    getProductFail: (state, action: PayloadAction<string>) => {
      state.messageError = action.payload;
      state.loading = false;
    },

    setFilter: (state, action: PayloadAction<ListParams>) => {
      state.filter = action.payload;
    },

    getProductSearch: (state, action: PayloadAction<ListParams>) => {
      state.loading = true;
    },
  },
});

export const ProductAction = ProductSlice.actions;

export const ProductLists = (state: RootState) => state.product.list;
export const ProductFilter = (state: RootState) => state.product.filter;
export const ProductPagination = (state: RootState) => state.product.pagination;
export const ProductLoading = (state: RootState) => state.product.loading;

export default ProductSlice.reducer;
