import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

import React from 'react';

interface RateProps {
  rate: number;
}

const Rate = ({ rate }: RateProps) => {
  return (
    <Stack spacing={1}>
      <Rating name="half-rating-read" value={rate} precision={0.5} readOnly />
    </Stack>
  );
};

export default Rate;
