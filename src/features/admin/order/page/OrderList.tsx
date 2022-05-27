import ViewComfyAltSharpIcon from '@mui/icons-material/ViewComfyAltSharp';
import {
  Box,
  Grid,
  LinearProgress,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import Search from 'component/common/Search';
import SortForm from 'component/common/SortForm';
import dateFormat from 'dateformat';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  OrderAction,
  selectFilter,
  selectLoading,
  selectOrderList,
  selectPagination,
} from '../OrderSlice';
import './orderList.scss';

const OrderList = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const ListProduct = useAppSelector(selectOrderList);
  const PaginationProduct = useAppSelector(selectPagination);
  const Loading = useAppSelector(selectLoading);
  const Filter = useAppSelector(selectFilter);

  useEffect(() => {
    dispatch(OrderAction.getOrder(Filter));
  }, [Filter]);

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(OrderAction.setFilter({ ...Filter, page: value }));
  };

  const handleSubmit = (value: string) => {};

  const handleNavigateOrderDetail = (id: number | undefined) => {
    navigate(`/admin/order/${id}`);
  };

  const handleSubmitSort = (order: 'asc' | 'desc') => {
    dispatch(OrderAction.setFilter({ ...Filter, order: order }));
  };

  return (
    <div className="DashBoard-wrap">
      <LinearProgress className={`loading ${Loading && 'active'}`} />
      <h2>Order List</h2>
      <Box display="flex" alignItems="baseline" justifyContent="space-between">
        <Box>
          <Search onSubmit={handleSubmit} />
        </Box>
        <Box display="flex" alignItems="center" minWidth="250px">
          <Typography variant="h6" color="#FFF" mr={2}>
            Order:
          </Typography>
          <Box flex={1}>
            <SortForm onSubmitSort={handleSubmitSort} />
          </Box>
        </Box>
      </Box>
      <div style={{ flex: 1, width: '100%', padding: '15px 0' }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table" className="tb-container">
            <TableHead className="tb-head">
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>UserId</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Paided</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>View Detail</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="tb-body">
              {ListProduct &&
                ListProduct.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.userId}</TableCell>
                    <TableCell>{row.totalPrice}</TableCell>
                    <TableCell>{row.address}</TableCell>
                    <TableCell>{row.contact}</TableCell>
                    <TableCell>{dateFormat(row.createAt, 'mm/dd/yyyy')}</TableCell>
                    <TableCell>{row.isPaid ? 'yes' : 'no'}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell>
                      <ViewComfyAltSharpIcon
                        sx={{ marginRight: '10px', cursor: 'pointer' }}
                        onClick={() => handleNavigateOrderDetail(row.id)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination
          count={PaginationProduct.totalPages}
          onChange={handleChangePage}
          page={PaginationProduct.currentPage}
          variant="outlined"
          color="standard"
          className="DashBoard-Pagination"
        />
      </div>
    </div>
  );
};

export default OrderList;
