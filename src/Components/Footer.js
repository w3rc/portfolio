import React from 'react';
import { motion } from 'framer-motion';
import { ChevronUp, Heart, Code, Coffee } from 'lucide-react';

const Footer = ({ data }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialNetworks = data?.social?.map((network) => (
    <motion.li key={network.name}>
      <motion.a
        href={network.url}
        target="_blank"
        rel="noopener noreferrer"
        className="social-link"
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
      >
        <i className={network.className}></i>
        <span className="social-tooltip">{network.name}</span>
      </motion.a>
    </motion.li>
  ));

  return (
    <footer className="footer">
      <div className="footer-content">
        <motion.div
          className="footer-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="footer-title">Let's Connect</h3>
          <p className="footer-description">
            Feel free to reach out for collaborations or just a friendly hello
          </p>
          
          {data?.social && (
            <ul className="social-links">
              {socialNetworks}
            </ul>
          )}
        </motion.div>

        <motion.div
          className="footer-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-links">
            <li><a href="#home" className="footer-link">Home</a></li>
            <li><a href="#about" className="footer-link">About</a></li>
            <li><a href="#resume" className="footer-link">Resume</a></li>
            <li><a href="#portfolio" className="footer-link">Portfolio</a></li>
            <li><a href="#contact" className="footer-link">Contact</a></li>
          </ul>
        </motion.div>

        <motion.div
          className="footer-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="footer-title">Made With</h3>
          <div className="footer-tech">
            <span className="tech-item">
              <Code size={16} />
              React
            </span>
            <span className="tech-item">
              <Heart size={16} />
              Passion
            </span>
            <span className="tech-item">
              <Coffee size={16} />
              Coffee
            </span>
          </div>
        </motion.div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <motion.div
            className="footer-credits"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p>© 2025 Portfolio. All rights reserved.</p>
          </motion.div>

          <motion.button
            className="back-to-top"
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <ChevronUp size={24} />
            <span className="back-to-top-text">Back to Top</span>
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
