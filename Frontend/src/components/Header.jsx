import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="static" color="primary" elevation={2}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" component="div">
            URL Shortener
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
          Made by Karthick
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
