import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, MapPin, Award, Code, Star } from 'lucide-react';

const Resume = ({ data }) => {
  if (!data) return null;

  const { skillmessage, education = [], work = [], skills = [] } = data;
  const [skillsAnimated, setSkillsAnimated] = useState(false);
  const skillsRef = useRef(null);
  const isSkillsInView = useInView(skillsRef, { once: true });

  useEffect(() => {
    if (isSkillsInView && !skillsAnimated) {
      setSkillsAnimated(true);
    }
  }, [isSkillsInView, skillsAnimated]);

  const educationItems = education.map((edu, index) => (
    <motion.div
      key={edu.school}
      className="timeline-item"
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div className="timeline-marker">
        <Award className="timeline-icon" />
      </div>
      <div className="timeline-content">
        <h3 className="timeline-title">{edu.school}</h3>
        <div className="timeline-meta">
          <span className="degree">{edu.degree}</span>
          <span className="date">
            <Calendar size={16} />
            {edu.graduated}
          </span>
        </div>
        <p className="timeline-description">{edu.description}</p>
      </div>
    </motion.div>
  ));

  const workItems = work.map((job, index) => (
    <motion.div
      key={job.company}
      className="timeline-item"
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div className="timeline-marker">
        <Code className="timeline-icon" />
      </div>
      <div className="timeline-content">
        <h3 className="timeline-title">{job.company}</h3>
        <div className="timeline-meta">
          <span className="position">{job.title}</span>
          <span className="date">
            <Calendar size={16} />
            {job.years}
          </span>
        </div>
        <p className="timeline-description">{job.description}</p>
      </div>
    </motion.div>
  ));

  const skillItems = skills.map((skill, index) => (
    <motion.div
      key={skill.name}
      className="skill-item"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div className="skill-header">
        <span className="skill-name">{skill.name}</span>
        <span className="skill-level">{skill.level}</span>
      </div>
      <div className="skill-bar">
        <motion.div
          className="skill-progress"
          initial={{ width: 0 }}
          animate={skillsAnimated ? { width: skill.level } : { width: 0 }}
          transition={{ duration: 1, delay: index * 0.1 }}
        />
      </div>
    </motion.div>
  ));

  return (
    <section id="resume" className="resume-section">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="section-title">Experience & Education</h2>
      </motion.div>

      <div className="resume-grid">
        <div className="resume-column">
          <motion.div
            className="resume-section-header"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Award className="section-icon" />
            <h3>Education</h3>
          </motion.div>
          <div className="timeline">
            {educationItems}
          </div>
        </div>

        <div className="resume-column">
          <motion.div
            className="resume-section-header"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Code className="section-icon" />
            <h3>Work Experience</h3>
          </motion.div>
          <div className="timeline">
            {workItems}
          </div>
        </div>
      </div>

      <motion.div
        className="skills-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="resume-section-header">
          <Star className="section-icon" />
          <h3>Skills & Expertise</h3>
        </div>
        <p className="skills-description">{skillmessage}</p>
        <div className="skills-grid" ref={skillsRef}>
          {skillItems}
        </div>
      </motion.div>
    </section>
  );
};

export default Resume;
