import React, { useState, useEffect } from 'react';
import TerminalIcon from '@mui/icons-material/Terminal';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabaseClient.js';

export default function NavbarButtons() {
  const [session, setSession] = useState(null);
  const [profilePicUrl, setProfilePicUrl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user?.user_metadata?.avatar_url) {
        setProfilePicUrl(session.user.user_metadata.avatar_url);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user?.user_metadata?.avatar_url) {
        setProfilePicUrl(session.user.user_metadata.avatar_url);
      } else {
        setProfilePicUrl(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.log('Error signing out:', error.message);
    else navigate('/'); // Redirect to home page after sign out
  };

  if (!session) {
    return (
      <div className='text-md flex items-center justify-center lg:gap-3'>
        <button onClick={() => navigate('/form')} className="pr-3 text-lg">
          Log In
        </button>
        <div className='' size="large">
          <TerminalIcon onClick={() => navigate('/')} style={{ color: '#3B82F6' }} fontSize={'large'} />
        </div>
      </div>
    );
  }

  return (
    <div className='text-md flex items-center justify-center lg:gap-3'>
      <button onClick={() => navigate('/projects')} className="pr-2">
        Projects
      </button>
      <button onClick={handleSignOut} className="pr-1">Sign Out</button>
      <button onClick={() => navigate('/profile')}>
        {profilePicUrl ? (
          <img
            src={profilePicUrl}
            alt="Profile"
            className="w-10 h-10 rounded-full ml-2 my-1 object-cover"
          />
        ) : (
          <AccountCircleIcon
            style={{
              fontSize: 46,
              marginLeft: '0.2rem',
              color: '#4B5563' // This is roughly equivalent to text-gray-600 in Tailwind
            }}
          />
        )}
      </button>
    </div>
  );
}
