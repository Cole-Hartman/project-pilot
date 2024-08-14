import { motion } from "framer-motion"
import React, { useState } from 'react';
import Navbar from "../components/navbar"
import Expand from '../components/Expand.jsx';


const ProjectCard = ({ project, onExpand }) => {
  return (
    <div className="border p-4 rounded-lg">
      <h3 className="text-xl font-bold">{project.title}</h3>
      <p className="mt-2">{project.shortDescription}</p>
      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => onExpand(project)}
      >
        Learn More
      </button>
    </div>
  );
};

const Projects = () => {
  const [expandedProject, setExpandedProject] = useState(null);

  const projects = [
    // Your array of project objects
    { id: 1, title: "Project 1", shortDescription: "Short desc 1", fullDescription: "Full desc 1", technologies: ["React", "Node.js"] },
    { id: 2, title: "Project 2", shortDescription: "Short desc 2", fullDescription: "Full desc 2", technologies: ["Vue", "Express"] },
  ];

  const handleExpand = (project) => {
    setExpandedProject(project);
  };

  const handleClose = () => {
    setExpandedProject(null);
  };

  return (
    <div className="mx-screen bg-gradient-to-br from-black via-gray-900 to-blue-500 h-screen overflow-y-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ amount: "all" }}
      >
        <Navbar />
      </motion.div>
      <h1 className="text-3xl font-bold mb-6 px-3">My Projects</h1>
      < div className="grid grid-cols-1 md:grid-cols-2 px-3 lg:grid-cols-3 gap-4" >
        {
          projects.map((project) => (
            <ProjectCard key={project.id} project={project} onExpand={handleExpand} />
          ))
        }
      </div >

      <Expand isOpen={!!expandedProject} onClose={handleClose}>
        {expandedProject && (
          <>
            <h2 className="text-2xl font-bold mb-4">{expandedProject.title}</h2>
            <p className="mb-4">{expandedProject.fullDescription}</p>
            <h3 className="text-xl font-bold mb-2">Technologies Used:</h3>
            <ul className="list-disc list-inside mb-4">
              {expandedProject.technologies.map((tech, index) => (
                <li key={index}>{tech}</li>
              ))}
            </ul>
          </>
        )}
      </Expand>
    </div >
  );
};

export default Projects;
