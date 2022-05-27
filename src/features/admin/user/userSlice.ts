import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { UserDetail } from 'model';
import { DataResponse, ListParams, ListResponse } from 'model/common';

export interface UserState {
  loading: Boolean;
  list?: UserDetail[];
  filter: ListParams;
  pagination: DataResponse<Number>;
}

const initialState: UserState = {
  loading: false,
  list: undefined,
  filter: {
    page: 1,
    size: 10,
    order: 'asc',
  },
  pagination: {
    total: 1,
    totalPages: 1,
    currentPage: 1,
  },
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUserList: (state, action: PayloadAction<ListParams>) => {
      state.loading = true;
    },
    fetchUserListSuccess: (state, action: PayloadAction<DataResponse<UserDetail>>) => {
      state.loading = false;
      state.list = action.payload.result;
      state.pagination.currentPage = action.payload.currentPage;
      state.pagination.total = action.payload.total;
      state.pagination.totalPages = action.payload.totalPages;
    },
    fetchUserListFail: (state) => {
      state.loading = false;
    },
    setfilter: (state, action: PayloadAction<ListParams>) => {
      state.filter = action.payload;
    },
  },
});

export const userAction = UserSlice.actions;

export const selectUserList = (state: RootState) => state.user.list;
export const selectUserFilter = (state: RootState) => state.user.filter;
export const selectUserLoading = (state: RootState) => state.user.loading;
export const selectUserPagination = (state: RootState) => state.user.pagination;

export default UserSlice.reducer;
