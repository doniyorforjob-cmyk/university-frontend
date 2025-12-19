import React from 'react';
import HomeContentBuilder from './HomeContentBuilder';
import { useHomeSections } from './hooks';
import { generateDefaultSections, homeSectionTemplates } from './HomeSectionTemplate';
import { SectionSkeleton } from './components/SectionSkeleton';
import ServerError from '@/pages/Errors/ServerError';

const HomePage = () => {
    // Home sections management hook
    const {
        sections,
        loading,
        error,
        refetch
    } = useHomeSections();

    // Fallback to default sections if none loaded
    const displaySections = sections.length > 0 ? sections : generateDefaultSections();

    if (loading) {
        // Ma'lumotlar yuklanayotganda skelet ko'rsatish
        return (
            <div className="home-page-skeleton">
                <SectionSkeleton sectionType="hero" className="min-h-[80vh]" />
                <SectionSkeleton sectionType="stats" />
                <SectionSkeleton sectionType="news" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <ServerError />
            </div>
        );
    }

    return (
        <div className="home-page">
            <HomeContentBuilder
                sections={displaySections}
                globalLayout="stacked"
            />
        </div>
    );
};

export default HomePage;