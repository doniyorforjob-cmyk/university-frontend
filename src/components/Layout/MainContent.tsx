import React from 'react';
import HeroSection from '../../pages/Home/HeroSection';

const MainContent = () => {
    return (
        <main>
            <HeroSection />
            {/* Boshqa sahifa kontentlari shu yerda davom etadi */}
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-sm">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                    Saytning qolgan qismi
                </h2>
                <p className="text-gray-600 text-center">
                    Bu yerda yangiliklar, e'lonlar, fakultetlar haqida ma'lumot va boshqa bo'limlar joylashadi.
                </p>
            </div>
        </main>
    );
};

export default MainContent;