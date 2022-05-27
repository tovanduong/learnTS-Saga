import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { postUploadImage } from 'api/common';

import React, { useState } from 'react';
import './uploadFile.scss';
const Input = styled('input')({
  display: 'none',
});

const UploadFile = ({ onSubmit }: any) => {
  const [file, setFile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<any>(null);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const data = event.target.files && event.target.files[0];
    setFile(data);
  };

  const handleUploadFile = () => {
    setLoading(true);
    const formdata: FormData = new FormData();
    formdata.append('image', file, file.name);
    (async () => {
      try {
        const response = await postUploadImage(formdata);
        setImage(response.imageURL);
        setLoading(false);
      } catch (error) {}
    })();
  };
  onSubmit(image);

  return (
    <Box>
      <Stack direction="row" alignItems="center" spacing={2} mb={4}>
        <label htmlFor="contained-button-file">
          <Input
            accept="image/*"
            id="contained-button-file"
            multiple
            type="file"
            onChange={handleChange}
          />
          <Box display="flex" alignItems="center" mb={3}>
            <Button variant="contained" component="span">
              Chosses image
            </Button>
            <Typography margin="0 10px" variant="body2">
              {file && file?.name}
            </Typography>
          </Box>
        </label>
        <br />
      </Stack>
      <Box>
        <LoadingButton
          variant="contained"
          onClick={handleUploadFile}
          loading={loading}
          disabled={file ? false : true}
          color="primary"
          className={`Loading-btn ${!file && 'unSelect'}`}
        >
          Upload image
        </LoadingButton>
      </Box>
      <Box className="avatar">{image && <img src={image} alt="" />}</Box>
    </Box>
  );
};

export default UploadFile;
