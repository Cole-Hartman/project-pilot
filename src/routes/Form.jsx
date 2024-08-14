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
  const [selectedGoals, setSelectedGoals] = useState([]);
  const [selectedTechStack, setSelectedTechStack] = useState([]);
  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const [selectedAreas, setSelectedAreas] = useState([]);



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

  {/* Handle Goal Select */ }
  const handleGoalToggle = (goal) => {
    setSelectedGoals(prevGoals =>
      prevGoals.includes(goal)
        ? prevGoals.filter(g => g !== goal)
        : [...prevGoals, goal]
    );
  };

  const handleGoalConfirm = () => {
    if (selectedGoals.length === 0) {
      setPrompt(prompt + "I don't have any specific goals for this project. ");
    } else {
      setPrompt(prompt + `My goals for this project are: ${selectedGoals.join(', ')}. `);
    }
    nextStep();
  };

  {/* Handle Tech Stack Select */ }
  const handleTechStackToggle = (tech) => {
    setSelectedTechStack(prevTechStack =>
      prevTechStack.includes(tech)
        ? prevTechStack.filter(t => t !== tech)
        : [...prevTechStack, tech]
    );
  };

  const handleTechStackConfirm = () => {
    if (selectedTechStack.length === 0) {
      setPrompt(prompt + "I don't have a specific tech stack in mind. ");
    } else {
      setPrompt(prompt + `I'm interested in using the following technologies: ${selectedTechStack.join(', ')}. `);
    }
    nextStep();
  };

  {/* Handle Language Select */ }
  const handlePreferenceToggle = (preference) => {
    setSelectedPreferences(prevPreferences =>
      prevPreferences.includes(preference)
        ? prevPreferences.filter(p => p !== preference)
        : [...prevPreferences, preference]
    );
  };

  const handlePreferenceConfirm = () => {
    if (selectedPreferences.length === 0) {
      setPrompt(prompt + "I don't have any additional preferences for the project. ");
    } else {
      setPrompt(prompt + `I have the following additional preferences for the project: ${selectedPreferences.join(', ')}. `);
    }
    nextStep();
  };

  {/* Handle Area Select */ }
  const handleAreaToggle = (area) => {
    setSelectedAreas(prevAreas =>
      prevAreas.includes(area)
        ? prevAreas.filter(a => a !== area)
        : [...prevAreas, area]
    );
  };
  const handleAreaConfirm = () => {
    if (selectedAreas.length === 0) {
      setPrompt(prompt + "I'm open to exploring any area of computer science. ");
    } else {
      setPrompt(prompt + `I'm particularly interested in the following areas: ${selectedAreas.join(', ')}. `);
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
          <motion.div
            key="step1"
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
          >
            <motion.h2
              variants={{
                initial: { opacity: 0, y: -20 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.5 }}
              className="text-6xl 2xl:text-8xl font-bold mb-28 text-center"
            >
              ABOUT YOU
            </motion.h2>

            <motion.div
              variants={{
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: 20 }
              }}
              transition={{ duration: 0.5 }}
              className='flex flex-col justify-center items-center'
            >
              <div className="text-2xl 2xl:text-3xl font-bold">How many years of coding experience do you have?</div>
              <div className="flex flex-row gap-4 mt-20">
                {[
                  { text: "No Coding Experience", years: "no" },
                  { text: "0-1 Years", years: "0-1 years of" },
                  { text: "2-4 Years", years: "2-4 years of" },
                  { text: "5+ Years", years: "5+ years of" }
                ].map(({ text, years }) => (
                  <motion.button
                    key={text}
                    whileHover={{ scale: 1.05 }}
                    className="bg-opacity-50 mb-2 text-xl p-5 rounded-xl bg-blue-500 hover:bg-opacity-100 text-center cursor-pointer"
                    onClick={() => {
                      setPrompt(prompt + `I have ${years} coding experience. `);
                      nextStep();
                    }}
                  >
                    {text}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div key="step2" className='flex flex-col justify-center items-center'>
            <h2 className="text-6xl 2xl:text-8xl font-bold mb-28 text-center">ABOUT YOU</h2>
            <motion.div
              {...fadeTransition}
              className='flex flex-col justify-center items-center'
            >
              <div className="text-2xl 2xl:text-3xl font-bold">What year of college are you in?</div>
              <div className="flex flex-wrap justify-center gap-4 mt-20">
                {[
                  { text: "Not a College Student", prompt: "I am not studying computer science as a college student. " },
                  { text: "1st Year", prompt: "I am a first year college student studying computer science. " },
                  { text: "2nd Year", prompt: "I am a 2nd year college student studying computer science. " },
                  { text: "3rd Year", prompt: "I am a 3rd year college student studying computer science. " },
                  { text: "4th + Year", prompt: "I am a 4th year or above college student studying computer science. " }
                ].map(({ text, prompt: buttonPrompt }) => (
                  <motion.button
                    key={text}
                    whileHover={{ scale: 1.05 }}
                    className="bg-opacity-50 mb-2 text-xl p-5 rounded-xl bg-blue-500 hover:bg-opacity-100 text-center cursor-pointer"
                    onClick={() => {
                      setPrompt(prompt + buttonPrompt);
                      nextStep();
                    }}
                  >
                    {text}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div key="step3" className='flex flex-col justify-center items-center'>
            <h2 className="text-6xl 2xl:text-8xl font-bold mb-28 text-center">ABOUT YOU</h2>
            <motion.div
              {...fadeTransition}
              className='flex flex-col justify-center items-center'
            >
              <div className="text-2xl 2xl:text-3xl font-bold mb-10">
                What programming languages are you comfortable with? None is ok!
              </div>
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
          </motion.div>
        );
      case 4:
        return (
          <motion.div key="step4" className='flex flex-col justify-center items-center'>
            <h2 className="text-6xl 2xl:text-8xl font-bold mb-28 text-center">ABOUT YOU</h2>
            <motion.div
              {...fadeTransition}
              className='flex flex-col justify-center items-center'
            >
              <div className="text-2xl 2xl:text-3xl font-bold">
                How much time can you dedicate towards this project?
              </div>
              <div className="flex flex-wrap justify-center gap-4 mt-20">
                {[
                  { text: "Hours", prompt: "I can dedicate a few hours to this project. " },
                  { text: "Days", prompt: "I can dedicate a few days to this project. " },
                  { text: "Months", prompt: "I can dedicate a few months to this project. " },
                  { text: "Any", prompt: "I can dedicate as much time as needed for this project. " }
                ].map(({ text, prompt: buttonPrompt }) => (
                  <motion.button
                    key={text}
                    whileHover={{ scale: 1.05 }}
                    className="bg-opacity-50 mb-2 text-xl p-5 rounded-xl bg-blue-500 hover:bg-opacity-100 text-center cursor-pointer"
                    onClick={() => {
                      setPrompt(prompt + buttonPrompt);
                      nextStep();
                    }}
                  >
                    {text}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        );
      case 5:
        return (
          <motion.div
            key="step5"
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
            className='flex flex-col justify-center items-center'
          >
            <motion.h2
              variants={{
                initial: { opacity: 1, y: 0 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: 20 }
              }}
              transition={{ duration: 0.5 }}
              className="text-6xl 2xl:text-8xl font-bold mb-28 text-center"
            >
              ABOUT YOU
            </motion.h2>

            <motion.div
              variants={{
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: 20 }
              }}
              transition={{ duration: 0.5 }}
              className='flex flex-col justify-center items-center'
            >
              <div className="text-2xl 2xl:text-3xl font-bold mb-10">
                How would you describe yourself as a developer?
              </div>
              <div className="flex flex-wrap justify-center gap-4 mb-10">
                {['Analytical', 'Innovative', 'Collaborative', 'Efficient', 'Curious', 'Adaptive', 'User-focused', 'Experienced', 'Passionate'].map(trait => (
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
          </motion.div>
        ); case 6:
        return (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            key="step6"
            className='flex flex-col justify-center items-center'
          >
            <h2 className="text-6xl 2xl:text-8xl font-bold mb-28 text-center">ABOUT YOUR PROJECT</h2>
            <motion.div key="step7" {...fadeTransition} className='flex flex-col justify-center items-center'>
              <div className="text-2xl 2xl:text-3xl font-bold">What do you preffer working on?</div>
              <div className="flex flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="bg-opacity-50 mt-20 mb-2 text-xl p-5 rounded-xl bg-blue-500 hover:bg-opacity-100 text-center cursor-pointer"
                  onClick={() => {
                    setPrompt(prompt + "I enjoy working on the frontend. ");
                    nextStep();
                  }}
                >
                  Frontend
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="bg-opacity-50 mt-20 mb-2 text-xl p-5 rounded-xl bg-blue-500 hover:bg-opacity-100 text-center cursor-pointer"
                  onClick={() => {
                    setPrompt(prompt + "I enjoy working on the backend. ");
                    nextStep();
                  }}
                >
                  Backend
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="bg-opacity-50 mt-20 mb-2 text-xl p-5 rounded-xl bg-blue-500 hover:bg-opacity-100 text-center cursor-pointer"
                  onClick={() => {
                    setPrompt(prompt + "I enjoy working full-stack. ");
                    nextStep();
                  }}
                >
                  Full-Stack
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="bg-opacity-50 mt-20 mb-2 text-xl p-5 rounded-xl bg-blue-500 hover:bg-opacity-100 text-center cursor-pointer"
                  onClick={() => {
                    setPrompt(prompt + "I'm not quite sure if I would rather work on frontend, backend, or fullstack for this project. ");
                    nextStep();
                  }}
                >
                  Not Sure
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        );
      case 7:
        return (
          <motion.div key="step7" className='flex flex-col justify-center items-center'>
            <h2 className="text-6xl 2xl:text-8xl font-bold mb-28 text-center">ABOUT YOUR PROJECT</h2>
            <motion.div
              {...fadeTransition}
              className='flex flex-col justify-center items-center'
            >
              <div className="text-2xl 2xl:text-3xl font-bold mb-10">
                What are some potential goals for this project?
              </div>
              <div className="flex flex-wrap justify-center gap-4 mb-10">
                {['Learning', 'Inspiration', 'Exploring', 'Resume Building', 'Entrepreneurship', 'Networking', 'Contribution'].map(goal => (
                  <motion.button
                    key={goal}
                    whileHover={{ scale: 1.05 }}
                    className={`bg-opacity-50 mb-2 text-xl p-5 rounded-xl ${selectedGoals.includes(goal) ? 'bg-green-500' : 'bg-blue-500'
                      } hover:bg-opacity-100 text-center cursor-pointer`}
                    onClick={() => handleGoalToggle(goal)}
                  >
                    {goal}
                  </motion.button>
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-opacity-50 mt-10 mb-2 text-xl p-5 rounded-xl bg-yellow-500 hover:bg-opacity-100 text-center cursor-pointer"
                onClick={handleGoalConfirm}
              >
                Continue
              </motion.button>
            </motion.div>
          </motion.div>
        );
      case 8:
        return (
          <motion.div key="step8" className='flex flex-col justify-center items-center'>
            <h2 className="text-6xl 2xl:text-8xl font-bold mb-28 text-center">ABOUT YOUR PROJECT</h2>
            <motion.div {...fadeTransition} className='flex flex-col justify-center items-center'>
              <div className="text-2xl 2xl:text-3xl font-bold mb-10">Preferred Project Scale</div>
              <div className="flex flex-wrap justify-center gap-4">
                {[
                  { text: "Small Personal Project", prompt: "I would prefer a small personal project. " },
                  { text: "Medium-Sized Application", prompt: "I would prefer a medium-sized project. " },
                  { text: "Large Scale System", prompt: "I would prefer a large-scale project. " },
                  { text: "No Preference", prompt: "I don't have a preference for the scale of the project. " }
                ].map(({ text, prompt: buttonPrompt }) => (
                  <motion.button
                    key={text}
                    whileHover={{ scale: 1.05 }}
                    className="bg-opacity-50 mb-2 text-xl p-5 rounded-xl bg-blue-500 hover:bg-opacity-100 text-center cursor-pointer"
                    onClick={() => {
                      setPrompt(prompt + buttonPrompt);
                      nextStep();
                    }}
                  >
                    {text}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        );
      case 9:
        return (
          <motion.div key="step9" className='flex flex-col justify-center items-center'>
            <h2 className="text-6xl 2xl:text-8xl font-bold mb-28 text-center">ABOUT YOUR PROJECT</h2>
            <motion.div {...fadeTransition} className='flex flex-col justify-center items-center'>
              <div className="text-2xl 2xl:text-3xl font-bold mb-10">Do you prefer using any of the following?</div>
              <div className="flex flex-wrap justify-center gap-4 mb-10">
                {['React', 'Angular', 'Vue.js', 'Node.js', 'Django', 'Flask', 'Spring Boot', 'Laravel', 'Express.js', 'MongoDB', 'PostgreSQL', 'Docker'].map(tech => (
                  <motion.button
                    key={tech}
                    whileHover={{ scale: 1.05 }}
                    className={`bg-opacity-50 mb-2 text-xl p-5 rounded-xl ${selectedTechStack.includes(tech) ? 'bg-green-500' : 'bg-blue-500'
                      } hover:bg-opacity-100 text-center cursor-pointer`}
                    onClick={() => handleTechStackToggle(tech)}
                  >
                    {tech}
                  </motion.button>
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-opacity-50 mt-10 mb-2 text-xl p-5 rounded-xl bg-yellow-500 hover:bg-opacity-100 text-center cursor-pointer"
                onClick={handleTechStackConfirm}
              >
                Continue
              </motion.button>
            </motion.div>
          </motion.div>
        );
      case 10:
        return (
          <motion.div key="step10" className='flex flex-col justify-center items-center'>
            <h2 className="text-6xl 2xl:text-8xl font-bold mb-28 text-center">ABOUT YOUR PROJECT</h2>
            <motion.div {...fadeTransition} className='flex flex-col justify-center items-center'>
              <div className="text-2xl 2xl:text-3xl font-bold mb-10">Any additional preferences for your project?</div>
              <div className="flex flex-wrap justify-center gap-4 mb-10">
                {['Open-Source', 'Private', 'Scalable', 'Maintainable', 'Deployable', 'Secure', 'Modular', 'Cloud-Based', 'Versioned', 'Documented'].map(preference => (
                  <motion.button
                    key={preference}
                    whileHover={{ scale: 1.05 }}
                    className={`bg-opacity-50 mb-2 text-xl p-5 rounded-xl ${selectedPreferences.includes(preference) ? 'bg-green-500' : 'bg-blue-500'
                      } hover:bg-opacity-100 text-center cursor-pointer`}
                    onClick={() => handlePreferenceToggle(preference)}
                  >
                    {preference}
                  </motion.button>
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-opacity-50 mt-10 mb-2 text-xl p-5 rounded-xl bg-yellow-500 hover:bg-opacity-100 text-center cursor-pointer"
                onClick={handlePreferenceConfirm}
              >
                Continue
              </motion.button>
            </motion.div>
          </motion.div>
        );
      case 11:
        return (
          <motion.div
            key="step11"
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
          >
            <motion.h2
              variants={{
                initial: { opacity: 1, y: 0 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: 40 }
              }}
              transition={{ duration: 0.8 }}
              className="text-6xl 2xl:text-8xl font-bold mb-28 text-center"
            >
              ABOUT YOUR PROJECT
            </motion.h2>

            <motion.div
              variants={{
                initial: { opacity: 0, y: -40 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: 40 }
              }}
              transition={{ duration: 0.8 }}
              className='flex flex-col justify-center items-center'
            >
              <div className="text-2xl 2xl:text-3xl font-bold mb-10">Do any of these areas spark interest?</div>
              <div className="flex flex-wrap justify-center gap-4 mb-10">
                {['Web Development', 'Mobile Apps', 'AI/Machine Learning', 'Data Science', 'Cybersecurity', 'IoT', 'Cloud Computing', 'DevOps', 'Blockchain', 'AR/VR'].map(area => (
                  <motion.button
                    key={area}
                    whileHover={{ scale: 1.05 }}
                    className={`bg-opacity-50 mb-2 text-xl p-5 rounded-xl ${selectedAreas.includes(area) ? 'bg-green-500' : 'bg-blue-500'
                      } hover:bg-opacity-100 text-center cursor-pointer`}
                    onClick={() => handleAreaToggle(area)}
                  >
                    {area}
                  </motion.button>
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-opacity-50 mt-10 mb-2 text-xl p-5 rounded-xl bg-yellow-500 hover:bg-opacity-100 text-center cursor-pointer"
                onClick={handleAreaConfirm}
              >
                Continue
              </motion.button>
            </motion.div>
          </motion.div>
        );
      case 12:
        return (
          <motion.div
            key="step12"
            {...fadeTransition}
            className='flex flex-col justify-center items-center'
          >
            <h2 className="text-6xl 2xl:text-8xl font-bold mb-28 text-center">Your Completion</h2>
            <p className="text-2xl mb-8 text-center">
              Great job! You've completed all the questions. Ready to generate your project idea?
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-lg text-xl"
              onClick={() => {
                console.log("Final prompt:", prompt);
                // Add your submission logic here
                nextStep();
              }}
            >
              Generate My Project Idea
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
          <div className="mx-3 my-2 flex flex-col justify-center items-center">
            <AnimatePresence mode="wait">
              {renderStep()}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </AuthWrapper>
  );
}
