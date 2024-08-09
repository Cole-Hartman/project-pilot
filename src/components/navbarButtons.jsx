import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabaseClient.js';

export default function NavbarButtons() {
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
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
      <button onClick={() => navigate('/login')} className="pr-3">
        Log In
      </button>
    );
  }

  return (
    <div className='text-lg'>
      <button
        onClick={() => navigate('/profile')}
        className="pr-3"
      >
        Profile
      </button>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}
