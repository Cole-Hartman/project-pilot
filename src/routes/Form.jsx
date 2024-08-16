import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/navbar.jsx';
import AuthWrapper from '../components/AuthWrapper.jsx'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import OpenAI from "openai";
import { supabase } from '../config/supabaseClient.js';


export default function Form() {
  const [step, setStep] = useState(0);
  const [prompt, setPrompt] = useState(" ");
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedTraits, setSelectedTraits] = useState([]);
  const [selectedGoals, setSelectedGoals] = useState([]);
  const [selectedTechStack, setSelectedTechStack] = useState([]);
  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const [selectedAreas, setSelectedAreas] = useState([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completion, setCompletion] = useState(null);

  {/*Transition Presets*/ }
  const fadeTransition = {
    initial: { opacity: 0, y: -40 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 40 },
    transition: { duration: 0.8 }
  };

  const nextStep = () => setStep(prevStep => prevStep + 1);

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

  //useEffect(() => {
  //  console.log(prompt)
  //}, [prompt])


  const navigate = useNavigate();

  {/* On submit, prompt GPT */ }
  async function Completion(prompt) {
    try {
      console.log("PROMPT REQUESTED", prompt);
      const openai = new OpenAI({ apiKey: import.meta.env.VITE_OPENAI_API_KEY, dangerouslyAllowBrowser: true });
      const result = await openai.chat.completions.create({
        messages: [{ role: "system", content: prompt }],
        model: "gpt-4o-mini",
      });
      return result.choices[0].message.content;
    } catch (error) {
      console.error("Error fetching completion:", error);
      return null;
    }
  }

  useEffect(() => {
    if (isSubmitting) {
      const submitForm = async () => {
        const newPrompt = prompt + "INSTRUCTION: Please provide 10 project ideas in the following specific format: Title: [Project Title] Short Description: [A brief one-sentence description of the project] Long Description:[A more detailed 3-4 sentence description of the project, including its purpose, key features, and potential challenges] Title: [Project Title] Short Description: [A brief one-sentence description of the project] Long Description: [A more detailed 3-4 sentence description of the project, including its purpose, key features, and potential challenges] [Continue for all 10 projects] Please ensure that each project follows this exact format, with Title:, Short Description:, and Long Description: labels for each project. Do not include any additional text or formatting outside of this structure. Ensure each project idea aligns roughly with the specified interests, technologies, and preferences of the user. Avoid providing any additional details such as implementation steps or code snippets. Maintain a consistent format for each project idea. Do not use any markdown formatting. Return the projects only in the format specified.";
        const completionResult = await Completion(newPrompt);
        if (completionResult) {
          //console.log("COMPLETION RESULT:", completionResult);
          setCompletion(completionResult)
        } else {
          // Handle the error case
          console.error("Failed to get completion result");
        }
        setIsSubmitting(false);
      };
      submitForm();
    }
  }, [isSubmitting, navigate]);

  {/*Parse completion result*/ }
  const parseCompletion = (completionText) => {
    const projects = [];
    const projectRegex = /Title:\s*(.*?)\s*Short Description:\s*(.*?)\s*Long Description:\s*([\s\S]*?)(?=\n\s*Title:|$)/g;
    let match;

    while ((match = projectRegex.exec(completionText)) !== null) {
      const [, title, shortDescription, longDescription] = match;

      projects.push({
        title: title.trim(),
        short_description: shortDescription.trim(),
        long_description: longDescription.trim()
      });
    }
    return projects;
  };

  {/*Supabase Intertion*/ }
  useEffect(() => {
    const insertProjects = async () => {
      if (completion) {
        console.log("Raw completion text:", completion);
        const parsedProjects = parseCompletion(completion);
        console.log(`Parsed ${parsedProjects.length} projects:`, parsedProjects);

        if (parsedProjects.length === 0) {
          console.error("No projects were parsed. Check the completion format.");
          return;
        }

        // Fetch the current user
        const { data: { user }, error: userError } = await supabase.auth.getUser()
        if (userError) {
          console.log('Error fetching user:', userError)
          return;
        }
        if (!user) {
          console.error('No user is currently logged in');
          return;
        }

        for (const project of parsedProjects) {
          console.log(`Inserting project:`, project);
          try {
            const { data, error } = await supabase
              .from('projects')
              .insert([
                {
                  title: project.title,
                  short_description: project.short_description,
                  long_description: project.long_description,
                  user_email: user.email,
                  user_id: user.id
                }
              ]);

            if (error) throw error;
            console.log('Project inserted successfully:', data);
          } catch (error) {
            console.error('Error inserting project:', error);
          }
        }
        console.log('Insertion Complete');
        navigate('/projects');
      } else {
        //
      }
    };

    insertProjects();
  }, [completion, navigate]);

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
                setPrompt("PROMPT: Generate a computer science project for me. First I will let you get to know me and my skill level. Then I will describe what I want for my project ");
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
                exit: { opacity: 0, y: -5 }
              }}
              transition={{ duration: 0.5 }}
              className="text-6xl 2xl:text-8xl mt-10 md:mt-0 font-bold mb-20 md:mb-28 text-center"
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
              <div className="text-2xl w-3/4 text-center 2xl:text-3xl font-bold">How many years of coding experience do you have?</div>
              <div className="flex md:flex-row flex-col gap-4 mt-10 md:mt-20 w-full justify-center items-center">
                {[
                  { text: "No Coding Experience", years: "no" },
                  { text: "0-1 Years", years: "0-1 years of" },
                  { text: "2-4 Years", years: "2-4 years of" },
                  { text: "5+ Years", years: "5+ years of" }
                ].map(({ text, years }) => (
                  <motion.button
                    key={text}
                    whileHover={{ scale: 1.05 }}
                    className="bg-opacity-50 mb-2 text-lg md:text-xl p-2 md:p-5 rounded-xl bg-blue-500 hover:bg-opacity-100 text-center cursor-pointer h-30 w-3/4 md:w-auto"
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
          <motion.div
            key="step2"
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
          >
            <motion.h2
              variants={{
                initial: { opacity: 0, y: 5 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: -5 }
              }}
              transition={{ duration: 0.5 }}
              className="text-6xl 2xl:text-8xl mt-16 md:mt-0 font-bold mb-20 md:mb-28 text-center"
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
              <div className="text-2xl w-3/4 text-center 2xl:text-3xl font-bold">What year of college are you in?</div>
              <div className="flex md:flex-row flex-col gap-4 mt-10 md:mt-20 w-full justify-center items-center">
                {[
                  { text: "Not a College Student", prompt: "I am not studying computer science as a college student. " },
                  { text: "1st Year", prompt: "I am a first year college student studying computer science. " },
                  { text: "2nd Year", prompt: "I am a 2nd year college student studying computer science. " },
                  { text: "3rd Year", prompt: "I am a 3rd year college student studying computer science. " },
                  { text: "4th+ Year", prompt: "I am a 4th year or above college student studying computer science. " }
                ].map(({ text, prompt: buttonPrompt }) => (
                  <motion.button
                    key={text}
                    whileHover={{ scale: 1.05 }}
                    className="bg-opacity-50 mb-2 text-lg md:text-xl p-2 md:p-5 rounded-xl bg-blue-500 hover:bg-opacity-100 text-center cursor-pointer h-30 w-3/4 md:w-auto"
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
          <motion.div
            key="step3"
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
          >
            <motion.h2
              variants={{
                initial: { opacity: 0, y: 5 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: -5 }
              }}
              transition={{ duration: 0.5 }}
              className="text-6xl 2xl:text-8xl mt-20 md:mt-0 font-bold mb-20 md:mb-28 text-center"
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
              <div className="text-2xl w-full md:w-3/4 text-center 2xl:text-3xl font-bold mb-10">
                What programming languages are you comfortable with? None is ok!
              </div>
              <div className="flex flex-wrap justify-center gap-4 md:mb-10 w-full px-4 md:px-0">
                {['Python', 'JavaScript', 'Java', 'C', 'C++', 'C#', 'Ruby', 'Go', 'Swift', 'Kotlin', 'Rust'].map(language => (
                  <motion.button
                    key={language}
                    whileHover={{ scale: 1.05 }}
                    className={`bg-opacity-50 mb-2 text-lg md:text-xl p-2 md:p-5 rounded-xl ${selectedLanguages.includes(language) ? 'bg-green-500' : 'bg-blue-500'
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
          <motion.div
            key="step4"
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
            className='flex flex-col justify-center items-center'>
            <motion.h2
              variants={{
                initial: { opacity: 0, y: 5 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: -5 }
              }}
              transition={{ duration: 0.5 }}
              className="text-6xl 2xl:text-8xl mt-20 md:mt-0 font-bold mb-20 md:mb-28 text-center"
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
              <div className="text-2xl 2xl:text-3xl font-bold text-center">
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
            className='flex flex-col justify-center items-center px-4 md:px-0'
          >
            <motion.h2
              variants={{
                initial: { opacity: 0, y: 5 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: -5 }
              }}
              transition={{ duration: 0.5 }}
              className="text-5xl md:text-6xl 2xl:text-8xl mt-16 md:mt-0 font-bold mb-20 md:mb-28 text-center"
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
              className='flex flex-col justify-center items-center w-full'
            >
              <div className="text-xl md:text-2xl 2xl:text-3xl font-bold mb-10 text-center">
                What do you prefer working on?
              </div>
              <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto justify-center items-center">
                {[
                  { text: "Frontend", prompt: "I enjoy working on the frontend. " },
                  { text: "Backend", prompt: "I enjoy working on the backend. " },
                  { text: "Full-Stack", prompt: "I enjoy working full-stack. " },
                  { text: "Not Sure", prompt: "I'm not quite sure if I would rather work on frontend, backend, or fullstack for this project. " }
                ].map(({ text, prompt: buttonPrompt }) => (
                  <motion.button
                    key={text}
                    whileHover={{ scale: 1.05 }}
                    className="bg-opacity-50 mb-2 text-lg md:text-xl p-3 md:p-5 rounded-xl bg-blue-500 hover:bg-opacity-100 text-center cursor-pointer w-full md:w-auto"
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
      case 6:
        return (
          <motion.div
            key="step6"
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
            className='flex flex-col justify-center items-center px-4 md:px-0'
          >
            <motion.h2
              variants={{
                initial: { opacity: 0, y: 5 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: 20 }
              }}
              transition={{ duration: 0.5 }}
              className="text-5xl md:text-6xl 2xl:text-8xl mt-24 md:mt-0 font-bold mb-20 md:mb-28 text-center"
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
              className='flex flex-col justify-center items-center w-full'
            >
              <div className="text-xl md:text-2xl 2xl:text-3xl font-bold mb-10 text-center w-full md:w-3/4">
                How would you describe yourself as a developer?
              </div>
              <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-10 w-full">
                {['Analytical', 'Innovative', 'Collaborative', 'Efficient', 'Curious', 'Adaptive', 'User-focused', 'Experienced', 'Passionate'].map(trait => (
                  <motion.button
                    key={trait}
                    whileHover={{ scale: 1.05 }}
                    className={`bg-opacity-50 mb-2 text-sm md:text-xl p-3 md:p-5 rounded-xl ${selectedTraits.includes(trait) ? 'bg-green-500' : 'bg-blue-500'
                      } hover:bg-opacity-100 text-center cursor-pointer`}
                    onClick={() => handleTraitToggle(trait)}
                  >
                    {trait}
                  </motion.button>
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-opacity-50 mt-6 md:mt-10 mb-2 text-lg md:text-xl p-4 md:p-5 rounded-xl bg-yellow-500 hover:bg-opacity-100 text-center cursor-pointer w-full md:w-auto"
                onClick={handleTraitConfirm}
              >
                Continue
              </motion.button>
            </motion.div>
          </motion.div>
        );
      case 7:
        return (
          <motion.div
            key="step7"
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
            className='flex flex-col justify-center items-center px-4 md:px-0 h-screen overflow-hidden'
          >
            <motion.h2
              variants={{
                initial: { opacity: 0, y: 5 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: -5 }
              }}
              transition={{ duration: 0.5 }}
              className="text-5xl md:text-6xl xl:text-7xl mt-20 md:mt-12 font-bold mb-8 md:mb-12 text-center"
            >
              ABOUT YOUR <span className="text-blue-500">PROJECT</span>
            </motion.h2>
            <motion.button
              variants={{
                initial: { opacity: 0, y: 10 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: -10 }
              }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="bg-opacity-50 mt-6 md:mt-10 mb-2 text-lg md:text-xl p-4 md:p-5 rounded-xl bg-yellow-500 hover:bg-opacity-100 text-center cursor-pointer w-full md:w-auto"
              onClick={() => nextStep()}
            >
              Continue
            </motion.button>
          </motion.div>
        );
      case 8:
        return (
          <motion.div
            key="step8"
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
            className='flex flex-col justify-center items-center px-4 md:px-0 h-screen overflow-hidden'
          >
            <motion.h2
              variants={{
                initial: { opacity: 0, y: 5 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: -5 }
              }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl xl:text-7xl mt-20 md:mt-12 font-bold mb-8 md:mb-12 text-center"
            >
              ABOUT YOUR PROJECT
            </motion.h2>
            <motion.div
              variants={{
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: 20 }
              }}
              transition={{ duration: 0.5 }}
              className='flex flex-col justify-start items-center w-full overflow-hidden'
            >
              <div className="text-xl md:text-2xl 2xl:text-4xl font-bold mb-6 lg:mt-20 text-center">
                Do you have a target audience?
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 w-full h-5/6 max-w-6xl overflow-y-auto lg:overflow-y-hidden pb-8 px-4">
                {[
                  { text: "Students", prompt: "My target audience is students. " },
                  { text: "Businesses", prompt: "My target audience is businesses. " },
                  { text: "Developers", prompt: "My target audience is developers. " },
                  { text: "General Public", prompt: "My target audience is the general public. " },
                  { text: "Educators", prompt: "My target audience is educators. " },
                  { text: "Researchers", prompt: "My target audience is researchers. " },
                  { text: "Children", prompt: "My target audience is children. " },
                  { text: "Seniors", prompt: "My target audience is seniors. " },
                  { text: "Small Businesses", prompt: "My target audience is small businesses. " },
                  { text: "Startups", prompt: "My target audience is startups. " },
                  { text: "Non-Profits", prompt: "My target audience is non-profits. " },
                  { text: "City Residents", prompt: "My target audience is city residents. " },
                  { text: "Healthcare Professionals", prompt: "My target audience is healthcare professionals. " },
                  { text: "Environmental Organizations", prompt: "My target audience is environmental organizations. " },
                  { text: "Gamers", prompt: "My target audience is gamers. " },
                  { text: "Entrepreneurs", prompt: "My target audience is entrepreneurs. " },
                  { text: "Other", prompt: "Target audience: Other. " },
                  { text: "No", prompt: "I have no target audience. " }

                ].map(({ text, prompt: buttonPrompt }) => (
                  <motion.button
                    key={text}
                    whileHover={{ scale: 1.05 }}
                    className="bg-blue-500 bg-opacity-50 hover:bg-opacity-100 text-white font-semibold py-2 md:py-3 px-4 xl:w-40 lg:h-20 rounded-xl text-sm md:text-base xl:text-xl"
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
          <motion.div
            key="step9"
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
            className='flex flex-col justify-center items-center px-4 md:px-0'
          >
            <motion.h2
              variants={{
                initial: { opacity: 0, y: 5 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: -5 }
              }}
              transition={{ duration: 0.5 }}
              className="text-5xl md:text-6xl 2xl:text-8xl mt-16 md:mt-0 font-bold mb-20 md:mb-28 text-center"
            >
              ABOUT YOUR PROJECT
            </motion.h2>
            <motion.div
              variants={{
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: 20 }
              }}
              transition={{ duration: 0.5 }}
              className='flex flex-col justify-center items-center w-full'
            >
              <div className="text-xl md:text-2xl 2xl:text-3xl font-bold mb-10 text-center w-full md:w-3/4">
                What are some potential goals for this project?
              </div>
              <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-10 w-full">
                {['Learning', 'Inspiration', 'Exploring', 'Resume Building', 'Entrepreneurship', 'Networking', 'Contribution'].map(goal => (
                  <motion.button
                    key={goal}
                    whileHover={{ scale: 1.05 }}
                    className={`bg-opacity-50 mb-2 text-sm md:text-xl p-3 md:p-5 rounded-xl ${selectedGoals.includes(goal) ? 'bg-green-500' : 'bg-blue-500'
                      } hover:bg-opacity-100 text-center cursor-pointer`}
                    onClick={() => handleGoalToggle(goal)}
                  >
                    {goal}
                  </motion.button>
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-opacity-50 mt-6 md:mt-10 mb-2 text-lg md:text-xl p-4 md:p-5 rounded-xl bg-yellow-500 hover:bg-opacity-100 text-center cursor-pointer w-full md:w-auto"
                onClick={handleGoalConfirm}
              >
                Continue
              </motion.button>
            </motion.div>
          </motion.div>
        );
      case 10:
        return (
          <motion.div
            key="step10"
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
            className='flex flex-col justify-center items-center px-4 md:px-0'
          >
            <motion.h2
              variants={{
                initial: { opacity: 0, y: 5 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: -5 }
              }}
              transition={{ duration: 0.5 }}
              className="text-5xl md:text-6xl 2xl:text-8xl mt-16 md:mt-0 font-bold mb-20 md:mb-28 text-center"
            >
              ABOUT YOUR PROJECT
            </motion.h2>
            <motion.div
              variants={{
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: 20 }
              }}
              transition={{ duration: 0.5 }}
              className='flex flex-col justify-center items-center w-full'
            >
              <div className="text-xl md:text-2xl 2xl:text-3xl font-bold mb-10 text-center w-full md:w-3/4">
                Preferred Project Scale
              </div>
              <div className="flex flex-col md:flex-row flex-wrap justify-center gap-2 md:gap-4 w-full">
                {[
                  { text: "Small Personal Project", prompt: "I would prefer a small personal project. " },
                  { text: "Medium-Sized Application", prompt: "I would prefer a medium-sized project. " },
                  { text: "Large Scale System", prompt: "I would prefer a large-scale project. " },
                  { text: "No Preference", prompt: "I don't have a preference for the scale of the project. " }
                ].map(({ text, prompt: buttonPrompt }) => (
                  <motion.button
                    key={text}
                    whileHover={{ scale: 1.05 }}
                    className="bg-opacity-50 mb-2 text-sm md:text-xl p-3 md:p-5 rounded-xl bg-blue-500 hover:bg-opacity-100 text-center cursor-pointer w-full md:w-auto"
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
      case 11:
        return (
          <motion.div
            key="step11"
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
            className='flex flex-col justify-center items-center px-4 md:px-0'
          >
            <motion.h2
              variants={{
                initial: { opacity: 0, y: 5 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: -5 }
              }}
              transition={{ duration: 0.5 }}
              className="text-5xl md:text-6xl 2xl:text-8xl mt-24 md:mt-0 font-bold mb-20 md:mb-28 text-center"
            >
              ABOUT YOUR PROJECT
            </motion.h2>
            <motion.div
              variants={{
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: 20 }
              }}
              transition={{ duration: 0.5 }}
              className='flex flex-col justify-center items-center w-full'
            >
              <div className="text-xl md:text-2xl 2xl:text-3xl font-bold mb-10 text-center w-full md:w-3/4">
                Do you prefer using any of the following?
              </div>
              <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-10 w-full">
                {['React', 'Angular', 'Vue.js', 'Node.js', 'Django', 'Flask', 'Spring Boot', 'Laravel', 'Express.js', 'MongoDB', 'PostgreSQL', 'Docker'].map(tech => (
                  <motion.button
                    key={tech}
                    whileHover={{ scale: 1.05 }}
                    className={`bg-opacity-50 mb-2 text-sm md:text-xl p-3 md:p-5 rounded-xl ${selectedTechStack.includes(tech) ? 'bg-green-500' : 'bg-blue-500'
                      } hover:bg-opacity-100 text-center cursor-pointer`}
                    onClick={() => handleTechStackToggle(tech)}
                  >
                    {tech}
                  </motion.button>
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-opacity-50 mt-3 md:mt-10 mb-2 text-lg md:text-xl p-4 md:p-5 rounded-xl bg-yellow-500 hover:bg-opacity-100 text-center cursor-pointer w-full md:w-auto"
                onClick={handleTechStackConfirm}
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
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
            className='flex flex-col justify-center items-center px-4 md:px-0'
          >
            <motion.h2
              variants={{
                initial: { opacity: 0, y: 5 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: -5 }
              }}
              transition={{ duration: 0.5 }}
              className="text-5xl md:text-6xl 2xl:text-8xl mt-28 md:mt-0 font-bold mb-20 md:mb-28 text-center"
            >
              ABOUT YOUR PROJECT
            </motion.h2>
            <motion.div
              variants={{
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: 20 }
              }}
              transition={{ duration: 0.5 }}
              className='flex flex-col justify-center items-center w-full'
            >
              <div className="text-xl md:text-2xl 2xl:text-3xl font-bold mb-10 text-center w-full md:w-3/4">
                Any additional preferences for your project?
              </div>
              <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-10 w-full">
                {['Open-Source', 'Private', 'Scalable', 'Maintainable', 'Deployable', 'Secure', 'Modular', 'Cloud-Based', 'Versioned', 'Documented'].map(preference => (
                  <motion.button
                    key={preference}
                    whileHover={{ scale: 1.05 }}
                    className={`bg-opacity-50 mb-2 text-sm md:text-xl p-3 md:p-5 rounded-xl ${selectedPreferences.includes(preference) ? 'bg-green-500' : 'bg-blue-500'
                      } hover:bg-opacity-100 text-center cursor-pointer`}
                    onClick={() => handlePreferenceToggle(preference)}
                  >
                    {preference}
                  </motion.button>
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-opacity-50 md:mt-10 mb-2 text-lg md:text-xl p-4 md:p-5 rounded-xl bg-yellow-500 hover:bg-opacity-100 text-center cursor-pointer w-full md:w-auto"
                onClick={handlePreferenceConfirm}
              >
                Continue
              </motion.button>
            </motion.div>
          </motion.div>
        );
      case 13:
        return (
          <motion.div
            key="step13"
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
            className='flex flex-col justify-center items-center px-4 md:px-0'
          >
            <motion.h2
              variants={{
                initial: { opacity: 0, y: 5 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: 20 }
              }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl 2xl:text-8xl mt-24 md:mt-0 font-bold mb-20 md:mb-28 text-center"
            >
              ABOUT YOUR PROJECT
            </motion.h2>
            <motion.div
              variants={{
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: 20 }
              }}
              transition={{ duration: 0.8 }}
              className='flex flex-col justify-center items-center w-full'
            >
              <div className="text-xl md:text-2xl 2xl:text-3xl font-bold mb-10 text-center w-full md:w-3/4">
                Do any of these areas spark interest?
              </div>
              <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-10 w-full">
                {['Web Development', 'Mobile Apps', 'AI/Machine Learning', 'Data Science', 'Cybersecurity', 'IoT', 'Cloud Computing', 'DevOps', 'Blockchain', 'AR/VR'].map(area => (
                  <motion.button
                    key={area}
                    whileHover={{ scale: 1.05 }}
                    className={`bg-opacity-50 mb-2 text-sm md:text-xl p-3 md:p-5 rounded-xl ${selectedAreas.includes(area) ? 'bg-green-500' : 'bg-blue-500'
                      } hover:bg-opacity-100 text-center cursor-pointer`}
                    onClick={() => handleAreaToggle(area)}
                  >
                    {area}
                  </motion.button>
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-opacity-50 mt-0 md:mt-10 mb-2 text-lg md:text-xl p-4 md:p-5 rounded-xl bg-yellow-500 hover:bg-opacity-100 text-center cursor-pointer w-full md:w-auto"
                onClick={handleAreaConfirm}
              >
                Continue
              </motion.button>
            </motion.div>
          </motion.div>
        );
      case 14:
        return (
          <motion.div
            key="step14"
            {...fadeTransition}
            className='flex flex-col justify-center items-center px-4 md:px-0'
          >
            <h2 className="text-5xl md:text-6xl 2xl:text-8xl mt-16 md:mt-0 font-bold mb-20 md:mb-28 text-center">
              Next Step
            </h2>
            <p className="text-lg md:text-2xl mb-8 text-center w-full md:w-3/4">
              Great job! You've completed all the questions. Let's generate your projects.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-lg text-lg md:text-xl w-full md:w-auto"
              onClick={() => setIsSubmitting(true)}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </motion.button>
          </motion.div>
        );
      //default:
      //  return (
      //    <motion.div key="stepFinal" {...fadeTransition} className='flex flex-col justify-center items-center'>
      //      <h2 className="text-4xl font-bold mb-8 text-center">Thank You!</h2>
      //      <p>Your form has been submitted successfully.</p>
      //    </motion.div>
      //  );
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
        <div className='h-full flex items-center justify-center pb-52 mt-5'>
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
