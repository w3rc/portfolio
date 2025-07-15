import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';

const Header = ({ data }) => {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const [scrolled, setScrolled] = useState(false);
   const { scrollYProgress } = useScroll();
   const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
   const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

   useEffect(() => {
      const handleScroll = () => {
         setScrolled(window.scrollY > 50);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
   }, []);

   if (!data) return null;

   const { name, occupation, bio, address, social } = data;
   const country = address?.country;
   
   const networks = social?.map((network) => (
      <motion.li 
         key={network.name}
         whileHover={{ scale: 1.1 }}
         whileTap={{ scale: 0.95 }}
      >
         <a 
            target="_blank" 
            rel="noopener noreferrer" 
            href={network.url}
            className="social-link"
            title={network.name}
         >
            <i className={network.className}></i>
         </a>
      </motion.li>
   ));

   const navItems = [
      { name: 'Home', href: '#home' },
      { name: 'About', href: '#about' },
      { name: 'Resume', href: '#resume' },
      { name: 'Portfolio', href: '#portfolio' },
   ];

   const scrollToSection = (href) => {
      const element = document.querySelector(href);
      if (element) {
         element.scrollIntoView({ behavior: 'smooth' });
      }
      setIsMenuOpen(false);
   };

   return (
      <header id="home" className="modern-header">
         {/* Navigation */}
         <motion.nav 
            className={`navbar ${scrolled ? 'scrolled' : ''}`}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
         >
            <div className="container">
               <div className="nav-content">
                  <motion.div 
                     className="logo"
                     whileHover={{ scale: 1.05 }}
                  >
                     <span className="text-gradient font-bold text-xl">
                        {name}
                     </span>
                  </motion.div>

                  {/* Desktop Navigation */}
                  <ul className="nav-links desktop-nav">
                     {navItems.map((item, index) => (
                        <motion.li 
                           key={item.name}
                           initial={{ opacity: 0, y: -20 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: 0.3 + index * 0.1 }}
                        >
                           <a 
                              href={item.href}
                              onClick={(e) => {
                                 e.preventDefault();
                                 scrollToSection(item.href);
                              }}
                              className="nav-link"
                           >
                              {item.name}
                           </a>
                        </motion.li>
                     ))}
                  </ul>

                  {/* Mobile Menu Button */}
                  <motion.button
                     className="mobile-menu-btn"
                     onClick={() => setIsMenuOpen(!isMenuOpen)}
                     whileTap={{ scale: 0.95 }}
                  >
                     {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                  </motion.button>
               </div>
            </div>
         </motion.nav>

         {/* Mobile Navigation */}
         <motion.div
            className={`mobile-nav ${isMenuOpen ? 'open' : ''}`}
            initial={{ opacity: 0, x: '100%' }}
            animate={{ 
               opacity: isMenuOpen ? 1 : 0,
               x: isMenuOpen ? '0%' : '100%'
            }}
            transition={{ duration: 0.3 }}
         >
            <ul className="mobile-nav-links">
               {navItems.map((item, index) => (
                  <motion.li 
                     key={item.name}
                     initial={{ opacity: 0, x: 50 }}
                     animate={{ 
                        opacity: isMenuOpen ? 1 : 0,
                        x: isMenuOpen ? 0 : 50
                     }}
                     transition={{ delay: index * 0.1 }}
                  >
                     <a 
                        href={item.href}
                        onClick={(e) => {
                           e.preventDefault();
                           scrollToSection(item.href);
                        }}
                        className="mobile-nav-link"
                     >
                        {item.name}
                     </a>
                  </motion.li>
               ))}
            </ul>
         </motion.div>

         {/* Hero Section */}
         <motion.div 
            className="hero-section"
            style={{ y, opacity }}
         >
            <div className="container">
               <div className="hero-content">
                  <motion.div
                     className="hero-text"
                     initial={{ opacity: 0, y: 50 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.8, delay: 0.5 }}
                  >
                     <motion.h1 
                        className="hero-title"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                     >
                        Hi, I'm{' '}
                        <span className="text-gradient">{name}</span>
                     </motion.h1>
                     
                     <motion.h2 
                        className="hero-subtitle"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.9 }}
                     >
                        <span className="text-gradient">{occupation}</span>
                     </motion.h2>
                     
                     <motion.p 
                        className="hero-description"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.1 }}
                     >
                        {bio}
                     </motion.p>

                     <motion.div
                        className="hero-actions"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.3 }}
                     >
                        <motion.button
                           className="btn btn-primary"
                           whileHover={{ scale: 1.05 }}
                           whileTap={{ scale: 0.95 }}
                           onClick={() => scrollToSection('#portfolio')}
                        >
                           View My Work
                        </motion.button>
                        <motion.button
                           className="btn btn-secondary"
                           whileHover={{ scale: 1.05 }}
                           whileTap={{ scale: 0.95 }}
                           onClick={() => scrollToSection('#contact')}
                        >
                           Get In Touch
                        </motion.button>
                     </motion.div>

                     {/* Social Links */}
                     <motion.ul 
                        className="social-links"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.5 }}
                     >
                        {networks}
                     </motion.ul>
                  </motion.div>
               </div>
            </div>
         </motion.div>

         {/* Scroll Indicator */}
         <motion.div
            className="scroll-indicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2 }}
         >
            <motion.button
               onClick={() => scrollToSection('#about')}
               className="scroll-btn"
               animate={{
                  y: [0, 10, 0],
               }}
               transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
               }}
            >
               <ChevronDown size={24} />
            </motion.button>
         </motion.div>
      </header>
   );
};

export default Header;
