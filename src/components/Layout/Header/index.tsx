import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import MiddleHeader from './MiddleHeader';
import Navbar from './Navbar';
import TopHeader from './TopHeader';
import useFontSizeStore from '../../../store/fontSizeStore';

const Header = () => {
    const [topHeaderHeight, setTopHeaderHeight] = useState(0);
    const [middleHeaderHeight, setMiddleHeaderHeight] = useState(0);
    const [navbarHeight, setNavbarHeight] = useState(0);
    const [isNavbarSticky, setIsNavbarSticky] = useState(false);
    const topHeaderRef = useRef<HTMLDivElement>(null);
    const middleHeaderRef = useRef<HTMLDivElement>(null);
    const navbarRef = useRef<HTMLDivElement>(null);
    const fontSize = useFontSizeStore((state) => state.fontSize);

    // Barcha balandliklarni o'lchash
    useLayoutEffect(() => {
        const measureHeights = () => {
            if (topHeaderRef.current) {
                setTopHeaderHeight(topHeaderRef.current.offsetHeight);
            }
            if (middleHeaderRef.current) {
                setMiddleHeaderHeight(middleHeaderRef.current.offsetHeight);
            }
            if (navbarRef.current) {
                setNavbarHeight(navbarRef.current.offsetHeight);
            }
        };

        measureHeights();

        const timer = setTimeout(measureHeights, 100);
        return () => clearTimeout(timer);
    }, [fontSize]);

    // Scroll detection
    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const currentScrollY = window.scrollY;
                    const stickyPoint = topHeaderHeight + middleHeaderHeight;

                    setIsNavbarSticky(currentScrollY >= stickyPoint);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [topHeaderHeight, middleHeaderHeight]);

    // Resize handler
    useEffect(() => {
        const resizeHandler = () => {
            if (topHeaderRef.current) {
                setTopHeaderHeight(topHeaderRef.current.offsetHeight);
            }
            if (middleHeaderRef.current) {
                setMiddleHeaderHeight(middleHeaderRef.current.offsetHeight);
            }
            if (navbarRef.current) {
                setNavbarHeight(navbarRef.current.offsetHeight);
            }
        };

        window.addEventListener('resize', resizeHandler);
        return () => window.removeEventListener('resize', resizeHandler);
    }, []);

    return (
        <div style={{ position: 'relative' }}>
            {/* TopHeader - oddiy holatda */}
            <div ref={topHeaderRef} className="bg-white shadow-md" style={{ position: 'relative', zIndex: 10 }}>
                <TopHeader />
            </div>

            {/* MiddleHeader - oddiy holatda */}
            <div ref={middleHeaderRef} className="bg-white" style={{ position: 'relative', zIndex: 1 }}>
                <MiddleHeader />
            </div>

            {/* Navbar - sticky bo'ladi */}
            <div
                ref={navbarRef}
                className="bg-primary shadow-md"
                style={{
                    position: isNavbarSticky ? 'fixed' : 'relative',
                    top: 0,
                    left: 0,
                    right: 0,
                    width: '100%',
                    zIndex: 100
                }}
            >
                <Navbar isSticky={isNavbarSticky} />
            </div>

            {/* Navbar sticky bo'lganda content pastga tushmasligi uchun placeholder */}
            {isNavbarSticky && (
                <div style={{ height: `${navbarHeight}px` }} />
            )}
        </div>
    );
};

export default Header;