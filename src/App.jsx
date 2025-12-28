// src/App.jsx
import React, { useState, useEffect } from 'react';
import SlideView from './view/SlideView';
import IntroView from './view/IntroView';
import { usePresentationController } from './controller/usePresentation';
import { AnimatePresence } from 'framer-motion';
import './App.css';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  
  // Get Controller Functions
  const { currentSlide, nextSlide, prevSlide, currentIndex, totalSlides } = usePresentationController();

  const handleIntroFinish = () => {
    setShowIntro(false);
  };

  // === 1. KEYBOARD NAVIGATION (NEW) ===
  useEffect(() => {
    const handleKeyDown = (e) => {
      // If intro is still running, ignore keys
      if (showIntro) return;

      // Down or Right Arrow -> Next Slide
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        nextSlide();
      }
      
      // Up or Left Arrow -> Previous Slide
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    // Cleanup
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showIntro, nextSlide, prevSlide]);


  // === 2. MOUSE SCROLL NAVIGATION (EXISTING) ===
  useEffect(() => {
    let lastScrollTime = 0;
    const scrollCooldown = 1200; 

    const handleScroll = (event) => {
      if (showIntro) return;

      const now = new Date().getTime();
      if (now - lastScrollTime < scrollCooldown) return;

      if (event.deltaY > 0) {
        nextSlide();
        lastScrollTime = now;
      } else if (event.deltaY < 0) {
        prevSlide();
        lastScrollTime = now;
      }
    };

    window.addEventListener('wheel', handleScroll);
    return () => window.removeEventListener('wheel', handleScroll);
  }, [showIntro, nextSlide, prevSlide]);


  // === VIEW RENDER ===
  // src/App.jsx
// ... keep imports and logic the same ...

  return (
    // REMOVED style={{ backgroundColor... }} 
    <div className="app-container">
      
      {/* === NEW BACKGROUND LAYER === */}
      <div className="background-wrapper">
        <div className="tech-grid"></div>
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      <AnimatePresence mode='wait'>
        {showIntro ? (
          <IntroView key="intro" onAnimationComplete={handleIntroFinish} />
        ) : (
          <>
            <div className="viewport">
                <SlideView data={currentSlide} />
            </div>

            <div className="controls-minimal">
                <div className="scroll-hint">
                    <span className="mouse-icon"></span>
                    <span className="text">Scroll or Use Keys</span>
                </div>
                <span className="page-indicator">
                    {currentIndex + 1} / {totalSlides}
                </span>
            </div>
          </>
        )}
      </AnimatePresence>
      
    </div>
  );
}

export default App;