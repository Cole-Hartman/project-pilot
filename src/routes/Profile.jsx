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
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  useEffect(() => {
    fetchUserAndProfile();
  }, []);

  async function fetchUserAndProfile() {
    setLoading(true);
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError) {
      console.error('Error fetching user:', userError);
      setLoading(false);
      return;
    }

    if (user) {
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) {
        console.error('Error fetching profile:', profileError);
      } else {
        setUser(user);
        setProfile(profile);
      }
    }
    setLoading(false);
  }

  async function updateProfile(e) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase
      .from('profiles')
      .update(profile)
      .eq('id', user.id);

    if (error) {
      showSnackbar(error.message, 'error');
    } else {
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
  if (!user || !profile) return <Typography>No user data found</Typography>;

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ mt: 4, p: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
          <Avatar
            sx={{ width: 100, height: 100, mb: 2 }}
            src={profile.avatar_url}
          />

          <Typography variant="body1" color="textSecondary">
            {user.email}
          </Typography>
        </Box>

        <form onSubmit={updateProfile}>
          <Grid container spacing={3} className="flex items-center justify-center">
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name"
                value={profile.full_name || ''}
                onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                disabled={!editing}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Bio"
                multiline
                rows={4}
                value={profile.bio || ''}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
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
