import { Typography } from '@mui/material';
import React from 'react';
import './Loading.scss';
const Loading = () => {
  return (
    <div>
      <div className="loader"></div>
      <Typography variant="h2" color="#FFF" position="absolute" top="65%" left="42%">
        Loading . . .
      </Typography>
    </div>
  );
};

export default Loading;
