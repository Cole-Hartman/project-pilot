//import { useState } from "react";
import { motion } from "framer-motion";
import Paper from '@mui/material/Paper';
import { Link } from "react-router-dom";

function App() {
  return (
    <>
      <motion.div
        className="box text-center text-2xl"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01]
        }}>Project Pilot</motion.div>
      <Paper elevation={4}>TEST</Paper>
      <button>
        <Link to={"test"}>CLICK ME</Link>
      </button>
    </>
  );
}

export default App;
