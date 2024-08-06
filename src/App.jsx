//import { useState } from "react";
import { motion } from "framer-motion";
import Paper from '@mui/material/Paper';
import { Link } from "react-router-dom";
import Navbar from "./components/navbar.jsx"
import MobileTree from './assets/mobile-tree.png'
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { BarChart } from '@mui/x-charts/BarChart';
import { useRef } from 'react';

function App() {
  const aboutRef = useRef(null);

  return (
    <>
      <section className="bg-gradient-to-br from-black via-gray-900 to-blue-500 min-h-screen overflow-x-hidden">
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
                <div className="mb-2 inline">Find Personalized CS Project Ideas tailored against your current </div>
                <div className="text-blue-500 inline">skill level, </div>
                <div className="inline">and</div>
                <div className="text-blue-500 inline"> ambition.</div>
              </div>

              <div className="pt-3">
                <div className="inline">Designed for </div>
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

          {/*Works Around You Section*/}
          <div className="text-5xl font-bold mt-10 pt-10 mx-5" ref={aboutRef}>WORKS AROUND YOU</div>
          <div className="mt-2 mx-2 text-center">Project Pilot is a tool for effortlessly generating tailored and industry standard computer science project ideas. </div>
          <div className="mt-2 mx-2 text-center mb-5">Designed for students, hobbyists, and professionals alike, our app transforms the way you brainstorm and plan your next big project.</div>

          <div className="ml-5 mr-4">
            <img src={MobileTree} alt="" />
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ amount: 0.4 }} // Trigger animation once when 20% of the element is visible
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
            viewport={{ amount: 0.4 }} // Trigger animation once when 20% of the element is visible
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
            viewport={{ amount: 0.4 }} // Trigger animation once when 20% of the element is visible
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

          {/*Data Chart Section*/}
          <div className="text-5xl font-bold mt-9">LAND JOBS</div>

          <div className="w-full max-w-4xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ amount: 0.4 }}
              transition={{
                type: 'spring',
                stiffness: 50,
                damping: 10,
                duration: 1.5
              }}
              className="relative w-full h-80"
            >
              <BarChart
                xAxis={[{ scaleType: 'band', data: ['group A', 'group B'] }]}
                series={[{ data: [1, 5.4] }, { data: [2.5, 3.7] }]}
              />
            </motion.div>
          </div>

          {/*---- QandA Section ----*/}
          <div className="mx-3 text-5xl font-bold mt-20">
            <div className="mb-5 pt-5">Q&A</div>
          </div>

          <div className="mx-2">
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                What makes Project Pilot different from other idea generators?
              </AccordionSummary>
              <AccordionDetails>
                Project Pilot uses a sophisticated AI-driven system to craft tailored project ideas based on your input. By selecting from a range of options related to your experience level, interests, and goals, you provide the necessary context. Our AI then processes this information and generates highly specific and relevant project ideas that align with current tech industry trends and standards.
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                Is Project Pilot suitable for all experience levels?
              </AccordionSummary>
              <AccordionDetails>
                Absolutely! Project Pilot is designed to cater to a wide range of experience levels, from beginners to advanced developers. By adjusting your preferences through our user-friendly interface, you can receive project ideas that match your skill level and goals. Whether you're just starting out or looking to tackle complex challenges, Project Pilot will provide ideas that are tailored to your needs.
              </AccordionDetails>
            </Accordion>
            <Accordion defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3-content"
                id="panel3-header"
              >
                How secure is my data with Project Pilot?
              </AccordionSummary>
              <AccordionDetails>
                Your privacy and data security are top priorities for us. Project Pilot employs industry-standard security measures to protect your information. We use encryption for data transmission and storage, and our systems are regularly monitored for vulnerabilities. Additionally, we adhere to strict privacy policies to ensure that your data is used only for generating project ideas and is never shared with unauthorized third parties.
              </AccordionDetails>
            </Accordion>
          </div>

          {/*Quotes Section*/}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ amount: "all" }}
          >
            <Paper elevation={3} className="my-2 mt-10 mx-2 w-80 px-2 py-1 text-left">
              I was able to find a project that was within my skill level but also pushed my boundaries.
              <div className="mt-2 text-blue-500 text-opacity-90 text-sm">Cole Hartman <br /> Student, CSULB</div>
            </Paper>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ amount: "all" }}
          >
            <Paper elevation={3} className="my-2 mx-2 w-80 px-2 py-1 text-left">
              Easy to use
              <div className="mt-2 text-blue-500 text-opacity-90 text-sm">Cole Hartman <br /> Student, CSULB</div>
            </Paper>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ amount: "all" }}
          >
            <Paper elevation={3} className="my-2 mx-2 w-80 px-2 py-1 text-left">
              I got the idea for my first web scraping project here!
              <div className="mt-2 text-blue-500 text-opacity-90 text-sm">Cole Hartman <br /> Student, CSULB</div>
            </Paper>
          </motion.div>

          <div><br /></div>
        </div >
      </section >
    </>
  );
}

export default App
