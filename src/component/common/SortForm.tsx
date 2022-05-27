import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React, { useEffect, useState } from 'react';
import './sortForm.scss';

interface SortProps {
  onSubmitSort: (value: 'asc' | 'desc') => void;
}

const SortForm = ({ onSubmitSort }: SortProps) => {
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const handleChange = (e: SelectChangeEvent) => {
    setOrder(e.target.value as 'asc' | 'desc');
  };
  useEffect(() => {
    onSubmitSort(order);
  }, [order]);
  return (
    <div>
      <FormControl fullWidth variant="standard" className="order-container">
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={order}
          label="Order"
          onChange={handleChange}
          className="order-select"
        >
          <MenuItem value="asc">ASC</MenuItem>
          <MenuItem value="desc">DESC</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default SortForm;
