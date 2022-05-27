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

import { useAppDispatch, useAppSelector } from 'app/hooks';
import PopupDelete from 'component/common/PopupDelete';
import Search from 'component/common/Search';
import SortForm from 'component/common/SortForm';
import dateFormat from 'dateformat';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './userList.scss';
import {
  selectUserFilter,
  selectUserList,
  selectUserLoading,
  selectUserPagination,
  userAction,
} from '../userSlice';
import { deleteUserById } from 'api';

const UserList = () => {
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState<number | undefined>(undefined);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userList = useAppSelector(selectUserList);
  const userPagination = useAppSelector(selectUserPagination);
  const userLoading = useAppSelector(selectUserLoading);
  const filter = useAppSelector(selectUserFilter);

  useEffect(() => {
    dispatch(userAction.fetchUserList(filter));
  }, [filter]);

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(userAction.setfilter({ ...filter, page: value }));
  };

  const handleSubmit = (value: string) => {
    console.log(value);
  };

  const handleNavigateEditUser = (id: number | undefined) => {
    navigate(`/admin/user/${id}`);
  };

  const handleNavigateAddUser = () => {
    navigate('/admin/user/add');
  };

  const handleSubmitSort = (order: 'asc' | 'desc') => {
    dispatch(userAction.setfilter({ ...filter, order: order }));
  };

  const handleOpenPopupDelete = (id: number | undefined) => {
    setOpen(true);
    setUserId(id);
  };
  const handleClose = () => setOpen(false);

  const handleDelete = async (userIdDelete: number | undefined) => {
    try {
      await deleteUserById(userIdDelete);
      dispatch(userAction.setfilter({ ...filter }));
      setOpen(false);
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <div className="DashBoard-wrap">
      <LinearProgress className={`loading ${userLoading && 'active'}`} />
      <h2>User List</h2>
      <Grid container display="flex" alignItems="baseline">
        <Grid item md={6}>
          <Search onSubmit={handleSubmit} />
        </Grid>
        <Grid item md={3}>
          <Button className="Add-User-btn" onClick={handleNavigateAddUser}>
            Add User
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
                <TableCell>User Name</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Create At</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Edit / Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="tb-body">
              {userList &&
                userList.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.username}</TableCell>
                    <TableCell>{row.role}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{dateFormat(row.createdAt, 'mm/dd/yyyy')}</TableCell>
                    <TableCell>{row.contact}</TableCell>
                    <TableCell>
                      <EditIcon
                        sx={{ marginRight: '10px', cursor: 'pointer' }}
                        onClick={() => handleNavigateEditUser(row.id)}
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
          count={userPagination.totalPages}
          onChange={handleChangePage}
          page={userPagination.currentPage}
          variant="outlined"
          color="standard"
          className="DashBoard-Pagination"
        />
      </div>
      <PopupDelete
        openProps={open}
        handleClose={handleClose}
        id={userId}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default UserList;
