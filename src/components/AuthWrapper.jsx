import { useState, useEffect } from 'react'
import { supabase } from '../config/supabaseClient'
import SignInUp from './SignInUp.jsx'

export default function AuthWrapper({ children }) {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setSession(session)
      setLoading(false)
    }

    checkSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    // You can replace this with a loading spinner or any placeholder content
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (!session) {
    return <SignInUp />
  } else {
    return children
  }
}
