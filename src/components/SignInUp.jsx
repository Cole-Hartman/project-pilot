import React, { useState } from 'react';
import { supabase } from '../config/supabaseClient';
import { Button, TextField, Typography, Container, Box, Snackbar, Alert } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

export default function SignInUp() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      showSnackbar(error.message, 'error');
    } else if (data && data.user) {
      showSnackbar('Signed in successfully', 'success');
    }
    setLoading(false);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName + " ",
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

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`
        }
      });
      if (error) throw error;
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

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
    // Reset form fields when switching
    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          {isSignIn ? 'Sign In' : 'Sign Up'}
        </Typography>
        <Box component="form" onSubmit={isSignIn ? handleSignIn : handleSignUp} noValidate sx={{ mt: 1 }}>
          {!isSignIn && (
            <>
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
            </>
          )}
          <TextField
            margin="normal" required fullWidth id="email" label="Email Address"
            name="email" autoComplete="email" autoFocus={isSignIn}
            value={email} onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal" required fullWidth name="password" label="Password"
            type="password" id="password" autoComplete={isSignIn ? "current-password" : "new-password"}
            value={password} onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loading}>
            {isSignIn ? 'Sign In' : 'Sign Up'}
          </Button>
          <Button fullWidth variant="outlined" startIcon={<GoogleIcon />} onClick={handleGoogleSignIn} disabled={loading} sx={{ mb: 2 }}>
            {isSignIn ? 'Sign In with Google' : 'Sign up with Google'}
          </Button>
          <Button fullWidth variant="text" onClick={toggleForm}>
            {isSignIn ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
          </Button>
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
