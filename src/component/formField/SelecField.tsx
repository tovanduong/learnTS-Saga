import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import React from 'react';
import { useController } from 'react-hook-form';

interface optionSelect {
  lable: string;
  value: string;
}

interface SelecFieldProps {
  name: string;
  label?: string;
  control: any;
  option?: optionSelect[];
}

const SelecField = ({ name, label, control, option }: SelecFieldProps) => {
  const {
    field: { onChange, onBlur, value, ref },
    // fieldState: { invalid, isTouched, isDirty },
  } = useController({
    name,
    control,
  });

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label={label}
        onChange={onChange}
        onBlur={onBlur}
        variant="outlined"
      >
        {option &&
          option.map((item) => (
            <MenuItem value={item.value} key={item.value}>
              {item.lable}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

export default SelecField;
