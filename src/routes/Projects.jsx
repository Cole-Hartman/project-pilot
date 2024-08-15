import { motion } from "framer-motion"
import React, { useState, useEffect } from 'react';
import { supabase } from '../config/supabaseClient.js'
import Navbar from "../components/navbar"
import Expand from '../components/Expand.jsx';

const ProjectCard = ({ project, onExpand }) => {
  return (
    <div className="border p-4 rounded-lg">
      <h3 className="text-xl font-bold">{project.title}</h3>
      <p className="mt-2">{project.short_description}</p>
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
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProjects = async () => {
      try {
        // First, get the current user
        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (userError) throw userError;

        if (!user) {
          setError('No user is currently logged in');
          setLoading(false);
          return;
        }

        // Then, fetch projects for this user
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('user_id', user.id);  // This line ensures only the current user's projects are fetched

        if (error) throw error;

        setProjects(data || []);
      } catch (err) {
        console.error('Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProjects();
  }, []);

  const handleExpand = (project) => {
    setExpandedProject(project);
  };

  const handleClose = () => {
    setExpandedProject(null);
  };

  if (loading) return <div className="text-white">Loading projects...</div>;
  if (error) return <div className="text-white">Error: {error}</div>;

  return (
    <div className="mx-screen bg-gradient-to-br from-black via-gray-900 to-blue-500 h-screen overflow-y-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ amount: "all" }}
      >
        <Navbar />
      </motion.div>
      <h1 className="text-3xl font-bold mb-6 px-3 text-white">My Projects</h1>
      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 px-3 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} onExpand={handleExpand} />
          ))}
        </div>
      ) : (
        <div className="text-center text-white text-xl">
          You don't have any projects yet, Get Started to find some!
        </div>
      )}
      <Expand isOpen={!!expandedProject} onClose={handleClose}>
        {expandedProject && (
          <>
            <h2 className="text-2xl font-bold mb-4">{expandedProject.title}</h2>
            <p className="mb-4">{expandedProject.long_description}</p>
          </>
        )}
      </Expand>
    </div>
  );
};

export default Projects;
