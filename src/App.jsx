//import { useState } from "react";
import { motion } from "framer-motion"
import "./App.css";

function App() {
  return (
    <>
      <motion.div
        className="box text-center"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01]
        }}>Project Pilot</motion.div>
    </>
  );
}

export default App;
