import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/navbar.jsx';
import AuthWrapper from '../components/AuthWrapper.jsx'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Completion from '../components/Completion.jsx'

export default function Form() {
  const [step, setStep] = useState(0);
  const [prompt, setPrompt] = useState(" ");

  const fadeTransition = {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
    transition: { duration: 0.5 }
  };

  const nextStep = () => setStep(prevStep => prevStep + 1);

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <motion.div key="step0" {...fadeTransition} className='flex flex-col justify-center items-center'>
            <div className='flex flex-col items-center md:flex-row md:gap-4 md:mb-20'>
              <div className="text-6xl 2xl:text-8xl font-bold">GET</div>
              <div className="text-6xl 2xl:text-8xl font-bold text-blue-500">STARTED</div>
            </div>
            <motion.div
              whileHover={{ scale: 1.08 }}
              className='bg-opacity-50 mt-20 mb-2 text-xl p-5 rounded-xl bg-blue-500 hover:bg-opacity-100 w-36 text-center cursor-pointer'
              onClick={nextStep}
            >
              Continue
            </motion.div>
            <div className='flex flex-row gap-1'>
              <AccessTimeIcon />
              Takes 3 minutes
            </div>
          </motion.div>
        );
      case 1:
        return (
          <>
            <h2 className="text-6xl 2xl:text-8xl font-bold mb-28 text-center">ABOUT YOU</h2>
            <motion.div key="step1" {...fadeTransition} className='flex flex-col justify-center items-center'>
              <div className="text-2xl 2xl:text-3xl font-bold">How many years of coding experience do you have?</div>
              <div className="flex flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="bg-opacity-50 mt-20 mb-2 text-xl p-5 rounded-xl bg-blue-500 hover:bg-opacity-100 text-center cursor-pointer"
                  onClick={() => {
                    setPrompt("How to center a div");
                    nextStep();
                  }}
                >
                  No Coding Experience
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="bg-opacity-50 mt-20 mb-2 text-xl p-5 rounded-xl bg-blue-500 hover:bg-opacity-100 text-center cursor-pointer"
                  onClick={() => {
                    setPrompt("How to center a div");
                    nextStep();
                  }}
                >
                  0-1 Years
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="bg-opacity-50 mt-20 mb-2 text-xl p-5 rounded-xl bg-blue-500 hover:bg-opacity-100 text-center cursor-pointer"
                  onClick={() => {
                    setPrompt("How to center a div");
                    nextStep();
                  }}
                >
                  2-4 Years
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="bg-opacity-50 mt-20 mb-2 text-xl p-5 rounded-xl bg-blue-500 hover:bg-opacity-100 text-center cursor-pointer"
                  onClick={() => {
                    setPrompt("How to center a div");
                    nextStep();
                  }}
                >
                  5+ Years
                </motion.button>
              </div>
            </motion.div>
          </>);
      case 2:
        return (
          <>
            <h2 className="text-6xl 2xl:text-8xl font-bold mb-28 text-center">ABOUT YOU</h2>
            <motion.div key="step2" {...fadeTransition} className='flex flex-col justify-center items-center'>
              <div className="text-2xl 2xl:text-3xl font-bold">What year of college are you in?</div>
              <div className="flex flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="bg-opacity-50 mt-20 mb-2 text-xl p-5 rounded-xl bg-blue-500 hover:bg-opacity-100 text-center cursor-pointer"
                  onClick={() => {
                    setPrompt("How to center a div");
                    nextStep();
                  }}
                >
                  Not a College Student
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="bg-opacity-50 mt-20 mb-2 text-xl p-5 rounded-xl bg-blue-500 hover:bg-opacity-100 text-center cursor-pointer"
                  onClick={() => {
                    setPrompt("How to center a div");
                    nextStep();
                  }}
                >
                  1st Year
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="bg-opacity-50 mt-20 mb-2 text-xl p-5 rounded-xl bg-blue-500 hover:bg-opacity-100 text-center cursor-pointer"
                  onClick={() => {
                    setPrompt("How to center a div");
                    nextStep();
                  }}
                >
                  2nd Year
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="bg-opacity-50 mt-20 mb-2 text-xl p-5 rounded-xl bg-blue-500 hover:bg-opacity-100 text-center cursor-pointer"
                  onClick={() => {
                    setPrompt("How to center a div");
                    nextStep();
                  }}
                >
                  3rd Year
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="bg-opacity-50 mt-20 mb-2 text-xl p-5 rounded-xl bg-blue-500 hover:bg-opacity-100 text-center cursor-pointer"
                  onClick={() => {
                    setPrompt("How to center a div");
                    nextStep();
                  }}
                >
                  4th + Year
                </motion.button>
              </div>
            </motion.div>
          </>);
      case 3:
        return (
          <motion.div key="step3" {...fadeTransition} className='flex flex-col justify-center items-center'>
            <h2 className="text-4xl font-bold mb-8 text-center">Your Completion</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-lg"
              onClick={nextStep}
            >
              Next Step
            </motion.button>
          </motion.div>
        );
      case 4:
        return (
          <motion.div key="step4" {...fadeTransition} className='flex flex-col justify-center items-center'>
            <h2 className="text-4xl font-bold mb-8 text-center">Additional Information</h2>
            {/* Add your form fields here */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-lg"
              onClick={nextStep}
            >
              Submit
            </motion.button>
          </motion.div>
        );
      default:
        return (
          <motion.div key="stepFinal" {...fadeTransition} className='flex flex-col justify-center items-center'>
            <h2 className="text-4xl font-bold mb-8 text-center">Thank You!</h2>
            <p>Your form has been submitted successfully.</p>
          </motion.div>
        );
    }
  };

  return (
    <AuthWrapper>
      <section className="bg-gradient-to-br from-black via-gray-900 to-blue-500 h-screen overflow-y-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ amount: "all" }}
        >
          <Navbar />
        </motion.div>
        <div className='h-full flex items-center justify-center pb-52'>
          <motion.div
            className="mx-3 my-2 flex flex-col justify-center items-center"
            initial={{ opacity: 0, y: -90 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              duration: 1.7,
              bounce: 0.3
            }}
          >
            <AnimatePresence mode="wait">
              {renderStep()}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </AuthWrapper>
  );
}
