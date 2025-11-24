import React, { useState, useRef, useEffect } from 'react';
import MiddleHeader from './MiddleHeader';
import Navbar from './Navbar';
import TopHeader from './TopHeader';

const Header = () => {
    const [isNavbarSticky, setIsNavbarSticky] = useState(false);
    const sentinelRef = useRef<HTMLDivElement>(null); // Ref for the observer target

    // Effect for IntersectionObserver to improve scroll performance
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsNavbarSticky(!entry.isIntersecting);
            },
            {
                root: null, // relative to the viewport
                rootMargin: `-64px 0px 0px 0px`, // Corresponds to TopHeader height
                threshold: 0,
            }
        );

        const currentSentinel = sentinelRef.current;
        if (currentSentinel) {
            observer.observe(currentSentinel);
        }

        return () => {
            if (currentSentinel) {
                observer.unobserve(currentSentinel);
            }
        };
    }, []);

    return (
        <>
            <div className="sticky top-0 z-40 bg-white shadow-md">
                <TopHeader />
            </div>

            <MiddleHeader />

            {/* Sentinel element for IntersectionObserver */}
            <div ref={sentinelRef} style={{ height: '1px' }}></div>

            <div
                className="sticky z-30 bg-primary shadow-md"
                style={{ top: `64px` }}
            >
                <Navbar isSticky={isNavbarSticky} />
            </div>
        </>
    );
};

export default Header;