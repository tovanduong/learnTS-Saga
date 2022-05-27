import { Box, Button } from '@mui/material';
import InputFieldAdmin from 'component/formField/InputFieldAdmin';
import SelecField from 'component/formField/SelecField';
import UploadFile from 'component/formField/UploadFile';
import { Product } from 'model';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import './addEditProductForm.scss';

interface AddEditUserProps {
  initialValueEdit: Product;
  onSubmitEdit: (FormValue: Product) => void;
}

const AddEditProductForm = ({ initialValueEdit, onSubmitEdit }: AddEditUserProps) => {
  const [image, setImage] = useState<any>(null);

  const Params = useParams();
  const isEdit = Boolean(Params.id);
  const { control, handleSubmit } = useForm({
    defaultValues: initialValueEdit,
  });

  const handleSubmitEditForm = (FormValue: any) => {
    if (image) {
      FormValue.imageUrls = [image];
    }
    onSubmitEdit(FormValue);
  };

  const handleGetAvatar = (imgProduct: string) => {
    setImage(imgProduct);
  };
  console.log(image);
  return (
    <form onSubmit={handleSubmit(handleSubmitEditForm)} className="addEdit-form">
      <Box className="addEdit-inputField">
        <InputFieldAdmin name="name" type="text" control={control} label="Name" />
        <InputFieldAdmin name="brand" type="text" control={control} label="Brand" />
        <InputFieldAdmin name="category" type="text" control={control} label="Category" />
        <InputFieldAdmin name="description" type="text" control={control} label="Description" />
        <InputFieldAdmin name="price" type="text" control={control} label="Price" />
        <InputFieldAdmin name="countInStock" type="text" control={control} label="Stock quantity" />

        <Box>
          <Button type="submit" className="addEdit-btn">
            {isEdit ? 'Edit User' : 'Add User'}
          </Button>
        </Box>
      </Box>

      <Box ml={10} width="100%">
        {!isEdit && (
          <Box>
            <UploadFile onSubmit={handleGetAvatar} />
          </Box>
        )}
        <Box width="40%">
          <SelecField
            name="rating"
            control={control}
            label="Rating"
            option={[
              { lable: '1', value: '1' },
              { lable: '2', value: '2' },
              { lable: '3', value: '3' },
              { lable: '4', value: '4' },
              { lable: '5', value: '5' },
            ]}
          />
        </Box>
      </Box>
    </form>
  );
};

export default AddEditProductForm;
