import React, { useState } from 'react';
import { supabase } from '../config/supabaseClient';
import { Button, TextField, Typography, Container, Box, Snackbar, Alert } from '@mui/material';
import { Link } from 'react-router-dom';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          }
        }
      });
      if (error) throw error;
      showSnackbar('Check your email for the confirmation link', 'success');
    } catch (error) {
      showSnackbar(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">Sign Up</Typography>
        <Box component="form" onSubmit={handleSignUp} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal" required fullWidth id="firstName" label="First Name"
            name="firstName" autoComplete="given-name" autoFocus
            value={firstName} onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            margin="normal" required fullWidth id="lastName" label="Last Name"
            name="lastName" autoComplete="family-name"
            value={lastName} onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            margin="normal" required fullWidth id="email" label="Email Address"
            name="email" autoComplete="email"
            value={email} onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal" required fullWidth name="password" label="Password"
            type="password" id="password" autoComplete="new-password"
            value={password} onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loading}>
            Sign Up
          </Button>
          <Link to="/signin" style={{ textDecoration: 'none' }}>
            <Button fullWidth variant="text">
              Already have an account? Sign In
            </Button>
          </Link>
        </Box>
      </Box>
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
