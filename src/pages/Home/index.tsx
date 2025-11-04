import React from 'react';
import HeroSection from './HeroSection';
import Stats from './Stats';
import FacultiesSection from './FacultiesSection';
import NewsSection from './NewsSection';
import InteractiveServicesSection from './InteractiveServicesSection';

const HomePage = () => {
    return (
        <>
            <HeroSection />
            <InteractiveServicesSection />
            <NewsSection />
            <FacultiesSection />
            <Stats />
        </>
    );
};

export default HomePage;