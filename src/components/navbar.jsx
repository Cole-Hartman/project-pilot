import * as React from 'react';
import { useNavigate } from 'react-router-dom'
import NavbarButtons from './navbarButtons.jsx'

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div className='mb-10 mt-2'>
      <div className='flex flex-row gap-12 md:gap-40 xl:gap-72 justify-center items-center'>
        <button className='font-bold mx-0.5' onClick={() => navigate('/')}>PROJECT PILOT</button>
        <NavbarButtons />
      </div>
    </div >
  );
}
