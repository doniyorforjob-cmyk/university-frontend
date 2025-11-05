import React from 'react';
import HeroSection from './HeroSection';
import Stats from './Stats';
import FacultiesSection from './FacultiesSection';
import NewsSection from './NewsSection';
import InteractiveServicesSection from './InteractiveServicesSection';
import VideoGallerySection from './VideoGallerySection';


const HomePage = () => {
    return (
        <>
            <HeroSection />
            <InteractiveServicesSection />
            <NewsSection />
            <FacultiesSection />
            <Stats />
            <VideoGallerySection />
        </>
    );
};

export default HomePage;