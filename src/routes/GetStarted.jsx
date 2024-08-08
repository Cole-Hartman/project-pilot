import AuthWrapper from '../components/AuthWrapper.jsx'
import Navigation from '../components/Navigation.jsx'
import { useNavigate } from 'react-router-dom'

export default function Form() {
  const navigate = useNavigate();
  return (
    <>
      <AuthWrapper>
        <Navigation />
        <h1 className='text-7xl'>GET STARTED PAGE</h1>
        <button
          onClick={() => navigate('/')}
          className="w-26 h-10 text-sm xl:text-md 2xl:w-40 2xl:h-12 shadow-lg hover:shadow-xl px-2 2xl:px-4 2xl:py-2 bg-blue-600 bg-opacity-90 text-white font-semibold 2xl:text-lg rounded-md text-opacity-90 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 mb-16 lg:mb-0"
        >
          HOME
        </button>
      </AuthWrapper >
    </>
  )
} 
