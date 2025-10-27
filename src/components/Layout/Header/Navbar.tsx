import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useClickOutside from '../../../hooks/useClickOutside';
import { navItems } from './data';
import Container from '../../../components/Container';

interface NavbarProps {
    isSticky: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isSticky }) => {
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [activeSubDropdown, setActiveSubDropdown] = useState<string | null>(null);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(null);
    const [openMobileSubSubmenu, setOpenMobileSubSubmenu] = useState<string | null>(null);
    const [activeMobileLink, setActiveMobileLink] = useState<string | null>(null);
    const navRef = useRef<HTMLDivElement>(null);
    const location = useLocation();

    useEffect(() => {
        setActiveMobileLink(location.pathname);
    }, [location]);

    useClickOutside(navRef, () => {
        setActiveDropdown(null);
        setActiveSubDropdown(null);
        setIsSearchOpen(false);
        setIsMobileMenuOpen(false);
        setOpenMobileSubmenu(null);
        setOpenMobileSubSubmenu(null);
    });

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const toggleMobileSubmenu = (title: string) => {
        setOpenMobileSubmenu(openMobileSubmenu === title ? null : title);
        setOpenMobileSubSubmenu(null); // Close sub-submenu when changing main submenu
    };

    const toggleMobileSubSubmenu = (title: string) => {
        setOpenMobileSubSubmenu(openMobileSubSubmenu === title ? null : title);
    };

    const handleMobileLinkClick = (href: string) => {
        setIsMobileMenuOpen(false);
        setOpenMobileSubmenu(null);
        setOpenMobileSubSubmenu(null);
        setActiveMobileLink(href);
    }

    return (
        <div className="font-sans bg-primary" ref={navRef}>
            {/* Desktop Navbar */}
            <nav className="relative hidden lg:flex justify-center w-full">
                <Container className="flex items-center h-14">
                    <div className="flex h-full items-center justify-between w-full">
                        <div className="flex h-full items-center">
                            {isSticky && (
                                <Link
                                    to="/"
                                    className="flex items-center h-full px-4 text-primary bg-white hover:bg-gray-100 transition-colors duration-300"
                                    title="Bosh sahifa"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                    </svg>
                                </Link>
                            )}
                            {navItems.map((item) => (
                                <div
                                    key={item.title}
                                    className="relative h-full"
                                    onMouseEnter={() => item.children && setActiveDropdown(item.title)}
                                    onMouseLeave={() => item.children && setActiveDropdown(null)}
                                >
                                    <Link
                                        to={item.href || '#'}
                                        className={`flex items-center h-full px-4 text-sm font-medium transition-colors duration-300 cursor-pointer ${
                                            activeDropdown === item.title
                                                ? 'bg-white text-primary'
                                                : 'text-white hover:bg-white hover:text-primary'
                                        }`}
                                    >
                                        <span>{item.title}</span>
                                        {item.children && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 ml-1"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" /></svg>}
                                    </Link>
                                    {item.children && activeDropdown === item.title && (
                                        <div className="absolute top-full left-0 bg-white shadow-lg py-2 w-64 z-20">
                                            {item.children.map((child) => (
                                                <div
                                                    key={child.title}
                                                    className="relative"
                                                    onMouseEnter={() => child.children && setActiveSubDropdown(child.title)}
                                                    onMouseLeave={() => child.children && setActiveSubDropdown(null)}
                                                >
                                                    <Link
                                                        to={child.href || '#'}
                                                        onClick={() => setActiveDropdown(null)}
                                                        className={`flex justify-between items-center px-4 py-2 text-sm text-gray-700 hover:bg-primary hover:text-white transition-colors duration-200 ${
                                                            activeSubDropdown === child.title ? 'bg-primary text-white' : ''
                                                        }`}
                                                    >
                                                        <span>{child.title}</span>
                                                        {child.children && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" /></svg>}
                                                    </Link>
                                                    {child.children && activeSubDropdown === child.title && (
                                                        <div className="absolute top-0 left-full bg-white shadow-lg py-2 w-64 z-30">
                                                            {child.children.map((subChild) => (
                                                                <Link
                                                                    key={subChild.title}
                                                                    to={subChild.href}
                                                                    onClick={() => setActiveDropdown(null)}
                                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary hover:text-white transition-colors duration-200"
                                                                >
                                                                    {subChild.title}
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        {/* Search Icon and Dropdown */}
                        <div className="relative h-full">
                            <button
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                                className="flex items-center h-full px-4 text-sm font-medium text-white hover:bg-white hover:text-primary transition-colors duration-300 cursor-pointer"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                    <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
                                </svg>
                            </button>
                            {isSearchOpen && (
                                <div className="absolute top-full right-0 bg-white shadow-lg p-4 w-80 z-20">
                                    <input
                                        type="text"
                                        placeholder="Qidirish..."
                                        className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </Container>
            </nav>

            {/* Mobile Hamburger Button */}
            <div className="lg:hidden flex justify-between items-center h-14 px-4 sm:px-6 shadow-md">
                <Link to="/" className="text-white font-bold text-xl">
                    NAMDTU
                </Link>
                <button
                    onClick={toggleMobileMenu}
                    className="inline-flex items-center justify-center p-2 rounded-md text-white focus:outline-none"
                >
                    <span className="sr-only">Open main menu</span>
                    <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden bg-white shadow-lg">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navItems.map((item) => (
                            <div key={item.title}>
                                {item.children ? (
                                    <>
                                        <button onClick={() => toggleMobileSubmenu(item.title)} className="w-full flex justify-between items-center text-gray-700 px-3 py-2 rounded-md text-base font-medium">
                                            <span>{item.title}</span>
                                            <svg className={`w-5 h-5 transform transition-transform ${openMobileSubmenu === item.title ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 01.02-1.06z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                        {openMobileSubmenu === item.title && (
                                            <div className="pl-4 mt-2 space-y-1">
                                                {item.children.map((child) => (
                                                    <div key={child.title}>
                                                        {child.children ? (
                                                            <>
                                                                <button onClick={() => toggleMobileSubSubmenu(child.title)} className="w-full flex justify-between items-center text-gray-600 px-3 py-2 rounded-md text-base font-medium">
                                                                    <span>{child.title}</span>
                                                                    <svg className={`w-5 h-5 transform transition-transform ${openMobileSubSubmenu === child.title ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                                    </svg>
                                                                </button>
                                                                {openMobileSubSubmenu === child.title && (
                                                                    <div className="pl-4 mt-2 space-y-1">
                                                                        {child.children.map((subChild) => (
                                                                            <Link
                                                                                key={subChild.title}
                                                                                to={subChild.href}
                                                                                onClick={() => handleMobileLinkClick(subChild.href)}
                                                                                className={`block px-3 py-2 rounded-md text-base font-medium ${
                                                                                    activeMobileLink === subChild.href ? 'bg-primary text-white' : 'text-gray-500'
                                                                                }`}
                                                                            >
                                                                                {subChild.title}
                                                                            </Link>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                            </>
                                                        ) : (
                                                            <Link
                                                                key={child.title}
                                                                to={child.href}
                                                                onClick={() => handleMobileLinkClick(child.href)}
                                                                className={`block px-3 py-2 rounded-md text-base font-medium ${
                                                                    activeMobileLink === child.href ? 'bg-primary text-white' : 'text-gray-600'
                                                                }`}
                                                            >
                                                                {child.title}
                                                            </Link>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <Link
                                        to={item.href || '#'}
                                        onClick={() => handleMobileLinkClick(item.href || '#')}
                                        className={`block px-3 py-2 rounded-md text-base font-medium ${
                                            activeMobileLink === (item.href || '#') ? 'bg-primary text-white' : 'text-gray-700'
                                        }`}
                                    >
                                        {item.title}
                                    </Link>
                                )}
                            </div>
                        ))}
                        <div className="px-3 py-2">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Qidirish..."
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gray-400">
                                        <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;