import React, { useState, useEffect } from 'react';
import ReactGA from 'react-ga4';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import About from './Components/About';
import Resume from './Components/Resume';
import Contact from './Components/Contact';
import Portfolio from './Components/Portfolio';

function App() {
  const [resumeData, setResumeData] = useState({});

  const getResumeData = async () => {
    try {
      const response = await fetch('/resumeData.json');
      if (!response.ok) {
        throw new Error('Failed to fetch resume data');
      }
      const data = await response.json();
      setResumeData(data);
    } catch (error) {
      console.error('Error fetching resume data:', error);
      alert('Error loading resume data. Please try again later.');
    }
  };

  useEffect(() => {
    getResumeData();
  }, []);

  return (
    <div className="App">
      <Header data={resumeData.main}/>
      <About data={resumeData.main}/>
      <Resume data={resumeData.resume}/>
      <Portfolio data={resumeData.portfolio}/>
      <Contact data={resumeData.main}/>
      <Footer data={resumeData.main}/>
    </div>
  );
}

export default App;
