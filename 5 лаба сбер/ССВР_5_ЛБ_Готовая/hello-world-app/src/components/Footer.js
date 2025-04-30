import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: 'blue', p: 2, marginTop: 'auto' }}>
      <Typography variant="body1" color="white" align="center">
        Сайт
      </Typography>
    </Box>
  );
};

export default Footer;
