import { TextField } from '@mui/material';
import React, { InputHTMLAttributes } from 'react';
import { Control, useController } from 'react-hook-form';

export interface inputFormFielProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  type?: string;
  placeholder?: string;
  label?: string;
  control: Control<any>;
}

const InputFieldAdmin = ({
  name,
  type,
  control,
  placeholder,
  label,
  ...inputprops
}: inputFormFielProps) => {
  const {
    field: { value, onChange, onBlur, ref },
    // fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  return (
    <TextField
      name={name}
      placeholder={placeholder}
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      autoComplete="off"
      ref={ref}
      variant="outlined"
    />
  );
};

export default InputFieldAdmin;
