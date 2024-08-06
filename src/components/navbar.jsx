import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TerminalIcon from '@mui/icons-material/Terminal';

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <div
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <TerminalIcon style={{ color: '#3B82F6' }} />
          </div>
          <Typography component="div" sx={{ flexGrow: 1 }} />
          <Button color="inherit">Project Pilot</Button>
        </Toolbar>
      </AppBar>
    </Box >
  );
}
