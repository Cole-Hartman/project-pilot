import { motion } from "framer-motion"
import React, { useState, useEffect } from 'react';
import { supabase } from '../config/supabaseClient.js'
import Navbar from "../components/navbar"
import Expand from '../components/Expand.jsx';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DeleteIcon from '@mui/icons-material/Delete';

const ProjectCard = ({ project, onExpand, onToggleSave, onDelete }) => {
  return (
    <div className="border p-4 rounded-lg relative">
      <h3 className="text-xl font-bold">{project.title}</h3>
      <p className="mt-2">{project.short_description}</p>
      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => onExpand(project)}
      >
        Learn More
      </button>
      <button
        className="absolute top-2 right-2 text-red-500"
        onClick={() => onToggleSave(project)}
      >
        {project.saved ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </button>
      <button
        className="absolute bottom-2 right-2 text-gray-500 hover:text-red-500"
        onClick={() => onDelete(project)}
      >
        <DeleteIcon />
      </button>
    </div>
  );
};

const Projects = () => {
  const [expandedProject, setExpandedProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      if (!user) {
        setError('No user is currently logged in');
        setLoading(false);
        return;
      }

      setCurrentUser(user)

      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;

      setProjects(data || []);
    } catch (err) {
      console.error('Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleSave = async (project) => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .update({ saved: !project.saved })
        .eq('user_id', currentUser.id)
        .eq('title', project.title)  // Using title as part of the unique identifier
        .select()
        .single();

      if (error) throw error;

      setProjects(projects.map(p =>
        p.user_id === project.user_id && p.title === project.title ? data : p
      ));
    } catch (err) {
      console.error('Error toggling save:', err);
      setError(err.message);
    }
  };

  const handleDelete = async (project) => {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('user_id', currentUser.id)
        .eq('title', project.title);

      if (error) throw error;

      setProjects(projects.filter(p =>
        !(p.user_id === project.user_id && p.title === project.title)
      ));
    } catch (err) {
      console.error('Error deleting project:', err);
      setError(err.message);
    }
  };

  const handleExpand = (project) => {
    setExpandedProject(project);
  };

  const handleClose = () => {
    setExpandedProject(null);
  };

  if (loading) return <div className="text-white">Loading projects...</div>;
  if (error) return <div className="text-white">Error: {error}</div>;

  const savedProjects = projects.filter(project => project.saved);
  const unsavedProjects = projects.filter(project => !project.saved);

  return (
    <div className="mx-screen bg-gradient-to-br from-black via-gray-900 to-blue-500 min-h-screen overflow-y-auto">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ amount: "all" }}
      >
        <Navbar />
      </motion.div>

      {/* Saved Projects Section */}
      <section className="mb-8">
        <h1 className="text-3xl font-bold mb-6 px-3 text-white">Saved Projects</h1>
        {savedProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 px-3 lg:grid-cols-3 gap-4">
            {savedProjects.map((project) => (
              <ProjectCard
                key={`${project.user_id}-${project.title}`}
                project={project}
                onExpand={handleExpand}
                onToggleSave={handleToggleSave}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-white text-xl">
            You don't have any saved projects yet.
          </div>
        )}
      </section>

      {/* My Projects Section */}
      <section>
        <h1 className="text-3xl font-bold mb-6 px-3 text-white">My Projects</h1>
        {unsavedProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 px-3 mb-10 lg:grid-cols-3 gap-4">
            {unsavedProjects.map((project) => (
              <ProjectCard
                key={`${project.user_id}-${project.title}`}
                project={project}
                onExpand={handleExpand}
                onToggleSave={handleToggleSave}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-white text-xl">
            You don't have any unsaved projects yet, Get Started to find some!
          </div>
        )}
      </section>

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
