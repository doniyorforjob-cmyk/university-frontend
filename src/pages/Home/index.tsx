import React from 'react';
import HomeContentBuilder from './HomeContentBuilder';
import { useHomeSections } from './hooks';
import { generateDefaultSections } from './HomeSectionTemplate';

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
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center text-red-600">
                    <h2 className="text-2xl font-bold mb-4">Xatolik yuz berdi</h2>
                    <p>{error?.message || 'Noma\'lum xatolik'}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                    >
                        Qayta yuklash
                    </button>
                </div>
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