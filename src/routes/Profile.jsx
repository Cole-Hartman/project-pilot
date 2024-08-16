import React, { useState, useEffect } from 'react';
import { supabase } from '../config/supabaseClient';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Grid,
  Paper,
  Snackbar,
  Alert
} from '@mui/material';

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  useEffect(() => {
    fetchUser();
  }, []);

  async function fetchUser() {
    setLoading(true);
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) {
      console.error('Error fetching user:', error);
      showSnackbar('Error fetching user data', 'error');
    } else if (user) {
      setUser(user);
      console.log("User data:", user);
    }
    setLoading(false);
  }

  async function updateUser(e) {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.auth.updateUser({
      data: {
        full_name: user.user_metadata.full_name,
        bio: user.user_metadata.bio
      }
    });

    if (error) {
      showSnackbar(error.message, 'error');
    } else {
      setUser(data.user);
      showSnackbar('Profile updated successfully', 'success');
      setEditing(false);
    }
    setLoading(false);
  }

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (!user) return <Typography>No user data found</Typography>;

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ mt: 4, p: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
          <Avatar
            sx={{ width: 100, height: 100, mb: 2 }}
            src={user.user_metadata.avatar_url}
          />
          <Typography variant="body1" color="textSecondary">
            {user.email}
          </Typography>
        </Box>

        <form onSubmit={updateUser}>
          <Grid container spacing={3} className="flex items-center justify-center">
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name"
                value={user.user_metadata.full_name || ''}
                onChange={(e) => setUser({
                  ...user,
                  user_metadata: { ...user.user_metadata, full_name: e.target.value }
                })}
                disabled={!editing}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Bio"
                multiline
                rows={4}
                value={user.user_metadata.bio || ''}
                onChange={(e) => setUser({
                  ...user,
                  user_metadata: { ...user.user_metadata, bio: e.target.value }
                })}
                disabled={!editing}
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            {editing ? (
              <>
                <Button onClick={() => setEditing(false)} sx={{ mr: 2 }}>
                  Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary" disabled={loading}>
                  Save Changes
                </Button>
              </>
            ) : (
              <Button onClick={() => setEditing(true)} variant="outlined" color="primary">
                Edit Profile
              </Button>
            )}
          </Box>
        </form>
      </Paper>

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default ProfilePage;
