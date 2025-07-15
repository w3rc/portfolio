import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Eye, Filter } from 'lucide-react';

const Portfolio = ({ data }) => {
  if (!data || !data.projects) return null;

  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  // Get unique categories
  const categories = ['all', ...new Set(data.projects.map(p => p.category).filter(Boolean))];

  const filteredProjects = filter === 'all' 
    ? data.projects 
    : data.projects.filter(project => project.category === filter);

  const projectCards = filteredProjects.map((project, index) => {
    const projectImage = `images/screenshots/${project.image}`;
    return (
      <motion.div
        key={project.title}
        className="portfolio-card"
        layout
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        whileHover={{ y: -10 }}
        onClick={() => setSelectedProject(project)}
      >
        <div className="portfolio-image-container">
          <img
            alt={project.title}
            src={projectImage}
            className="portfolio-image"
          />
          <div className="portfolio-overlay">
            <div className="portfolio-actions">
              <motion.button
                className="action-btn"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedProject(project);
                }}
              >
                <Eye size={20} />
              </motion.button>
              <motion.a
                href={project.deploy}
                target="_blank"
                rel="noopener noreferrer"
                className="action-btn"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={20} />
              </motion.a>
              <motion.a
                href={project.source}
                target="_blank"
                rel="noopener noreferrer"
                className="action-btn"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
              >
                <Github size={20} />
              </motion.a>
            </div>
          </div>
        </div>
        <div className="portfolio-content">
          <h3 className="portfolio-title">{project.title}</h3>
          <p className="portfolio-description">{project.description}</p>
          {project.technologies && (
            <div className="portfolio-tech">
              {project.technologies.map((tech, idx) => (
                <span key={idx} className="tech-tag">{tech}</span>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    );
  });

  return (
    <section id="portfolio" className="portfolio-section">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="section-title">My Portfolio</h2>
      </motion.div>

      <motion.div
        className="portfolio-grid"
        layout
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <AnimatePresence mode="wait">
          {projectCards}
        </AnimatePresence>
      </motion.div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="portfolio-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="portfolio-modal"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-image">
                <img
                  src={`images/screenshots/${selectedProject.image}`}
                  alt={selectedProject.title}
                />
              </div>
              <div className="modal-content">
                <h3>{selectedProject.title}</h3>
                <p>{selectedProject.description}</p>
                {selectedProject.technologies && (
                  <div className="modal-tech">
                    {selectedProject.technologies.map((tech, idx) => (
                      <span key={idx} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                )}
                <div className="modal-actions">
                  <a
                    href={selectedProject.deploy}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modal-btn primary"
                  >
                    <ExternalLink size={20} />
                    Live Demo
                  </a>
                  <a
                    href={selectedProject.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modal-btn secondary"
                  >
                    <Github size={20} />
                    Source Code
                  </a>
                </div>
              </div>
              <button
                className="modal-close"
                onClick={() => setSelectedProject(null)}
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;
