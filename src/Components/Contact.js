import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Phone, Mail, MessageCircle, User, Calendar } from 'lucide-react';

const Contact = ({ data }) => {
   const [formData, setFormData] = useState({
      name: '',
      email: '',
      subject: '',
      message: ''
   });
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [submitStatus, setSubmitStatus] = useState(null);

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
         ...prev,
         [name]: value
      }));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      setSubmitStatus(null);

      try {
         // Create mailto link
         const mailtoLink = `mailto:${data?.email || 'rupayanc16@gmail.com'}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
            `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
         )}`;
         
         window.open(mailtoLink);
         setSubmitStatus('success');
         
         // Reset form
         setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
         });
      } catch (error) {
         setSubmitStatus('error');
      } finally {
         setIsSubmitting(false);
      }
   };

   const contactInfo = [
      {
         icon: <MapPin size={24} />,
         title: 'Address',
         info: data?.address ? (
            <>
               {data.address.street}<br />
               {data.address.city}, {data.address.state} {data.address.zip}
            </>
         ) : 'Address not provided'
      },
      {
         icon: <Phone size={24} />,
         title: 'Phone',
         info: data?.phone || 'Phone not provided'
      },
      {
         icon: <Mail size={24} />,
         title: 'Email',
         info: data?.email || 'rupayanc16@gmail.com'
      }
   ];

   return (
      <section id="contact" className="contact-section">
         <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
         >
            <h2 className="section-title">Get In Touch</h2>
            <p className="section-subtitle">
               {data?.message || "Let's discuss your project and bring your ideas to life"}
            </p>
         </motion.div>

         <div className="contact-grid">
            <motion.div
               className="contact-form-container"
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
            >
               <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                     <div className="input-group">
                        <User className="input-icon" size={20} />
                        <input
                           type="text"
                           name="name"
                           value={formData.name}
                           onChange={handleInputChange}
                           placeholder="Your Name"
                           required
                           className="form-input"
                        />
                     </div>
                  </div>

                  <div className="form-group">
                     <div className="input-group">
                        <Mail className="input-icon" size={20} />
                        <input
                           type="email"
                           name="email"
                           value={formData.email}
                           onChange={handleInputChange}
                           placeholder="Your Email"
                           required
                           className="form-input"
                        />
                     </div>
                  </div>

                  <div className="form-group">
                     <div className="input-group">
                        <MessageCircle className="input-icon" size={20} />
                        <input
                           type="text"
                           name="subject"
                           value={formData.subject}
                           onChange={handleInputChange}
                           placeholder="Subject"
                           required
                           className="form-input"
                        />
                     </div>
                  </div>

                  <div className="form-group">
                     <div className="input-group">
                        <textarea
                           name="message"
                           value={formData.message}
                           onChange={handleInputChange}
                           placeholder="Your Message"
                           required
                           rows="6"
                           className="form-textarea"
                        />
                     </div>
                  </div>

                  <motion.button
                     type="submit"
                     className="submit-btn"
                     disabled={isSubmitting}
                     whileHover={{ scale: 1.02 }}
                     whileTap={{ scale: 0.98 }}
                  >
                     {isSubmitting ? (
                        <>
                           <div className="spinner" />
                           Sending...
                        </>
                     ) : (
                        <>
                           <Send size={20} />
                           Send Message
                        </>
                     )}
                  </motion.button>

                  {submitStatus === 'success' && (
                     <motion.div
                        className="form-message success"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                     >
                        Message sent successfully!
                     </motion.div>
                  )}

                  {submitStatus === 'error' && (
                     <motion.div
                        className="form-message error"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                     >
                        Something went wrong. Please try again.
                     </motion.div>
                  )}
               </form>
            </motion.div>

            <motion.div
               className="contact-info"
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
            >
               <div className="contact-info-header">
                  <h3>Contact Information</h3>
                  <p>Feel free to reach out through any of these channels</p>
               </div>

               <div className="contact-info-items">
                  {contactInfo.map((item, index) => (
                     <motion.div
                        key={index}
                        className="contact-info-item"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                     >
                        <div className="contact-info-icon">
                           {item.icon}
                        </div>
                        <div className="contact-info-content">
                           <h4>{item.title}</h4>
                           <p>{item.info}</p>
                        </div>
                     </motion.div>
                  ))}
               </div>

               <motion.div
                  className="contact-cta"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  viewport={{ once: true }}
               >
                  <h4>Ready to Start a Project?</h4>
                  <p>I'm available for freelance work and exciting opportunities</p>
                  <motion.a
                     href={`mailto:${data?.email || 'rupayanc16@gmail.com'}`}
                     className="cta-btn"
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                  >
                     <Calendar size={20} />
                     Schedule a Call
                  </motion.a>
               </motion.div>
            </motion.div>
         </div>
      </section>
   );
};

export default Contact;
