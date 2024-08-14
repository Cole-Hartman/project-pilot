import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Expand = ({ isOpen, onClose, children }) => {
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Blurred Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
            onClick={handleBackdropClick}
          />

          {/* Centering Container */}
          <div
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            onClick={handleBackdropClick}
          >
            {/* Clear Content */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-blue-900 text-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()} // Prevent clicks on content from closing
            >
              {/* Header with close button */}
              <div className="p-4 flex justify-between items-center border-b border-blue-700">
                <h2 className="text-xl font-bold">Project Details</h2>
                <button
                  className="text-white hover:text-gray-300 text-xl"
                  onClick={onClose}
                >
                  ×
                </button>
              </div>

              {/* Scrollable content */}
              <div className="p-6 overflow-y-auto">
                {children}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Expand;
