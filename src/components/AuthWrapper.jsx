import { useState, useEffect } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { supabase } from '../config/supabaseClient'
import CustomAuth from './CustomAuth'
import SignIn from './SignIn.jsx'

export default function AuthWrapper({ children }) {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (!session) {
    return <SignIn />
  } else {
    return children
  }
}
