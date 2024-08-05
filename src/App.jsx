//import { useState } from "react";
import { motion } from "framer-motion";
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import Navbar from "./components/navbar.jsx"

function App() {

  return (
    <>
      <section className="bg-gradient-to-br from-black via-gray-900 to-blue-500 min-h-screen">
        <Navbar />
        <div className="flex flex-col justify-center items-center mt-10 text-center">
          <motion.div
            className="mx-3 my-2"
            initial={{ opacity: 0, y: [-100] }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              duration: 1.3,
              bounce: 0.3
            }}
          >
            <div className="text-5xl font-bold mb-4">YOUR DREAM PROJECT</div>
            <div className="text-5xl font-bold text-blue-500">STARTS HERE</div>
          </motion.div>
          <motion.div
            className="mx-3 my-2"
            initial={{ opacity: 0, x: [-100] }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              type: "spring",
              duration: 1.3,
              bounce: 0.3
            }}>
            <div className="text-lg px-2 mt-3">
              <div className="mb-2">Find Personalized Project Ideas to Elevate Your Skills and Portfolio.</div>
              <div>Project Pilot will tailor it's recommendations against your current</div>
              <div className="flex justify-center gap-2">
                <div className="text-blue-500">skill level,</div>
                <div>and</div>
                <div className="text-blue-500"> ambition.</div>
              </div>
            </div>
          </motion.div>
          <div className="mx-5 mt-3">
            <video
              src="https://framerusercontent.com/assets/Og1qbbFDYhzyJkDS765JkhHMgeQ.mp4"
              loop
              playsInline
              autoPlay
              muted
              style={{ cursor: 'auto', width: '100%', height: '100%', borderRadius: '20px', display: 'block', objectFit: 'cover', backgroundColor: 'rgba(0, 0, 0, 0)', objectPosition: '50% 50%' }}
            ></video>
          </div>


        </div >
      </section>
    </>
  );
}

export default App
