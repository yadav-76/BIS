// src/views/IntroView.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const IntroView = ({ onAnimationComplete }) => {
  const [isOpen, setIsOpen] = useState(false);

  // === ANIMATION VARIANTS ===
  
  const buildingVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 1, ease: "easeOut" } }
  };

  const doorLeftVariants = {
    closed: { x: 0 },
    open: { x: -85, transition: { duration: 1.5, ease: "easeInOut" } }
  };
  
  const doorRightVariants = {
    closed: { x: 0 },
    open: { x: 85, transition: { duration: 1.5, ease: "easeInOut" } }
  };

  // The container zooms in ONLY after the doors are clicked
  const containerVariants = {
    normal: { scale: 1, opacity: 1 },
    zoom: { 
        scale: 12, // Huge zoom effect
        opacity: 0, 
        transition: { delay: 1, duration: 1.5, ease: "easeInOut" } 
    }
  };

  // Helper text to tell user what to do
  const hintVariants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: 20 }
  };

  return (
    <motion.div 
        variants={containerVariants}
        initial="normal"
        animate={isOpen ? "zoom" : "normal"}
        onAnimationComplete={() => {
            if(isOpen) onAnimationComplete(); // Only finish if we actually opened the door
        }}
        style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            background: '#0f2027', display: 'flex', flexDirection: 'column', 
            justifyContent: 'center', alignItems: 'center', zIndex: 9999
        }}
    >
      <svg width="600" height="450" viewBox="0 0 600 450" fill="none">
        
        {/* === BUILDING === */}
        <motion.g variants={buildingVariants} initial="hidden" animate="visible">
            {/* Main Structure */}
            <rect x="150" y="100" width="300" height="300" fill="#2c5364" stroke="#4facfe" strokeWidth="2"/>
            
            {/* Windows */}
            <rect x="180" y="130" width="40" height="40" fill="#add8e6" fillOpacity="0.3"/>
            <rect x="380" y="130" width="40" height="40" fill="#add8e6" fillOpacity="0.3"/>
            <rect x="180" y="200" width="40" height="40" fill="#add8e6" fillOpacity="0.3"/>
            <rect x="380" y="200" width="40" height="40" fill="#add8e6" fillOpacity="0.3"/>
            
            {/* Red Cross */}
            <rect x="285" y="40" width="30" height="80" fill="#e74c3c" />
            <rect x="260" y="65" width="80" height="30" fill="#e74c3c" />

            {/* Hospital Name */}
            <text x="300" y="180" textAnchor="middle" fill="white" style={{ fontSize: '20px', fontWeight: 'bold', fontFamily: 'sans-serif', letterSpacing: '2px' }}>
                JSS HOSPITAL
            </text>
        </motion.g>

        {/* === INTERACTIVE DOORS === */}
        {/* We group the doors and add onClick here */}
        <motion.g 
            onClick={() => setIsOpen(true)}
            style={{ cursor: 'pointer' }}
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            whileHover={{ scale: 1.02 }} // Subtle hover effect to show it's clickable
        >
            {/* The bright light inside (revealed when doors open) */}
            <rect x="250" y="250" width="100" height="150" fill="white" />

            {/* Left Door */}
            <motion.rect 
                variants={doorLeftVariants} 
                x="250" y="250" width="50" height="150" fill="#34495e" stroke="black" strokeWidth="1"
            />
            {/* Left Handle */}
            <motion.circle variants={doorLeftVariants} cx="290" cy="325" r="3" fill="#ecf0f1"/>
            
            {/* Right Door */}
            <motion.rect 
                variants={doorRightVariants} 
                x="300" y="250" width="50" height="150" fill="#34495e" stroke="black" strokeWidth="1"
            />
             {/* Right Handle */}
             <motion.circle variants={doorRightVariants} cx="310" cy="325" r="3" fill="#ecf0f1"/>

        </motion.g>
      </svg>

      {/* Hint Text */}
      {!isOpen && (
        <motion.p 
            variants={hintVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.5 }}
            style={{ color: 'rgba(255,255,255,0.5)', marginTop: '-50px', fontSize: '0.9rem' }}
        >
            (Click the doors to enter)
        </motion.p>
      )}

    </motion.div>
  );
};

export default IntroView;