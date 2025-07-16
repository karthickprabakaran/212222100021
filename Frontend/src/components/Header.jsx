import React from 'react';
import { AppBar, Toolbar, Typography, Box, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <AppBar position="static" color="primary" elevation={2}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" component="div">
            URL Shortener
          </Typography>
        </Box>

        {/* Centered Links */}
        <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexGrow: 1 }}>
          <MuiLink
            component={Link}
            to="/"
            color="inherit"
            underline="none"
            sx={{ fontWeight: 'bold' }}
          >
            Shorten URL
          </MuiLink>
          <MuiLink
            component={Link}
            to="/stats/"
            color="inherit"
            underline="none"
            sx={{ fontWeight: 'bold' }}
          >
            Stats
          </MuiLink>
        </Box>

        {/* Right-Aligned Author Name */}
        <Box sx={{ flexGrow: 1, textAlign: 'right' }}>
          <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
            Made by Karthick Prabakaran
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
