import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Header = () => {
  return (
    <AppBar 
      position="static"
      sx={{ backgroundColor: '#4CAF50' }} // Ярко-зелёный (можно использовать hex, rgb или название)
    >
      <Toolbar>
        <Typography variant="h6">Hello World App</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;