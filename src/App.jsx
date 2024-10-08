import { motion } from "framer-motion";
import Paper from '@mui/material/Paper';
import Navbar from "./components/navbar.jsx"
import MobileTree from './assets/mobile-tree.png'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import TerminalIcon from '@mui/icons-material/Terminal';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { BarChart } from '@mui/x-charts/BarChart';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import demoVid from '/demovid.mp4'


function App() {
  const aboutRef = useRef(null);
  const navigate = useNavigate();

  return (
    <>
      <section className="bg-gradient-to-br from-black via-gray-900 to-blue-500 min-h-screen overflow-x-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ amount: "all" }}
        >
          <Navbar />
        </motion.div>

        <div className="flex flex-col justify-center items-center mt-10 2xl:mt-20 text-center">
          <motion.div
            className="mx-3 mt-5 2xl:mb-6"
            initial={{ opacity: 0, y: [-50] }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              duration: 1.7,
              bounce: 0.3
            }}
          >
            <div className="text-5xl 2xl:text-7xl font-bold mb-4">YOUR DREAM PROJECT</div>
            <div className="text-5xl 2xl:text-7xl font-bold text-blue-500">STARTS HERE</div>
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
            <div className="text-lg px-2 mt-3 2xl:mt-5 2xl:mb-16 flex flex-col justify-center items-center">
              <div className="md:w-2/3">
                <div className="mb-2 inline 2xl:text-xl">Find personalized CS project Ideas tailored against your current </div>
                <div className="text-blue-500 inline 2xl:text-xl">skill level, </div>
                <div className="inline 2xl:text-xl">and</div>
                <div className="text-blue-500 inline 2xl:text-xl"> ambition.</div>
              </div>

              <div className="pt-3 md:w-3/4 2xl:text-xl">
                <div className="inline">Built around structured prompt engineering designed for </div>
                <div className="inline text-blue-500">optimal AI comprehension</div>
                <div className="inline"> and </div>
                <div className="inline text-blue-500">return.</div>
              </div>
            </div>
          </motion.div>

          <div className="mx-2 mt-5 md:mt-0 md:my-5 flex gap-5">
            <motion.div
              whileHover={{ scale: 1.1 }}
            >
              <button
                onClick={() => navigate('/form')}
                className="w-26 h-10 text-sm xl:text-md 2xl:w-44 2xl:h-14 shadow-lg hover:shadow-xl px-2 2xl:px-4 2xl:py-2 bg-blue-600 bg-opacity-90 text-white font-semibold 2xl:text-md rounded-md text-opacity-90 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 mb-16 lg:mb-0"
              >
                FIND PROJECTS
              </button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.1 }}
            >
              <button
                className="h-10 2xl:w-40 2xl:h-14 shadow-lg hover:shadow-xl px-4 py-2 bg-opacity-0 border border-blue-300 text-blue-300 text-opacity-90 font-semibold text-sm xl:text-md 2xl:text-md rounded-md hover:border-blue-400 hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                onClick={() => {
                  aboutRef.current?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                ABOUT
              </button>
            </motion.div>
          </div>

          {/* Demo video */}
          <div className="mx-5 md:mt-3 xl:mt-10 md:w-2/3 2xl:w-1/2 relative">
            <div
              className="absolute inset-0 bg-blue-500 opacity-75 blur-3xl -z-10 scale-110"
              style={{
                boxShadow: '0 0 40px 20px rgba(59, 130, 246, 0.5), 0 0 100px 60px rgba(59, 130, 246, 0.4)',
              }}
            ></div>
            <video
              src={demoVid}
              loop
              playsInline
              autoPlay
              muted
              className="relative z-10 w-full rounded-[20px] block object-cover bg-transparent"
              style={{
                cursor: 'auto',
                objectPosition: '50% 50%',
                boxShadow: '0 0 20px 10px rgba(59, 130, 246, 0.3)',
              }}
            ></video>
          </div>

          <div className="w-full mt-24">
            <div className="h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-70"></div>
          </div>

          {/*Works Around You Section*/}
          <div className="mt-10 pt-10 mx-5" ref={aboutRef}>
            <div className="inline text-5xl 2xl:text-6xl font-bold">WORKS AROUND </div>
            <div className="inline 2xl:block text-5xl 2xl:text-6xl font-bold text-blue-500">YOU</div>
          </div>

          <div className="mt-2 mx-2 text-center 2xl:text-xl md:w-3/4">Project Pilot is a tool built around refined and structured prompt engineering that allows you to easily communicate your ideas and needs to generate tailored and industry standard computer science project ideas.</div>
          <div className="mt-2 mx-2 text-center 2xl:text-xl mb-5 md:w-1/2">Designed for students, hobbyists, and professionals alike, our app transforms the way you brainstorm and plan your next big project.</div>

          <div className="flex flex-col justify-center items-center mt-10 text-center xl:flex-row xl:mx-10">
            <div className="ml-5 mr-4 md:w-1/2 lg:w-2/5 mb-10 xl:w-2/6 2xl:w-1/4">
              <img src={MobileTree} alt="" />
            </div>

            <div className="md:w-4/5 2xl:w-3/5">
              <motion.div
                className="2xl:flex justify-center 2xl:h-50"
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
                <Paper className="mx-3 px-3 py-2 pb-5 xl:my-5 2xl:text-lg 2xl:w-3/4">
                  <ul className="text-left mt-2">
                    <li className="font-bold">Faster, Better, Stronger:</li>
                    <li className="pl-3">Sluggishly prompting AI to understand who you are and what you need is redundant and time consuming. With just a few clicks, you can generate highly specific and relevant project ideas with maximum efficiency and accuracy.</li>
                  </ul>
                </Paper>
              </motion.div>

              <motion.div
                className="2xl:flex justify-center 2xl:h-50"
                initial={{ opacity: 0, x: -50 }}
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
                <Paper className="mx-3 mt-3 px-3 pb-5 pt-1 xl:my-5 2xl:text-lg 2xl:w-3/4">
                  <ul className="text-left mt-2">
                    <li className="font-bold">Save Time and Effort:</li>
                    <li className="pl-3">Focus on bringing your ideas to life rather than struggling with brainstorming. Our app takes care of the ideation process so you can spend more time on what matters most—building and creating.</li>
                  </ul>
                </Paper>
              </motion.div>

              <motion.div
                className="2xl:flex justify-center 2xl:h-50"
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
                <Paper className="mx-3 mt-3 px-3 py-1 pb-3 xl:mt-5 2xl:text-lg 2xl:w-3/4">
                  <ul className="text-left mt-2">
                    <li className="font-bold">Industry-Relevant Insights:</li>
                    <li className="pl-3">Stay ahead of the curve with project ideas that incorporate current tech job market trends and industry standards. We use up-to-date data to ensure your projects are not only innovative but also aligned with what’s relevant and sought after in the tech world.</li>
                  </ul>
                </Paper>
              </motion.div>
            </div>
          </div>

          {/*Land Jobs Section*/}
          <div className="text-5xl 2xl:text-6xl font-bold mt-28 lg:mt-32 md:mt-20 2xl:mb-20">LAND JOBS</div>

          <div className="w-full mx-auto px-4 md:w-3/4 lg:w-2/4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ amount: 0.4, once: true }}
              transition={{
                type: 'spring',
                stiffness: 50,
                damping: 10,
                duration: 1.5
              }}
              className="relative w-full h-80 2xl:h-96"
            >
              <BarChart
                xAxis={[{ scaleType: 'band', data: ['group A', 'group B'] }]}
                series={[{ data: [1, 5.4] }, { data: [2.5, 3.7] }]}
              />
            </motion.div>
          </div>

          <div className="mx-3 mb-5 md:w-4/5 2xl:text-xl 2xl:w-3/5">According to Code.org, students who work on personal coding projects are 50% more likely to land a job in the tech industry shortly after graduation compared to those who only complete their formal coursework.</div>

          <motion.div
            className="2xl:mt-7"
            whileHover={{ scale: 1.1 }}
          >
            <button
              onClick={() => navigate('/form')}
              className="w-26 h-10 text-sm xl:text-md 2xl:w-40 2xl:h-12 shadow-lg hover:shadow-xl px-2 2xl:px-4 2xl:py-2 bg-blue-600 bg-opacity-90 text-white font-semibold 2xl:text-lg rounded-md text-opacity-90 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 mb-16 lg:mb-0"
            >
              GET STARTED
            </button>
          </motion.div>

          {/*---- QandA Section ----*/}
          <div className="mx-3 text-5xl 2xl:text-6xl font-bold mt-10 lg:mt-28">
            <div className="mb-5">Q&A</div>
          </div>

          <div className="mx-2 md:w-4/5 2xl:text-xl mb-28">
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                What makes Project Pilot different from other idea generators?
              </AccordionSummary>
              <AccordionDetails>
                Project Pilot is designed to gather as much information about you and your needs with as little input as possible using a sophisticated AI-driven system. By selecting from a range of options related to your experience level, interests, and goals, you provide the necessary context. Our AI then processes this information and generates highly specific and relevant project ideas that align with current tech industry trends and standards.
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
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3-content"
                id="panel3-header"
              >
                How secure is my data with Project Pilot?
              </AccordionSummary>
              <AccordionDetails>
                Your privacy and data security are very important. Project Pilot employs industry-standard security measures to protect your information. Our databases are encrypted for data transmission and storage, and our systems are regularly monitored for vulnerabilities. Additionally, we adhere to strict privacy policies to ensure that your data is used only for generating project ideas and is never shared with unauthorized third parties.
              </AccordionDetails>
            </Accordion>
          </div>

          <div className="w-full mb-10">
            <div className="h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-70"></div>
          </div>

          {/*Quotes Section*/}

          <div className="mt-18 mt-16 mb-10 grid grid-cols-1 w-4/5 md:grid md:grid-cols-3 2xl:text-xl">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ amount: "all" }}
            >
              <Paper elevation={3} className="my-2 mx-2 w-auto px-2 py-1 text-left">
                Helps you get past brainstorming and get started building.
                <div className="mt-2 text-blue-500 text-opacity-90 text-sm 2xl:text-md">Noah Kim<br /> Student, CSULB</div>
              </Paper>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ amount: "all" }}
            >
              <Paper elevation={3} className="my-2 mx-2 w-auto px-2 py-1 text-left">
                I'm starting an open source study space finder for students!
                <div className="mt-2 text-blue-500 text-opacity-90 text-sm 2xl:text-md">Angelo Sosa<br /> Student, SLU</div>
              </Paper>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ amount: "all" }}
            >
              <Paper elevation={3} className="my-2 mx-2 w-auto px-2 py-1 text-left">
                Very intuitive to use.
                <div className="mt-2 text-blue-500 text-opacity-90 text-sm 2xl:text-md">Jason Chen <br /> Developer, Coda</div>
              </Paper>
            </motion.div>
          </div>

          {/*Footer Section*/}
          <div className="h-32 md:h-28 w-full mt-10 grid grid-cols-3 md:grid-cols-4 2xl:text-lg mb-5 md:mb-10 lg:mb-0 xl:mt-32">
            <div className="col-span-2 flex flex-col items-left text-left pl-5 sm:pl-14 lg:pl-28 xl:pl-44 lg:w-3/4 2xl:w-full">
              <div className="font-bold flex gap-3 pb-1">
                <TerminalIcon style={{ color: '#3B82F6' }} />
                Project Pilot
              </div>
              <div className="text-sm sm:text-md xl:text-md 2xl:w-3/4">
                Start your project today and let us take care of the ideation process so you can spend more time on what matters most—building and creating.
              </div>
            </div>
            <div className="hidden md:block"></div>
            <div className="flex flex-col text-left pl-10 lg:pl-0">
              <div className="font-bold">Links</div>
              <a href="https://www.linkedin.com/in/coleahartman/" target="_blank" className="text-sm sm:text-md xl:text-md">LinkedIn</a>
            </div>
          </div>

        </div >
      </section >
    </>
  );
}

export default App
