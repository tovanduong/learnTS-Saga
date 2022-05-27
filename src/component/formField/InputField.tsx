import React, { InputHTMLAttributes } from 'react';
import { Control, useController } from 'react-hook-form';

export interface inputFormFielProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  type?: string;
  placeholder?: string;
  control: Control<any>;
}

const InputField = ({ name, type, control, placeholder, ...inputprops }: inputFormFielProps) => {
  const {
    field: { value, onChange, onBlur, ref },
    // fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  return (
    <input
      name={name}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      autoComplete="off"
      ref={ref}
    />
  );
};

export default InputField;
