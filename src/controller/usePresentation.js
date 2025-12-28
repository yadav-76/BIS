import { useState } from 'react';
import { slidesData } from '../model/model'; // Import the Model

export const usePresentationController = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Logic: Calculate total length
    const totalSlides = slidesData.length;

    // Logic: Go to next slide
    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
    };

    // Logic: Go to previous slide
    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
    };

    // Return the data needed by the View
    return {
        currentSlide: slidesData[currentIndex], // The actual data object
        currentIndex,
        totalSlides,
        nextSlide,
        prevSlide
    };
};