import { Box, Breadcrumbs, LinearProgress, Typography } from '@mui/material';
import { getUserById, patchEditUser, postAddUser } from 'api';
import { UserDetail } from 'model';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AddEditUserForm from '../component/EditUserForm';
import './addEditUser.scss';

type Props = {};

const AddEditUser = (props: Props) => {
  const [userDetail, setUserDetail] = useState<UserDetail>();
  const navigate = useNavigate();
  const Params = useParams();
  const isEdit = Boolean(Params.id);
  useEffect(() => {
    if (Params.id) {
      const fetchUserDetail = async () => {
        try {
          const response = await getUserById(Number(Params.id));
          setUserDetail(response);
        } catch (error) {}
      };
      fetchUserDetail();
    }
  }, [Params.id]);

  const initialValue: UserDetail = {
    username: userDetail?.username || '',
    email: userDetail?.email || '',
    role: userDetail?.role || '',
    contact: userDetail?.contact || '',
    password: userDetail?.password || '',
  };

  const handleSubmitEditUserForm = (FormValue: UserDetail) => {
    if (isEdit) {
      if (FormValue.email === initialValue.email) {
        delete FormValue.email;
      }
      if (FormValue.contact === initialValue.contact) {
        delete FormValue.contact;
      }
      console.log(FormValue);
      const id = Params.id as string;
      (async () => {
        try {
          await patchEditUser({ FormValue, id });
        } catch (error: any) {
          console.log(error.response.data.message);
        }
      })();
      navigate('/admin/user');
    } else {
      (async () => {
        try {
          const response = await postAddUser({ FormValue });
          console.log(response);
        } catch (error: any) {
          console.log(error.response.data.message);
        }
      })();
      navigate('/admin/user');
    }
  };
  return (
    <Box position="relative">
      {isEdit ? <LinearProgress className={`loading ${!userDetail && 'active'}`} /> : null}

      <Breadcrumbs aria-label="breadcrumb" className="breadcrumbs-Admin">
        <Link style={{ color: '#ffffff99' }} to="/admin">
          Dash Board
        </Link>
        <Link style={{ color: '#ffffff99' }} to="/admin/user">
          User List
        </Link>
        <Typography color="#ffffff99">{isEdit ? 'Edit User' : 'Add User'}</Typography>
      </Breadcrumbs>
      <Typography variant="h4" margin="10px 0">
        {isEdit ? 'Edit User' : 'Add User'}
      </Typography>
      <Box>
        {(!isEdit || Boolean(userDetail)) && (
          <AddEditUserForm
            initialValueEdit={initialValue}
            onSubmitEdit={handleSubmitEditUserForm}
          />
        )}
      </Box>
    </Box>
  );
};

export default AddEditUser;
