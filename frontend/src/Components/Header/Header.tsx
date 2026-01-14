import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

function Header() {
  return (
    <AppBar position="static" color="primary">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography variant="h6" component="div">
            Interesno.info
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
