import { Box, Button } from '@mui/material';
import InputFieldAdmin from 'component/formField/InputFieldAdmin';

import SelecField from 'component/formField/SelecField';
import UploadFile from 'component/formField/UploadFile';
import { UserDetail } from 'model';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import './addEdit.scss';

interface AddEditUserProps {
  initialValueEdit: UserDetail;
  onSubmitEdit: (FormValue: UserDetail) => void;
}

const AddEditUserForm = ({ initialValueEdit, onSubmitEdit }: AddEditUserProps) => {
  const Params = useParams();
  const isEdit = Boolean(Params.id);
  const [avatar, setAvatar] = useState<any>(null);
  const { control, handleSubmit } = useForm({
    defaultValues: initialValueEdit,
  });

  const handleSubmitEditForm = (FormValue: any) => {
    if (avatar) {
      FormValue.avatar = avatar;
    }
    onSubmitEdit(FormValue);
  };

  const handleGetAvatar = (avatar: string) => {
    setAvatar(avatar);
  };
  return (
    <form onSubmit={handleSubmit(handleSubmitEditForm)} className="addEdit-form">
      <Box className="addEdit-inputField">
        <InputFieldAdmin name="username" type="text" control={control} label="User name" />
        <InputFieldAdmin name="email" type="text" control={control} label="Email" />
        <InputFieldAdmin name="contact" type="text" control={control} label="Contact" />
        {!isEdit && (
          <InputFieldAdmin name="password" type="password" control={control} label="Password" />
        )}
        <SelecField
          name="role"
          control={control}
          label="Role"
          option={[
            { lable: 'Admin', value: 'admin' },
            { lable: 'User', value: 'user' },
          ]}
        />
        <Box>
          <Button type="submit" className="addEdit-btn">
            {isEdit ? 'Edit User' : 'Add User'}
          </Button>
        </Box>
      </Box>
      <Box ml={10}>
        <UploadFile onSubmit={handleGetAvatar} />
      </Box>
    </form>
  );
};

export default AddEditUserForm;
