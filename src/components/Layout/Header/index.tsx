import React, { useState, useRef, useEffect } from 'react';
import MiddleHeader from './MiddleHeader';
import Navbar from './Navbar';
import TopHeader from './TopHeader';
import useFontSizeStore from '../../../store/fontSizeStore';

const Header = () => {
    const [topHeaderHeight, setTopHeaderHeight] = useState(0);
    const [isNavbarSticky, setIsNavbarSticky] = useState(false);
    const topHeaderRef = useRef<HTMLDivElement>(null);
    const sentinelRef = useRef<HTMLDivElement>(null); // Ref for the observer target
    const fontSize = useFontSizeStore((state) => state.fontSize);

    // Effect for IntersectionObserver to improve scroll performance
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // When the sentinel is not intersecting, the navbar should be sticky.
                setIsNavbarSticky(!entry.isIntersecting);
            },
            {
                root: null, // relative to the viewport
                // Trigger when the sentinel scrolls past the bottom of the TopHeader
                rootMargin: `-${topHeaderHeight}px 0px 0px 0px`,
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
    }, [topHeaderHeight]); // Re-run when TopHeader height changes

    // Effect to calculate TopHeader height
    useEffect(() => {
        const updateHeight = () => {
            if (topHeaderRef.current) {
                setTopHeaderHeight(topHeaderRef.current.offsetHeight);
            }
        };

        updateHeight();
        window.addEventListener('resize', updateHeight);

        const observer = new MutationObserver(updateHeight);
        if (topHeaderRef.current) {
            observer.observe(topHeaderRef.current, {
                attributes: true,
                childList: true,
                subtree: true,
            });
        }

        return () => {
            window.removeEventListener('resize', updateHeight);
            observer.disconnect();
        };
    }, [fontSize]);

    return (
        <>
            <div ref={topHeaderRef} className="sticky top-0 z-40 bg-white shadow-md">
                <TopHeader />
            </div>

            <MiddleHeader />

            {/* Sentinel element for IntersectionObserver */}
            <div ref={sentinelRef} style={{ height: '1px' }}></div>

            <div
                className="sticky z-30 bg-primary shadow-md"
                style={{ top: `${topHeaderHeight}px` }}
            >
                <Navbar isSticky={isNavbarSticky} />
            </div>
        </>
    );
};

export default Header;