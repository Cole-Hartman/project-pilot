import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/navbar.jsx';
import AuthWrapper from '../components/AuthWrapper.jsx'
import Completion from '../components/Completion.jsx'

export default function Form() {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("Wait for instruction")

  return (
    <>
      <AuthWrapper>
        <section className="bg-gradient-to-br from-black via-gray-900 to-blue-500 min-h-screen overflow-x-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ amount: "all" }}
          >
            <Navbar />
          </motion.div>
          <div className='flex flex-col justify-center items-center mt-10'>
            <h1 className='text-7xl'>GET STARTED PAGE</h1>
            <button
              onClick={() => navigate('/')}
              className="mt-5 w-26 h-10 text-sm xl:text-md 2xl:w-40 2xl:h-12 shadow-lg hover:shadow-xl px-2 2xl:px-4 2xl:py-2 bg-blue-600 bg-opacity-90 text-white font-semibold 2xl:text-lg rounded-md text-opacity-90 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 mb-16 lg:mb-0"
            >
              HOME
            </button>
            <button className='mt-20 text-xl border p-5 rounded-xl bg-black' onClick={() => { setPrompt("How to center a div"), console.log("fetching response") }}>
              How to center a div
            </button>
            <button className='mt-2 text-xl border p-5 rounded-xl bg-black' onClick={() => { setPrompt("How to drive a car"), console.log("fetching response") }}>
              How to drive a car
            </button>
            <Completion prompt={prompt} />
          </div>
        </section>
      </AuthWrapper >
    </>
  )
} 
