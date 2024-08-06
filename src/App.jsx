//import { useState } from "react";
import { motion } from "framer-motion";
import Paper from '@mui/material/Paper';
import { Link } from "react-router-dom";
import Navbar from "./components/navbar.jsx"
import Button from '@mui/material/Button';
import MobileTree from './assets/mobile-tree.png'
import { useRef } from 'react';

function App() {
  const aboutRef = useRef(null);

  return (
    <>
      <section className="bg-gradient-to-br from-black via-gray-900 to-blue-500 min-h-screen">
        <Navbar />
        <div className="flex flex-col justify-center items-center mt-10 text-center">
          <motion.div
            className="mx-3 my-2"
            initial={{ opacity: 0, y: [-50] }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              duration: 1.7,
              bounce: 0.3
            }}
          >
            <div className="text-5xl font-bold mb-4">YOUR DREAM PROJECT</div>
            <div className="text-5xl font-bold text-blue-500">STARTS HERE</div>
          </motion.div>
          <motion.div
            className="mx-3 my-2"
            initial={{ opacity: 0, x: [-50] }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              type: "spring",
              duration: 1.7,
              bounce: 0.3
            }}>
            <div className="text-lg px-2 mt-3 flex flex-col">
              <div>
                <div className="mb-2 inline">Find Personalized Project Ideas tailored against your current </div>
                <div className="text-blue-500 inline">skill level, </div>
                <div className="inline">and</div>
                <div className="text-blue-500 inline"> ambition.</div>
              </div>

              <div className="pt-3">
                <div className="inline">Simplified for </div>
                <div className="inline text-blue-500">optimal AI comprehension.</div>
              </div>
            </div>
          </motion.div>

          <div className="mx-2 my-5 flex gap-5">
            <Link to={'form'}><Button variant="contained">Get Started</Button></Link>
            <Button variant="outlined" onClick={() => {
              aboutRef.current?.scrollIntoView({ behavior: 'smooth' })
            }}
            >
              About
            </Button>
          </div>

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

          <div className="text-5xl font-bold mt-10 pt-10 mx-5" ref={aboutRef}>WORKS AROUND YOU</div>
          <div className="mt-2 mx-2 text-center">Project Pilot is a tool for effortlessly generating tailored and industry standard computer science project ideas. </div>
          <div className="mt-2 mx-2 text-center mb-5">Designed for students, hobbyists, and professionals alike, our app transforms the way you brainstorm and plan your next big project.</div>

          <div className="ml-5 mr-4">
            <img src={MobileTree} alt="" />
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }} // Trigger animation once when 20% of the element is visible
            transition={{
              type: 'spring',
              stiffness: 50,
              damping: 10,
              duration: 2,
              bounce: 0.2
            }}
          >
            <Paper className="mx-2 mt-3 px-3 py-3">
              <ul className="text-left mt-2">
                <li className="font-bold">Effortless Idea Generation:</li>
                <li className="pl-3">Skip the hassle of typing out every detail about your project needs. With just a few clicks, you can generate highly specific and relevant project ideas tailored to your experience level and interests.</li>
              </ul>
            </Paper>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: [-50] }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }} // Trigger animation once when 20% of the element is visible
            transition={{
              type: 'spring',
              stiffness: 50,
              damping: 10,
              duration: 2,
              bounce: 0.2
            }}
          >
            <Paper className="mx-2 mt-3 px-3 py-3">
              <ul className="text-left mt-2">
                <li className="font-bold">Save Time and Effort:</li>
                <li className="pl-3">Focus on bringing your ideas to life rather than struggling with brainstorming. Our app takes care of the ideation process so you can spend more time on what matters most—building and creating.</li>
              </ul>
            </Paper>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }} // Trigger animation once when 20% of the element is visible
            transition={{
              type: 'spring',
              stiffness: 50,
              damping: 10,
              duration: 2,
              bounce: 0.2
            }}
          >
            <Paper className="mx-2 mt-3 px-3 py-3">
              <ul className="text-left mt-2">
                <li className="font-bold">Industry-Relevant Insights:</li>
                <li className="pl-3">Stay ahead of the curve with project ideas that incorporate current tech job market trends and industry standards. We use up-to-date data to ensure your projects are not only innovative but also aligned with what’s relevant and sought after in the tech world.</li>
              </ul>
            </Paper>
          </motion.div>

          <div className="mx-3 text-5xl font-bold mt-20">
            <div className="mb-5 pt-5">Q&A</div>
          </div>


          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ amount: "all" }}
          >
            <Paper elevation={3} className="my-2 mt-10 mx-2 w-80 px-2 py-1 text-left">
              I was able to find a project that was within my skill level but also pushed my boundaries.
              <div className="mt-2 text-gray-400 text-sm">Cole Hartman <br /> Student, CSULB</div>
            </Paper>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ amount: "all" }}
          >
            <Paper elevation={3} className="my-2 mx-2 w-80 px-2 py-1 text-left">
              Easy to use
              <div className="mt-2 text-gray-400 text-sm">Cole Hartman <br /> Student, CSULB</div>
            </Paper>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ amount: "all" }}
          >
            <Paper elevation={3} className="my-2 mx-2 w-80 px-2 py-1 text-left">
              I got the idea for my first web scraping project here!
              <div className="mt-2 text-gray-400 text-sm">Cole Hartman <br /> Student, CSULB</div>
            </Paper>
          </motion.div>

          <div>FILLER</div>
        </div >



      </section >
    </>
  );
}

export default App
