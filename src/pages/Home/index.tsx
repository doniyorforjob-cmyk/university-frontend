import React from 'react';
import { useGlobalLayout } from '@/components/templates/GlobalLayout';
import HomeContentBuilder from './HomeContentBuilder';
import { useHomeSections } from './hooks';
import { generateDefaultSections } from './HomeSectionTemplate';

const HomePage = () => {
    const { setBannerData, setBreadcrumbsData, setSidebarType, setSidebarExtraContent } = useGlobalLayout();
    // Home sections management hook
    const {
        sections
    } = useHomeSections();

    // Clear global layout state for landing page
    React.useEffect(() => {
        setBannerData(undefined);
        setBreadcrumbsData(undefined);
        setSidebarType(undefined);
        setSidebarExtraContent(undefined);

        return () => {
            // Optional: reset if needed when leaving home
        };
    }, [setBannerData, setBreadcrumbsData, setSidebarType, setSidebarExtraContent]);

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