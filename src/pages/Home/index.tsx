import React from 'react';
import HeroSection from './HeroSection';
import FacultiesSection from './FacultiesSection';
import Stats from '../../components/Home/Stats';
import AnnouncementsSection from './AnnouncementsSection';
import InteractiveServicesSection from './InteractiveServicesSection';
import NewsSection from './NewsSection';

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <Stats />
      <InteractiveServicesSection />
      <NewsSection />
      <FacultiesSection />
      <AnnouncementsSection />
    </>
  );
};

export default HomePage;