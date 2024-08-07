import { supabase } from '../config/supabaseClient.js'
import { Link } from 'react-router-dom'

export default function Navigation() {
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) console.log('Error signing out:', error.message)
  }

  return (
    <nav>
      <button><Link to={'/profile'}>Profile</Link></button>
      <div></div>
      <button onClick={handleSignOut}>Sign Out</button>
    </nav>
  )
}
