import AuthWrapper from '../components/AuthWrapper.jsx'
import Navigation from '../components/Navigation.jsx'
import { Link } from 'react-router-dom'

export default function Form() {
  return (
    <>
      <AuthWrapper>
        <Navigation />
        <h1 className='text-7xl'>GET STARTED PAGE</h1>
        <button><Link to={'/'}>Back To Home</Link ></button>
      </AuthWrapper >
    </>
  )
} 
