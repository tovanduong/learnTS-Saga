import {
  Box,
  Breadcrumbs,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { getOrderById } from 'api';
import { itemsCheckout, Order, OrderResponse } from 'model';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import OrderDetailForm from '../component/OrderForm';
import dateFormat from 'dateformat';

import user from '../../../../image/user.png';
import truck from '../../../../image/truck.png';
import mapIn from '../../../../image/map-pin.png';
import './OrderDetail.scss';
type Props = {};

const OrderDetail = (props: Props) => {
  const [orderDetail, setOrderDetail] = useState<Order>();
  const [orderItems, setOrderItems] = useState<itemsCheckout[]>();
  const params = useParams();

  useEffect(() => {
    (async function () {
      try {
        const response: OrderResponse<itemsCheckout> = await getOrderById(Number(params.id));
        console.log(response);
        setOrderDetail(response.order);
        setOrderItems(response.items);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleSubmitOrderDetail = (FormValue: Order) => {
    console.log(FormValue);
  };

  const initialValue: Order = {
    status: orderDetail?.status,
    isPaid: orderDetail?.isPaid,
  };

  return (
    <Box display="flex" flexDirection="column" minHeight="100%">
      <Breadcrumbs aria-label="breadcrumb" className="breadcrumbs-Admin">
        <Link style={{ color: '#ffffff99' }} to="/admin">
          Dash Board
        </Link>
        <Link style={{ color: '#ffffff99' }} to="/admin/order">
          Order List
        </Link>
        <Typography color="#ffffff99">Order Detail #{params.id}</Typography>
      </Breadcrumbs>
      <Typography variant="h4" margin="10px 0">
        Order Detail #{params.id}
      </Typography>

      <Typography variant="body1" margin="10px 0" color="#ffffff99">
        Order Id: {params.id}
      </Typography>

      <Box className="orderDetail-container">
        <Box display="flex" justifyContent="space-between" width="100%" mb="25px">
          <Box>
            <Typography variant="body1" color="#FFF" display="flex" mb="15px">
              <CalendarTodayOutlinedIcon sx={{ marginRight: '10px' }} />
              Create At: {dateFormat(orderDetail?.createAt, 'mm/dd/yyyy')}
            </Typography>
            <Typography variant="body1" display="flex">
              <CalendarTodayOutlinedIcon sx={{ marginRight: '10px' }} />
              Update At: {dateFormat(orderDetail?.updateAt, 'mm/dd/yyyy')}
            </Typography>
          </Box>
          <Box>
            {orderDetail && (
              <OrderDetailForm initialValue={initialValue} onSubmit={handleSubmitOrderDetail} />
            )}
          </Box>
        </Box>
        <hr />
        <Box className="orderDetail-Container--card">
          <Box className="orderDetail-card">
            <Box className="orderDetail--icon">
              <img src={user} alt="" />
            </Box>
            <Box className="orderDetail--group">
              <Typography className="orderDetail--title">Customer</Typography>
              <Typography className="orderDetail--item">Name: Lady Gaga</Typography>
              <Typography className="orderDetail--item">Email: ladygaga@gmail.com</Typography>
              <Typography className="orderDetail--item">Phone: 0981717272</Typography>
            </Box>
          </Box>
          <Box className="orderDetail-card">
            <Box className="orderDetail--icon">
              <img src={truck} alt="" />
            </Box>
            <Box className="orderDetail--group">
              <Typography className="orderDetail--title">Order Info</Typography>
              <Typography className="orderDetail--item">Status: {orderDetail?.status}</Typography>
              <Typography className="orderDetail--item">
                Pay Method: {orderDetail?.paymentMethod}
              </Typography>
              <Typography className="orderDetail--item">
                Paided: {orderDetail?.isPaid ? 'yes' : 'no'}
              </Typography>
            </Box>
          </Box>
          <Box className="orderDetail-card">
            <Box className="orderDetail--icon">
              <img src={mapIn} alt="" />
            </Box>
            <Box className="orderDetail--group">
              <Typography className="orderDetail--title">Deliver to</Typography>
              <Typography className="orderDetail--item">Address: {orderDetail?.address}</Typography>
              <Typography className="orderDetail--item">Contact: {orderDetail?.contact}</Typography>
              <Typography className="orderDetail--item">Shipper: GHTK</Typography>
            </Box>
          </Box>
        </Box>
        <Box>
          <Box className="tb-head-items">
            <Typography variant="h3">Items</Typography>
          </Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table" className="tb-container">
              <TableHead className="tb-head">
                <TableRow>
                  <TableCell className="items-title">Product</TableCell>
                  <TableCell className="items-title">Price</TableCell>
                  <TableCell className="items-title">Quantity</TableCell>
                  <TableCell className="items-title">Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="tb-body">
                {orderItems &&
                  orderItems.map((row: itemsCheckout) => (
                    <TableRow key={row.id}>
                      <TableCell>
                        <Box display="flex">
                          <Box className="items-image">
                            <img src={row.itemInfo.images[0].url} alt="" />
                          </Box>
                          <Box className="items-group">
                            <Typography variant="h5" className="items-name">
                              {row.itemInfo.name}
                            </Typography>
                            <Typography variant="body1" className="items-id">
                              {row.itemInfo.id}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell className="items-item">{row.price}</TableCell>
                      <TableCell className="items-item">{row.quantity}</TableCell>
                      <TableCell className="items-item">{row.total}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default OrderDetail;
