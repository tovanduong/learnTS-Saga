import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  Button,
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
import { deleteProductById } from 'api';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import PopupDelete from 'component/common/PopupDelete';
import Rate from 'component/common/Rate';
import Search from 'component/common/Search';
import SortForm from 'component/common/SortForm';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ProductAction,
  ProductFilter,
  ProductLists,
  ProductLoading,
  ProductPagination,
} from '../ProductSlice';
import './productList.scss';

const ProductList = () => {
  const [open, setOpen] = useState(false);
  const [searchData, setSearchData] = useState<string>('');
  const [productId, setProductId] = useState<number | undefined>(undefined);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const ListProduct = useAppSelector(ProductLists);
  const PaginationProduct = useAppSelector(ProductPagination);
  const Loading = useAppSelector(ProductLoading);
  const Filter = useAppSelector(ProductFilter);

  useEffect(() => {
    if (searchData !== '') {
      dispatch(ProductAction.getProductSearch({ ...Filter, keyword: searchData }));
      return;
    }
    dispatch(ProductAction.getProduct(Filter));
  }, [Filter]);

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(ProductAction.setFilter({ ...Filter, page: value }));
  };

  const handleSubmit = (value: string) => {
    setSearchData(value);
    dispatch(ProductAction.getProductSearch({ ...Filter, page: 1, keyword: value }));
  };

  const handleNavigateEditProduct = (id: number | undefined) => {
    navigate(`/admin/product/${id}`);
  };

  const handleNavigateAddProduct = () => {
    navigate('/admin/product/add');
  };

  const handleSubmitSort = (order: 'asc' | 'desc') => {
    dispatch(ProductAction.setFilter({ ...Filter, order: order }));
  };

  const handleOpenPopupDelete = (id: number | undefined) => {
    setOpen(true);
    setProductId(id);
  };
  const handleClose = () => setOpen(false);

  const handleDelete = async (productIdDelete: number | undefined) => {
    try {
      await deleteProductById(productIdDelete);
      dispatch(ProductAction.setFilter({ ...Filter }));
      setOpen(false);
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <div className="DashBoard-wrap">
      <LinearProgress className={`loading ${Loading && 'active'}`} />
      <h2>Product List</h2>
      <Grid container display="flex" alignItems="baseline">
        <Grid item md={6}>
          <Search onSubmit={handleSubmit} />
        </Grid>
        <Grid item md={3}>
          <Button className="Add-Product-btn" onClick={handleNavigateAddProduct}>
            Add Product
          </Button>
        </Grid>
        <Grid item md={2} display="flex" alignItems="center">
          <Typography variant="h6" color="#FFF" mr={2}>
            Order:
          </Typography>
          <Box flex={1}>
            <SortForm onSubmitSort={handleSubmitSort} />
          </Box>
        </Grid>
      </Grid>
      <div style={{ flex: 1, width: '100%', padding: '15px 0' }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table" className="tb-container">
            <TableHead className="tb-head">
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Rate</TableCell>
                <TableCell>Edit / Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="tb-body">
              {ListProduct &&
                ListProduct.map((row: any) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.brand}</TableCell>
                    <TableCell>{row.category}</TableCell>
                    <TableCell>{row.countInStock} item</TableCell>
                    <TableCell>{row.price}</TableCell>
                    <TableCell>
                      <Rate rate={Number(row.rating)} />
                    </TableCell>
                    <TableCell>
                      <EditIcon
                        sx={{ marginRight: '10px', cursor: 'pointer' }}
                        onClick={() => handleNavigateEditProduct(row.id)}
                      />
                      <DeleteIcon
                        sx={{ cursor: 'pointer' }}
                        onClick={() => handleOpenPopupDelete(row.id)}
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
      <PopupDelete
        openProps={open}
        handleClose={handleClose}
        id={productId}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default ProductList;
