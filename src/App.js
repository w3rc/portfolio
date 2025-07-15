import React, { useState, useEffect } from 'react';
import ReactGA from 'react-ga4';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import About from './Components/About';
import Resume from './Components/Resume';
import Portfolio from './Components/Portfolio';
import ParallaxBackground from './Components/ParallaxBackground';
import LoadingSpinner from './Components/LoadingSpinner';

function App() {
  const [resumeData, setResumeData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getResumeData = async () => {
    try {
      setIsLoading(true);
      // Add cache-busting parameter to prevent caching
      const timestamp = new Date().getTime();
      const response = await fetch(`/resumeData.json?v=${timestamp}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch resume data');
      }
      const data = await response.json();
      setResumeData(data);
    } catch (error) {
      console.error('Error fetching resume data:', error);
      alert('Error loading resume data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getResumeData();
    
    // Initialize Google Analytics
    if (process.env.NODE_ENV === 'production') {
      ReactGA.initialize('YOUR_GA_TRACKING_ID');
      ReactGA.send('pageview');
    }

    // Add keyboard shortcut for development: Ctrl+R to refresh data
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.key === 'r' && process.env.NODE_ENV === 'development') {
        e.preventDefault();
        console.log('Refreshing resume data...');
        getResumeData();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="App">
      <ParallaxBackground />
      
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingSpinner key="loading" />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Header data={resumeData.main} />
            <About data={resumeData.main} />
            <Resume data={resumeData.resume} />
            <Portfolio data={resumeData.portfolio} />
            <Footer data={resumeData.main} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
