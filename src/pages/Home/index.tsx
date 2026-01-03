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
        refetch
    } = useHomeSections();

    // Pass sections to builder. Builder handles individual skeletons via DynamicSection.
    // Error handling is handled at the section level via ErrorBoundaries or internally.
    return (
        <div className="home-page">
            <HomeContentBuilder
                sections={sections.length > 0 ? sections : generateDefaultSections()}
                globalLayout="stacked"
            />
        </div>
    );
};

export default HomePage;