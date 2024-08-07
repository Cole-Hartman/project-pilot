import { supabase } from '../config/supabaseClient.js'
import { Link } from 'react-router-dom'

export default function Navigation() {
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) console.log('Error signing out:', error.message)
  }

  return (
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <button><Link to={'profile'}>Profile</Link></button>
        <li><button onClick={handleSignOut}>Sign Out</button></li>
      </ul>
    </nav>
  )
}
