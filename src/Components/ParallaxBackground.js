import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ParallaxBackground = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);

  // Create floating particles
  const createParticles = () => {
    const particles = [];
    for (let i = 0; i < 50; i++) {
      particles.push(
        <motion.div
          key={i}
          className="particle"
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 100,
            opacity: 0,
          }}
          animate={{
            y: -100,
            opacity: [0, 1, 0],
            x: Math.random() * window.innerWidth,
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear",
          }}
          style={{
            position: 'absolute',
            width: '2px',
            height: '2px',
            background: 'rgba(102, 126, 234, 0.8)',
            borderRadius: '50%',
            pointerEvents: 'none',
          }}
        />
      );
    }
    return particles;
  };

  return (
    <>
      {/* Main parallax background */}
      <motion.div
        ref={ref}
        className="parallax-bg"
        style={{
          y,
          opacity,
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #0a0a0a 0%, #111111 50%, #1a1a1a 100%)',
          zIndex: -1,
        }}
      >
        {/* Animated gradient background */}
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: `
              radial-gradient(circle at 20% 50%, rgba(102, 126, 234, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(118, 75, 162, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(102, 126, 234, 0.1) 0%, transparent 50%)
            `,
          }}
          animate={{
            background: [
              `
                radial-gradient(circle at 20% 50%, rgba(102, 126, 234, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(118, 75, 162, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 40% 80%, rgba(102, 126, 234, 0.1) 0%, transparent 50%)
              `,
              `
                radial-gradient(circle at 80% 30%, rgba(102, 126, 234, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 20% 70%, rgba(118, 75, 162, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 60% 20%, rgba(102, 126, 234, 0.1) 0%, transparent 50%)
              `,
              `
                radial-gradient(circle at 40% 70%, rgba(102, 126, 234, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 60% 30%, rgba(118, 75, 162, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 20% 60%, rgba(102, 126, 234, 0.1) 0%, transparent 50%)
              `,
            ],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
      </motion.div>

      {/* Floating particles */}
      <div className="particles">
        {createParticles()}
      </div>

      {/* Geometric shapes */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, pointerEvents: 'none' }}>
        <motion.div
          style={{
            position: 'absolute',
            top: '10%',
            left: '10%',
            width: '100px',
            height: '100px',
            background: 'rgba(102, 126, 234, 0.05)',
            borderRadius: '50%',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(102, 126, 234, 0.1)',
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        <motion.div
          style={{
            position: 'absolute',
            top: '60%',
            right: '15%',
            width: '80px',
            height: '80px',
            background: 'rgba(118, 75, 162, 0.05)',
            borderRadius: '20%',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(118, 75, 162, 0.1)',
          }}
          animate={{
            y: [0, 30, 0],
            rotate: [0, -360],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        <motion.div
          style={{
            position: 'absolute',
            bottom: '20%',
            left: '20%',
            width: '60px',
            height: '60px',
            background: 'rgba(102, 126, 234, 0.05)',
            borderRadius: '30%',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(102, 126, 234, 0.1)',
          }}
          animate={{
            y: [0, -40, 0],
            rotate: [0, 180],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    </>
  );
};

export default ParallaxBackground;
