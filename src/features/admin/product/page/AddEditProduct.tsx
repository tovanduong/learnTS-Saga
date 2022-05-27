import { Box, Breadcrumbs, LinearProgress, Typography } from '@mui/material';
import { getProductById, patchEditProduct, postAddProduct } from 'api';
import { Product } from 'model';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AddEditProductForm from '../component/AddEditProductForm';
import './addEditProduct.scss';

type Props = {};

const AddEditProduct = (props: Props) => {
  const [productDetail, setProductDetail] = useState<Product>();
  const navigate = useNavigate();
  const Params = useParams();
  const isEdit = Boolean(Params.id);
  useEffect(() => {
    if (Params.id) {
      (async () => {
        try {
          const response = await getProductById(Number(Params.id));
          setProductDetail(response.product);
        } catch (error) {}
      })();
    }
  }, [Params.id]);

  const initialValue: Product = {
    name: productDetail?.name || '',
    category: productDetail?.category || '',
    brand: productDetail?.brand || '',
    description: productDetail?.description || '',
    price: productDetail?.price || '',
    countInStock: productDetail?.countInStock || '',
    rating: productDetail?.rating || '',
  };

  const handleSubmitEditProductForm = (FormValue: Product) => {
    if (isEdit) {
      console.log(FormValue);
      const id = Params.id as string;
      (async () => {
        try {
          await patchEditProduct({ FormValue, id });
        } catch (error: any) {
          console.log(error.response.data.message);
        }
      })();
      navigate('/admin/product');
    } else {
      console.log('add', FormValue);
      (async () => {
        try {
          const response = await postAddProduct({ FormValue });
          console.log(response);
        } catch (error: any) {
          console.log(error.response.data.message);
        }
      })();
      navigate('/admin/product');
    }
  };
  return (
    <Box position="relative">
      {isEdit ? <LinearProgress className={`loading ${!productDetail && 'active'}`} /> : null}

      <Breadcrumbs aria-label="breadcrumb" className="breadcrumbs-Admin">
        <Link style={{ color: '#ffffff99' }} to="/admin">
          Dash Board
        </Link>
        <Link style={{ color: '#ffffff99' }} to="/admin/product">
          Product List
        </Link>
        <Typography color="#ffffff99">{isEdit ? 'Edit Product' : 'Add Product'}</Typography>
      </Breadcrumbs>
      <Typography variant="h4" margin="10px 0">
        {isEdit ? 'Edit User' : 'Add User'}
      </Typography>
      <Box>
        {(!isEdit || Boolean(productDetail)) && (
          <AddEditProductForm
            initialValueEdit={initialValue}
            onSubmitEdit={handleSubmitEditProductForm}
          />
        )}
      </Box>
    </Box>
  );
};

export default AddEditProduct;
