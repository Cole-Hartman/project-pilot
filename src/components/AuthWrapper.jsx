import { useState, useEffect } from 'react'
import { supabase } from '../config/supabaseClient'
import SignInUp from './SignInUp.jsx'

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
    return <SignInUp />
  } else {
    return children
  }
}
