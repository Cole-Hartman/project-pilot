import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/navbar.jsx';
import AuthWrapper from '../components/AuthWrapper.jsx'
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function Form() {
  const [step, setStep] = useState(0);
  const [prompt, setPrompt] = useState(" ");
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedTraits, setSelectedTraits] = useState([]);

  {/*Transition Presets*/ }
  const fadeTransition = {
    initial: { opacity: 0, y: -40 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 40 },
    transition: { duration: 0.8 }
  };

  {/* Handle Language Select */ }
  const handleLanguageToggle = (language) => {
    setSelectedLanguages(prevLanguages =>
      prevLanguages.includes(language)
        ? prevLanguages.filter(lang => lang !== language)
        : [...prevLanguages, language]
    );
  };

  const handleLanguageConfirm = () => {
    if (selectedLanguages.length === 0) {
      setPrompt(prompt + "I am not comfortable with any programming languages. ");
    } else {
      setPrompt(prompt + `I am comfortable with the following languages: ${selectedLanguages.join(', ')}. `);
    }
    nextStep();
  };

  {/* Handle Trait Select */ }
  const handleTraitToggle = (trait) => {
    setSelectedTraits(prevTraits =>
      prevTraits.includes(trait)
        ? prevTraits.filter(t => t !== trait)
        : [...prevTraits, trait]
    );
  };

  const handleTraitConfirm = () => {
    if (selectedTraits.length === 0) {
      setPrompt(prompt + "I wouldn't describe myself as a developer . ");
    } else {
      setPrompt(prompt + `I would describe myself as a developer with the following traits: ${selectedTraits.join(', ')}. `);
    }
    nextStep();
  };

  useEffect(() => {
    console.log(prompt)
  }, [prompt])


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
              onClick={() => {
                setPrompt("Generate a computer science project for me. First I will let you get to know me and my skill level. ");
                nextStep()
              }}
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 1,
                bounce: 0.3
              }}
            >
              <h2 className="text-6xl 2xl:text-8xl font-bold mb-28 text-center">ABOUT YOU</h2>
            </motion.div >
            <motion.div key="step1" {...fadeTransition} className='flex flex-col justify-center items-center'>
              <div className="text-2xl 2xl:text-3xl font-bold">How many years of coding experience do you have?</div>
              <div className="flex flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="bg-opacity-50 mt-20 mb-2 text-xl p-5 rounded-xl bg-blue-500 hover:bg-opacity-100 text-center cursor-pointer"
                  onClick={() => {
                    setPrompt(prompt + "I have no coding experience. ");
                    nextStep();
                  }}
                >
                  No Coding Experience
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="bg-opacity-50 mt-20 mb-2 text-xl p-5 rounded-xl bg-blue-500 hover:bg-opacity-100 text-center cursor-pointer"
                  onClick={() => {
                    setPrompt(prompt + "I have 0-1 years of coding experience. ");
                    nextStep();
                  }}
                >
                  0-1 Years
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="bg-opacity-50 mt-20 mb-2 text-xl p-5 rounded-xl bg-blue-500 hover:bg-opacity-100 text-center cursor-pointer"
                  onClick={() => {
                    setPrompt(prompt + "I have 2-4 years of coding experience. ");
                    nextStep();
                  }}
                >
                  2-4 Years
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="bg-opacity-50 mt-20 mb-2 text-xl p-5 rounded-xl bg-blue-500 hover:bg-opacity-100 text-center cursor-pointer"
                  onClick={() => {
                    setPrompt(prompt + "I have 5+ years of coding experience. ");
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1,
                bounce: 0.3
              }}
            >
              <h2 className="text-6xl 2xl:text-8xl font-bold mb-28 text-center">ABOUT YOU</h2>
            </motion.div > <motion.div key="step2" {...fadeTransition} className='flex flex-col justify-center items-center'>
              <div className="text-2xl 2xl:text-3xl font-bold">What year of college are you in?</div>
              <div className="flex flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="bg-opacity-50 mt-20 mb-2 text-xl p-5 rounded-xl bg-blue-500 hover:bg-opacity-100 text-center cursor-pointer"
                  onClick={() => {
                    setPrompt(prompt + "I am not studying computer science as a college student. ");
                    nextStep();
                  }}
                >
                  Not a College Student
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="bg-opacity-50 mt-20 mb-2 text-xl p-5 rounded-xl bg-blue-500 hover:bg-opacity-100 text-center cursor-pointer"
                  onClick={() => {
                    setPrompt(prompt + "I am a first year college student studying computer science. ");
                    nextStep();
                  }}
                >
                  1st Year
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="bg-opacity-50 mt-20 mb-2 text-xl p-5 rounded-xl bg-blue-500 hover:bg-opacity-100 text-center cursor-pointer"
                  onClick={() => {
                    setPrompt(prompt + "I am a 2nd year college student studying computer science. ");
                    nextStep();
                  }}
                >
                  2nd Year
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="bg-opacity-50 mt-20 mb-2 text-xl p-5 rounded-xl bg-blue-500 hover:bg-opacity-100 text-center cursor-pointer"
                  onClick={() => {
                    setPrompt(prompt + "I am a 3rd year college student studying computer science. ");
                    nextStep();
                  }}
                >
                  3rd Year
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="bg-opacity-50 mt-20 mb-2 text-xl p-5 rounded-xl bg-blue-500 hover:bg-opacity-100 text-center cursor-pointer"
                  onClick={() => {
                    setPrompt(prompt + "I am a 4th year college student studying computer science. ");
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
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1,
                bounce: 0.3
              }}
            >
              <h2 className="text-6xl 2xl:text-8xl font-bold mb-28 text-center">ABOUT YOU</h2>
            </motion.div>
            <motion.div key="step3" {...fadeTransition} className='flex flex-col justify-center items-center'>
              <div className="text-2xl 2xl:text-3xl font-bold mb-10">What programming languages are you comfortable with? None is ok!</div>
              <div className="flex flex-wrap justify-center gap-4 mb-10">
                {['Python', 'JavaScript', 'Java', 'C', 'C++', 'C#', 'Ruby', 'Go', 'Swift', 'Kotlin', 'Rust'].map(language => (
                  <motion.button
                    key={language}
                    whileHover={{ scale: 1.05 }}
                    className={`bg-opacity-50 mb-2 text-xl p-5 rounded-xl ${selectedLanguages.includes(language) ? 'bg-green-500' : 'bg-blue-500'
                      } hover:bg-opacity-100 text-center cursor-pointer`}
                    onClick={() => handleLanguageToggle(language)}
                  >
                    {language}
                  </motion.button>
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-opacity-50 mt-10 mb-2 text-xl p-5 rounded-xl bg-yellow-500 hover:bg-opacity-100 text-center cursor-pointer"
                onClick={handleLanguageConfirm}
              >
                Continue
              </motion.button>
            </motion.div>
          </>
        );
      case 4:
        return (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1,
                bounce: 0.3
              }}
            >
              <h2 className="text-6xl 2xl:text-8xl font-bold mb-28 text-center">ABOUT YOU</h2>
            </motion.div > <motion.div key="step4" {...fadeTransition} className='flex flex-col justify-center items-center'>
              <div className="text-2xl 2xl:text-3xl font-bold">How much time can you dedicate towards this project?</div>
              <div className="flex flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="bg-opacity-50 mt-20 mb-2 text-xl p-5 rounded-xl bg-blue-500 hover:bg-opacity-100 text-center cursor-pointer"
                  onClick={() => {
                    setPrompt(prompt + "I can dedicate a few hours to this project. ");
                    nextStep();
                  }}
                >
                  Hours
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="bg-opacity-50 mt-20 mb-2 text-xl p-5 rounded-xl bg-blue-500 hover:bg-opacity-100 text-center cursor-pointer"
                  onClick={() => {
                    setPrompt(prompt + "I can dedicate a few days to this project. ");
                    nextStep();
                  }}
                >
                  Days
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="bg-opacity-50 mt-20 mb-2 text-xl p-5 rounded-xl bg-blue-500 hover:bg-opacity-100 text-center cursor-pointer"
                  onClick={() => {
                    setPrompt(prompt + "I can dedicate a few months to this project. ");
                    nextStep();
                  }}
                >
                  Months
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="bg-opacity-50 mt-20 mb-2 text-xl p-5 rounded-xl bg-blue-500 hover:bg-opacity-100 text-center cursor-pointer"
                  onClick={() => {
                    setPrompt(prompt + "I can dedicate as much time as needed for this project. ");
                    nextStep();
                  }}
                >
                  Any
                </motion.button>


              </div>
            </motion.div>
          </>);
      case 5:
        return (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1,
                bounce: 0.3
              }}
            >
              <h2 className="text-6xl 2xl:text-8xl font-bold mb-28 text-center">ABOUT YOU</h2>
            </motion.div>
            <motion.div key="step5" {...fadeTransition} className='flex flex-col justify-center items-center'>
              <div className="text-2xl 2xl:text-3xl font-bold mb-10">How would you describe yourself as a developer?</div>
              <div className="flex flex-wrap justify-center gap-4 mb-10">
                {['Analytical', 'Innovative', 'Collaborative', 'Efficient', 'Curious', 'Adaptive', 'User-focused', 'Experiennced', 'Passionate'].map(trait => (
                  <motion.button
                    key={trait}
                    whileHover={{ scale: 1.05 }}
                    className={`bg-opacity-50 mb-2 text-xl p-5 rounded-xl ${selectedTraits.includes(trait) ? 'bg-green-500' : 'bg-blue-500'
                      } hover:bg-opacity-100 text-center cursor-pointer`}
                    onClick={() => handleTraitToggle(trait)}
                  >
                    {trait}
                  </motion.button>
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-opacity-50 mt-10 mb-2 text-xl p-5 rounded-xl bg-yellow-500 hover:bg-opacity-100 text-center cursor-pointer"
                onClick={handleTraitConfirm}
              >
                Continue
              </motion.button>
            </motion.div>
          </>
        );
      case 6:
        return (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 1,
                bounce: 0.3
              }}
            >
              <h2 className="text-6xl 2xl:text-8xl font-bold mb-28 text-center">ABOUT YOUR PROJECT</h2>
            </motion.div >
            <motion.div key="step1" {...fadeTransition} className='flex flex-col justify-center items-center'>
              <div className="text-2xl 2xl:text-3xl font-bold">Bruh?</div>
              <div className="flex flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="bg-opacity-50 mt-20 mb-2 text-xl p-5 rounded-xl bg-blue-500 hover:bg-opacity-100 text-center cursor-pointer"
                  onClick={() => {
                    setPrompt(prompt + "I have no coding experience. ");
                    nextStep();
                  }}
                >
                  No Coding Experience
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="bg-opacity-50 mt-20 mb-2 text-xl p-5 rounded-xl bg-blue-500 hover:bg-opacity-100 text-center cursor-pointer"
                  onClick={() => {
                    setPrompt(prompt + "I have 0-1 years of coding experience. ");
                    nextStep();
                  }}
                >
                  0-1 Years
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="bg-opacity-50 mt-20 mb-2 text-xl p-5 rounded-xl bg-blue-500 hover:bg-opacity-100 text-center cursor-pointer"
                  onClick={() => {
                    setPrompt(prompt + "I have 2-4 years of coding experience. ");
                    nextStep();
                  }}
                >
                  2-4 Years
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="bg-opacity-50 mt-20 mb-2 text-xl p-5 rounded-xl bg-blue-500 hover:bg-opacity-100 text-center cursor-pointer"
                  onClick={() => {
                    setPrompt(prompt + "I have 5+ years of coding experience. ");
                    nextStep();
                  }}
                >
                  5+ Years
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
