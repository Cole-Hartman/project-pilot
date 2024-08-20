import { motion } from "framer-motion"
import React, { useState, useEffect } from 'react';
import { supabase } from '../config/supabaseClient.js'
import Navbar from "../components/navbar"
import Expand from '../components/Expand.jsx';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Skeleton, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProjectCard = ({ project, onExpand, onToggleSave, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = () => {
    setIsDeleting(true);
  };

  const handleConfirmDelete = () => {
    onDelete(project);
    setIsDeleting(false);
  };

  const handleCancelDelete = () => {
    setIsDeleting(false);
  };

  return (
    <div className="border p-4 rounded-lg relative">
      <h3 className="text-xl font-bold">{project.title}</h3>
      <p className="mt-2">{project.short_description}</p>
      <button
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
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
      {!isDeleting ? (
        <button
          className="absolute bottom-2 right-2 text-gray-500 hover:text-red-500"
          onClick={handleDeleteClick}
        >
          <DeleteIcon />
        </button>
      ) : (
        <div className="absolute bottom-2 right-2 flex space-x-2">
          <button
            className="bg-red-500 text-white w-10 h-10 p-1 mr-1 rounded"
            onClick={handleConfirmDelete}
          >
            <CheckIcon fontSize="small" />
          </button>
          <button
            className="bg-gray-500 text-white w-10 h-10 p-1 rounded"
            onClick={handleCancelDelete}
          >
            <CloseIcon fontSize="small" />
          </button>
        </div>
      )}
    </div>
  );
};

const ProjectSkeleton = () => (
  <div className="border p-4 rounded-lg relative">
    <Skeleton variant="text" width="60%" height={32} />
    <Skeleton variant="text" width="100%" height={20} />
    <Skeleton variant="text" width="100%" height={20} />
    <Skeleton variant="rectangular" width="40%" height={36} className="mt-4" />
    <Skeleton variant="circular" width={24} height={24} className="absolute top-2 right-2" />
  </div>
);

const Projects = () => {
  const [expandedProject, setExpandedProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isGenerateExpanded, setIsGenerateExpanded] = useState(false);
  const [isDeleteAllExpanded, setIsDeleteAllExpanded] = useState(false);
  const [isDeletingAll, setIsDeletingAll] = useState(false);

  const navigate = useNavigate();

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

  const handleDeleteAllUnsaved = async () => {
    setIsDeletingAll(true);
    try {
      const unsavedProjects = projects.filter(project => !project.saved);

      for (const project of unsavedProjects) {
        const { error } = await supabase
          .from('projects')
          .delete()
          .eq('user_id', currentUser.id)
          .eq('title', project.title);

        if (error) throw error;
      }

      setProjects(projects.filter(project => project.saved));
      setIsDeleteAllExpanded(false);
    } catch (err) {
      console.error('Error deleting unsaved projects:', err);
      setError(err.message);
    } finally {
      setIsDeletingAll(false);
    }
  };

  const handleExpand = (project) => {
    setExpandedProject(project);
  };

  const handleClose = () => {
    setExpandedProject(null);
  };

  const handleGenerateNewClick = () => {
    setIsGenerateExpanded(true);
  };

  const handleGenerateClose = () => {
    setIsGenerateExpanded(false);
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="mx-screen bg-gradient-to-br from-black via-gray-900 to-blue-500 min-h-screen overflow-y-auto">
        <Navbar />
        <section className="mb-8">
          <h1 className="text-3xl font-bold mb-6 px-3 text-white">Saved Projects</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 px-3 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, index) => (
              <ProjectSkeleton key={`saved-skeleton-${index}`} />
            ))}
          </div>
        </section>
        <section>
          <h1 className="text-3xl font-bold mb-6 px-3 text-white">My Projects</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 px-3 mb-10 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, index) => (
              <ProjectSkeleton key={`my-skeleton-${index}`} />
            ))}
          </div>
        </section>
      </div>
    );
  }

  if (error) return <div className="text-white">Error: {error}</div>;

  const savedProjects = projects.filter(project => project.saved);
  const unsavedProjects = projects.filter(project => !project.saved).reverse();

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
        <div className="mb-6 flex items-center gap-5">
          <h1 className="text-3xl font-bold pl-3 text-white">My Projects</h1>
          <button className="text-lg border rounded-xl px-3 hover:border-blue-500 hover:text-blue-500" onClick={handleGenerateNewClick}>+ Generate New</button>
        </div>
        {unsavedProjects.length > 0 ? (
          <>
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
            <div className="flex justify-center mt-8 mb-12">
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                onClick={() => setIsDeleteAllExpanded(true)}
              >
                Delete All Unsaved Projects
              </button>
            </div>
          </>
        ) : (
          <div className="text-center text-white text-xl">
            You don't have any unsaved projects yet, Get Started to find some!
          </div>
        )}
      </section>

      <Expand isOpen={!!expandedProject} onClose={handleClose} title="Project Details">
        {expandedProject && (
          <>
            <h2 className="text-2xl font-bold mb-4">{expandedProject.title}</h2>
            <p className="mb-4">{expandedProject.long_description}</p>
          </>
        )}
      </Expand>

      <Expand isOpen={isGenerateExpanded} onClose={handleGenerateClose} title="Generate New Projects?">
        <div className="text-center">
          {/*<button className="mb-6 hover:bg-blue-600 border px-3 py-2 rounded-xl">Use Previous Preferences</button>*/}
          <button className="mb-2 hover:bg-blue-600 md:mx-4 border px-3 py-2 rounded-xl" onClick={() => navigate('/form')} >Get Started</button>
        </div>
      </Expand>

      <Expand isOpen={isDeleteAllExpanded} onClose={() => setIsDeleteAllExpanded(false)} title="Confirm Deletion">
        <div className="text-center">
          <p className="mb-4">Are you sure you want to delete all unsaved projects? This action cannot be undone.</p>
          <div className="flex justify-center space-x-4">
            <button
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => setIsDeleteAllExpanded(false)}
              disabled={isDeletingAll}
            >
              Cancel
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
              onClick={handleDeleteAllUnsaved}
              disabled={isDeletingAll}
            >
              {isDeletingAll ? (
                <>
                  <CircularProgress size={24} color="inherit" className="mr-2" />
                  Deleting...
                </>
              ) : (
                'Confirm Delete'
              )}
            </button>
          </div>
        </div>
      </Expand>
    </div>
  );
};

export default Projects;
