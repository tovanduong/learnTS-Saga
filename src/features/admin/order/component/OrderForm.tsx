import { Box, Button } from '@mui/material';
import SelecField from 'component/formField/SelecField';
import { Order } from 'model';
import React from 'react';
import { useForm } from 'react-hook-form';
import './orderForm.scss';

interface OrderDetailFormProps {
  initialValue: Order;
  onSubmit: (FormValue: Order) => void;
}

const OrderDetailForm = ({ initialValue, onSubmit }: OrderDetailFormProps) => {
  const { control, handleSubmit } = useForm({
    defaultValues: initialValue,
  });

  const handleSubmitEditForm = (FormValue: any) => {
    onSubmit(FormValue);
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitEditForm)} className="order-form">
      <Box className="orderDetail-select">
        <SelecField
          name="status"
          control={control}
          label="Status"
          option={[
            { lable: 'Shipping', value: 'Shipping' },
            { lable: 'Processing', value: 'Processing' },
          ]}
        />
      </Box>

      <Box className="orderDetail-select">
        <SelecField
          name="isPaid"
          control={control}
          label="Paided"
          option={[
            { lable: 'Yes', value: 'true' },
            { lable: 'No', value: 'false' },
          ]}
        />
      </Box>
      <Box>
        <Button className="orderDetail-btn" type="submit">
          Update Order
        </Button>
      </Box>
    </form>
  );
};

export default OrderDetailForm;
