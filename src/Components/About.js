import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Download, Mail, Phone, MapPin, User } from 'lucide-react';

const About = ({ data }) => {
   const [ref, inView] = useInView({
      triggerOnce: true,
      threshold: 0.1
   });

   if (!data) return null;

   const {
      name,
      image,
      bio,
      phone,
      email,
      resumedownload
   } = data;

   const profilepic = `images/${image}`;

   const containerVariants = {
      hidden: { opacity: 0, y: 50 },
      visible: {
         opacity: 1,
         y: 0,
         transition: {
            duration: 0.8,
            staggerChildren: 0.2
         }
      }
   };

   const itemVariants = {
      hidden: { opacity: 0, y: 30 },
      visible: {
         opacity: 1,
         y: 0,
         transition: { duration: 0.6 }
      }
   };

   const contactItems = [
      { icon: User, label: 'Name', value: name },
      { icon: Phone, label: 'Phone', value: phone },
      { icon: Mail, label: 'Email', value: email }
   ];

   return (
      <section id="about" className="section about-section">
         <div className="container">
            <motion.div
               ref={ref}
               initial="hidden"
               animate={inView ? "visible" : "hidden"}
               variants={containerVariants}
            >
               <motion.h2 
                  className="section-title"
                  variants={itemVariants}
               >
                  About Me
               </motion.h2>

               <div className="about-content">
                  <motion.div 
                     className="about-image"
                     variants={itemVariants}
                  >
                     <div className="image-container">
                        <motion.img 
                           src={profilepic} 
                           alt="Profile" 
                           className="profile-image"
                           whileHover={{ scale: 1.05 }}
                           transition={{ duration: 0.3 }}
                        />
                        <div className="image-overlay"></div>
                     </div>
                  </motion.div>

                  <motion.div 
                     className="about-info"
                     variants={itemVariants}
                  >
                     <div className="bio-section">
                        <motion.p 
                           className="bio-text"
                           variants={itemVariants}
                        >
                           {bio}
                        </motion.p>
                     </div>

                     <div className="contact-grid">
                        {contactItems.map((item, index) => (
                           <motion.div 
                              key={index}
                              className="contact-item"
                              variants={itemVariants}
                              whileHover={{ y: -5 }}
                           >
                              <div className="contact-icon">
                                 <item.icon size={20} />
                              </div>
                              <div className="contact-content">
                                 <span className="contact-label">{item.label}</span>
                                 <span className="contact-value">{item.value}</span>
                              </div>
                           </motion.div>
                        ))}
                     </div>

                     <motion.div 
                        className="action-buttons"
                        variants={itemVariants}
                     >
                        <motion.a
                           href={resumedownload}
                           target='_blank'
                           rel="noopener noreferrer"
                           className="btn btn-primary"
                           whileHover={{ scale: 1.05 }}
                           whileTap={{ scale: 0.95 }}
                        >
                           <Download size={20} />
                           Download Resume
                        </motion.a>
                        
                        <motion.a
                           href={`mailto:${email}`}
                           className="btn btn-secondary"
                           whileHover={{ scale: 1.05 }}
                           whileTap={{ scale: 0.95 }}
                        >
                           <Mail size={20} />
                           Send Email
                        </motion.a>
                     </motion.div>
                  </motion.div>
               </div>
            </motion.div>
         </div>
      </section>
   );
};

export default About;
