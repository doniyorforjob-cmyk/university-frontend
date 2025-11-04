import React, { useState, useEffect, useRef, JSX } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useClickOutside from '../../../hooks/useClickOutside';
import { fetchNavItems, NavItem } from '../../../api/navbarApi';
import Container from '../../shared/Container';
import { ChevronDownIcon, ChevronRightIcon, BuildingLibraryIcon, NewspaperIcon, AcademicCapIcon, CogIcon, UserGroupIcon, GlobeAltIcon, BeakerIcon, BookOpenIcon, ComputerDesktopIcon, WrenchScrewdriverIcon } from "@heroicons/react/24/solid";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

interface NavbarProps {
    isSticky: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isSticky }) => {
    const [navItems, setNavItems] = useState<NavItem[]>([]);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(null);
    const navRef = useRef<HTMLDivElement>(null);
    const location = useLocation();

    useEffect(() => {
        const loadNavItems = async () => {
            const items = await fetchNavItems();
            setNavItems(items);
        };
        loadNavItems();
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
        setOpenMobileSubmenu(null);
    }, [location]);

    useClickOutside(navRef, () => {
        setActiveDropdown(null);
        setIsMobileMenuOpen(false);
        setOpenMobileSubmenu(null);
    });

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const toggleMobileSubmenu = (title: string) => {
        setOpenMobileSubmenu(openMobileSubmenu === title ? null : title);
    };

    // NAVBAR PUNKTLARI UCHUN BATAFSIL TAVSIF
    const getSectionDescription = (title: string): string => {
        const descriptions: Record<string, string> = {
            "Axborot xizmati": "Universitet yangiliklari, e'lonlar, press-relizlar va ommaviy axborot vositalari bilan hamkorlikni ta'minlovchi bo'lim. Bu yerda universitetdagi barcha voqealar haqida batafsil ma'lumot topishingiz mumkin.",
            "Universitet": "Universitetning to'liq tarixi, rahbariyat tarkibi, strategik maqsad va vazifalari, shuningdek, rivojlanish rejalari haqida batafsil ma'lumot. Universitetning missiyasi va vizyoni shu yerda.",
            "Tuzilma": "Universitetning to'liq tashkiliy tuzilmasi: rahbariyat, fakultetlar, kafedralar, bo'limlar va markazlar. Har bir bo'limning vazifalari va mas'ul shaxslar haqida batafsil.",
            "Talabalar": "Talabalar hayoti, qabul jarayoni, stipendiya dasturlari, yotoqxona va talaba tashkilotlari haqida batafsil ma'lumot. Talabalar uchun qo'llanmalar va resurslar.",
            "Xalqaro aloqalar": "Xalqaro hamkorlik aloqalari, almashinuv dasturlari, grantlar va xalqaro loyihalar haqida batafsil. Chet el universitetlari bilan hamkorlik.",
            "Ilmiy faoliyat": "Ilmiy loyihalar, konferensiyalar, ilmiy nashrlar va innovatsiyalar haqida batafsil ma'lumot. Ilmiy markazlar va laboratoriyalar.",
            "Kutubxona": "Elektron va an'anaviy kutubxona xizmatlari, ilmiy adabiyotlar, maqolalar va resurslar haqida batafsil. Onlayn katalog va qidiruv tizimi.",
            "Masofaviy ta'lim": "Onlayn kurslar, masofaviy o'qitish platformalari, videodarslar va resurslar haqida batafsil ma'lumot. Masofaviy ta'lim tizimi."
        };
        return descriptions[title] || "Ushbu bo'lim haqida batafsil ma'lumot";
    };

    // HAR BIR BO'LIM UCHUN IKONKA
    const getSectionIcon = (title: string): JSX.Element => {
        return <BuildingLibraryIcon className="h-8 w-8" />;
    };

    return (
        <div className="font-sans bg-primary" ref={navRef}>
            {/* ==== DESKTOP NAVBAR ==== */}
            <nav className="relative hidden lg:flex justify-center w-full">
                <Container className="flex items-center h-16">
                    <div className="flex h-full items-center justify-between w-full">
                        <div className="flex h-full items-center">
                            {isSticky && (
                                <Link
                                    to="/"
                                    className="flex items-center h-full px-4 text-[#0E104B] bg-white hover:bg-gray-100 transition-colors duration-300"
                                    title="Bosh sahifa"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                    </svg>
                                </Link>
                            )}

                            {navItems.map((item) => {
                                const hasCategories = item.children && item.children.some(child => child.children && child.children.length > 0);

                                return (
                                    <div
                                        key={item.title}
                                        className="group h-full"
                                        onMouseEnter={() => item.children && setActiveDropdown(item.title)}
                                        onMouseLeave={() => item.children && setActiveDropdown(null)}
                                    >
                                        <Link
                                            to={item.href || '#'}
                                            className={`flex items-center h-full px-4 text-base font-bold transition-colors duration-300 cursor-pointer ${
                                                activeDropdown === item.title
                                                    ? 'bg-white text-[#0E104B]'
                                                    : 'text-white hover:bg-white hover:text-[#0E104B]'
                                            }`}
                                        >
                                            <span>{item.title}</span>
                                            {item.children && <ChevronDownIcon className="w-5 h-5 ml-1" />}
                                        </Link>

                                        {/* ==== DROPDOWN ==== */}
                                        {item.children && (
                                            <div className="absolute top-full left-0 right-0 z-20 hidden group-hover:flex justify-center mt-px pointer-events-none transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                                                <div className="pointer-events-auto w-full max-w-6xl px-11">
                                                    <div className="bg-white shadow-lg border-t border-gray-200 rounded-b-lg overflow-hidden">
                                                        <div className="flex">
                                                            {/* LEFT PANEL – IKONKA + SARLAVHA + TAVSIF (PASTROQ) */}
                                                            <div className="w-1/3 p-8 bg-white border-r border-gray-100">
                                                                <div className="flex items-start gap-3">
                                                                    {/* Ikonka */}
                                                                    <div className="flex items-center justify-center h-14 w-14 rounded-md bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-md border border-blue-200 transition-all group-hover:shadow-lg group-hover:scale-105 flex-shrink-0">
                                                                        <BuildingLibraryIcon className="h-8 w-8 text-white" />
                                                                    </div>
                                                                    <div className="flex-1">
                                                                        {/* Sarlavha */}
                                                                        <h2 className="text-2xl font-bold text-[#0E104B] mb-2">
                                                                            {item.title}
                                                                        </h2>
                                                                    </div>
                                                                </div>
                                                                {/* TAVSIF – IKONKA PASTIDAN */}
                                                                <p className="text-sm text-gray-600 leading-relaxed max-w-xs mt-6">
                                                                    {getSectionDescription(item.title)}
                                                                </p>
                                                            </div>

                                                            {/* RIGHT PANEL – ICHKI LINKLAR */}
                                                            <div className="w-2/3 p-8">
                                                                {/* TUZLMA – MAXSUS TUZLMA, IKKI QATORDA */}
                                                                {item.title === "Tuzilma" ? (
                                                                    <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                                                                        {/* RAHBARIYAT */}
                                                                        <div>
                                                                            <h3 className="text-lg font-semibold text-[#0E104B] mb-3 pb-1 border-b-2 border-primary inline-block">
                                                                                Rahbariyat
                                                                            </h3>
                                                                            <ul className="space-y-2 ml-4">
                                                                                <li className="flex items-center">
                                                                                    <ChevronRightIcon className="w-4 h-4 mr-2 text-[#0E104B] opacity-70 flex-shrink-0 group-hover:translate-x-1 transition-transform duration-200" />
                                                                                    <Link to="/rahbariyat/rektor" onClick={() => setActiveDropdown(null)} className="text-lg text-black hover:text-[#0E104B] hover:bg-gray-200 transition-all duration-200 border-b border-gray-100 pb-1 w-full block px-2 py-1">
                                                                                        Rektor
                                                                                    </Link>
                                                                                </li>
                                                                                <li className="flex items-center">
                                                                                    <ChevronRightIcon className="w-4 h-4 mr-2 text-[#0E104B] opacity-70 flex-shrink-0 group-hover:translate-x-1 transition-transform duration-200" />
                                                                                    <Link to="/rahbariyat/prorektorlar" onClick={() => setActiveDropdown(null)} className="text-lg text-black hover:text-[#0E104B] hover:bg-gray-200 transition-all duration-200 border-b border-gray-100 pb-1 w-full block px-2 py-1">
                                                                                        Prorektorlar
                                                                                    </Link>
                                                                                </li>
                                                                            </ul>
                                                                        </div>

                                                                        {/* FAKULTETLAR – ICHKI LINK YO'Q, HOZIRGI ICHKI KABI */}
                                                                        <div>
                                                                            <h3 className="text-lg font-semibold text-[#0E104B] mb-3 pb-1 border-b-2 border-primary inline-block">
                                                                                Fakultetlar
                                                                            </h3>
                                                                            <ul className="space-y-2 ml-4">
                                                                                <li className="flex items-center">
                                                                                    <ChevronRightIcon className="w-4 h-4 mr-2 text-[#0E104B] opacity-70 flex-shrink-0 group-hover:translate-x-1 transition-transform duration-200" />
                                                                                    <Link to="/fakultetlar/informatika" onClick={() => setActiveDropdown(null)} className="text-lg text-black hover:text-[#0E104B] hover:bg-gray-200 transition-all duration-200 border-b border-gray-100 pb-1 w-full block px-2 py-1">
                                                                                        Informatika fakulteti
                                                                                    </Link>
                                                                                </li>
                                                                                <li className="flex items-center">
                                                                                    <ChevronRightIcon className="w-4 h-4 mr-2 text-[#0E104B] opacity-70 flex-shrink-0 group-hover:translate-x-1 transition-transform duration-200" />
                                                                                    <Link to="/fakultetlar/multimedia" onClick={() => setActiveDropdown(null)} className="text-lg text-black hover:text-[#0E104B] hover:bg-gray-200 transition-all duration-200 border-b border-gray-100 pb-1 w-full block px-2 py-1">
                                                                                        Multimedia texnologiyalari fakulteti
                                                                                    </Link>
                                                                                </li>
                                                                                {/* Qo'shimcha fakultetlar qo'shishingiz mumkin */}
                                                                            </ul>
                                                                        </div>

                                                                        {/* KAFEDRALAR – ICHKI LINK YO'Q, HOZIRGI ICHKI KABI */}
                                                                        <div>
                                                                            <h3 className="text-lg font-semibold text-[#0E104B] mb-3 pb-1 border-b-2 border-primary inline-block">
                                                                                Kafedralar
                                                                            </h3>
                                                                            <ul className="space-y-2 ml-4">
                                                                                <li className="flex items-center">
                                                                                    <ChevronRightIcon className="w-4 h-4 mr-2 text-[#0E104B] opacity-70 flex-shrink-0 group-hover:translate-x-1 transition-transform duration-200" />
                                                                                    <Link to="/kafedralar/matematika" onClick={() => setActiveDropdown(null)} className="text-lg text-black hover:text-[#0E104B] hover:bg-gray-200 transition-all duration-200 border-b border-gray-100 pb-1 w-full block px-2 py-1">
                                                                                        Matematika kafedrasi
                                                                                    </Link>
                                                                                </li>
                                                                                <li className="flex items-center">
                                                                                    <ChevronRightIcon className="w-4 h-4 mr-2 text-[#0E104B] opacity-70 flex-shrink-0 group-hover:translate-x-1 transition-transform duration-200" />
                                                                                    <Link to="/kafedralar/programmalash" onClick={() => setActiveDropdown(null)} className="text-lg text-black hover:text-[#0E104B] hover:bg-gray-200 transition-all duration-200 border-b border-gray-100 pb-1 w-full block px-2 py-1">
                                                                                        Dasturlash kafedrasi
                                                                                    </Link>
                                                                                </li>
                                                                                {/* Qo'shimcha kafedralar qo'shishingiz mumkin */}
                                                                            </ul>
                                                                        </div>

                                                                        {/* BO'LIMLAR – O'ZGARMADI, "Raqamli..." QO'SHILDI */}
                                                                        <div>
                                                                            <h3 className="text-lg font-semibold text-[#0E104B] mb-3 pb-1 border-b-2 border-primary inline-block">
                                                                                Bo&apos;limlar
                                                                            </h3>
                                                                            <ul className="space-y-2 ml-4">
                                                                                <li className="flex items-center">
                                                                                    <ChevronRightIcon className="w-4 h-4 mr-2 text-[#0E104B] opacity-70 flex-shrink-0 group-hover:translate-x-1 transition-transform duration-200" />
                                                                                    <Link to="/tuzilma/bolimlar/marketing" onClick={() => setActiveDropdown(null)} className="text-lg text-black hover:text-[#0E104B] hover:bg-gray-200 transition-all duration-200 border-b border-gray-100 pb-1 w-full block px-2 py-1">
                                                                                        Marketing bo&apos;limi
                                                                                    </Link>
                                                                                </li>
                                                                                <li className="flex items-center">
                                                                                    <ChevronRightIcon className="w-4 h-4 mr-2 text-[#0E104B] opacity-70 flex-shrink-0 group-hover:translate-x-1 transition-transform duration-200" />
                                                                                    <Link to="/tuzilma/bolimlar/raqamli-texnologiyalar" onClick={() => setActiveDropdown(null)} className="text-lg text-black hover:text-[#0E104B] hover:bg-gray-200 transition-all duration-200 border-b border-gray-100 pb-1 w-full block px-2 py-1">
                                                                                        Raqamli texnologiyalarni rivojlantirish
                                                                                    </Link>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                ) : hasCategories ? (
                                                                    <div className="grid grid-cols-2 gap-x-8">
                                                                        {item.children!.map((category: NavItem) => (
                                                                            <div key={category.title} className="flex flex-col">
                                                                                <Link
                                                                                    to={category.href || '#'}
                                                                                    onClick={() => setActiveDropdown(null)}
                                                                                    className="text-lg font-semibold text-[#0E104B] mb-3 pb-1 border-b-2 border-primary inline-block hover:text-indigo-700 transition-colors"
                                                                                >
                                                                                    {category.title}
                                                                                </Link>

                                                                                {category.children && (
                                                                                    <ul className="space-y-2 mt-2">
                                                                                        {category.children.map((link: NavItem) => (
                                                                                            <li key={link.title}>
                                                                                                <div className="flex items-center group border-b border-gray-100 pb-1">
                                                                                                    <ChevronRightIcon className="w-4 h-4 mr-2 text-[#0E104B] opacity-70 flex-shrink-0 group-hover:translate-x-1 transition-transform duration-200" />
                                    <Link
                                        to={link.href!}
                                        onClick={() => setActiveDropdown(null)}
                                        className="text-lg text-black hover:text-[#0E104B] hover:bg-gray-200 transition-all duration-200 block w-full px-2 py-1"
                                    >
                                        {link.title}
                                    </Link>
                                                                                                </div>
                                                                                            </li>
                                                                                        ))}
                                                                                    </ul>
                                                                                )}
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                ) : (
                                                                    <ul className="space-y-2 columns-2">
                                                                        {item.children!.map((link: NavItem) => (
                                                                            <li key={link.title} className="break-inside-avoid mb-2">
                                                                                <div className="flex items-center group border-b border-gray-100 pb-1">
                                                                                    <ChevronRightIcon className="w-4 h-4 mr-2 text-[#0E104B] opacity-70 flex-shrink-0 group-hover:translate-x-1 transition-transform duration-200" />
                    <Link
                        to={link.href!}
                        onClick={() => setActiveDropdown(null)}
                        className="text-lg text-black hover:text-[#0E104B] hover:bg-gray-200 transition-all duration-200 block w-full px-2 py-1"
                    >
                        {link.title}
                    </Link>
                                                                                </div>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* SEARCH ICON */}
                        <div className="relative h-full">
                            <button className="flex items-center h-full px-4 text-base font-medium text-white hover:bg-white hover:text-[#0E104B] transition-colors duration-300 cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                    <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </Container>
            </nav>

            {/* ==== MOBILE MENU ==== */}
            <div className="lg:hidden flex justify-between items-center h-16 px-4 sm:px-6 shadow-md bg-primary">
                <Link to="/" className="text-white font-bold text-xl">
                    NAMDTU
                </Link>
                <button
                    onClick={toggleMobileMenu}
                    className="inline-flex items-center justify-center p-2 rounded-md text-white focus:outline-none"
                >
                    <span className="sr-only">Open main menu</span>
                    {isMobileMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                </button>
            </div>

            {isMobileMenuOpen && (
                <div className="lg:hidden bg-white shadow-lg">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navItems.map((item: NavItem) => (
                            <div key={item.title}>
                                {item.children ? (
                                    <>
                                        <button
                                            onClick={() => toggleMobileSubmenu(item.title)}
                                            className="w-full flex justify-between items-center text-gray-700 px-3 py-2 rounded-md text-lg font-medium hover:bg-gray-100"
                                        >
                                            <span>{item.title}</span>
                                            <ChevronDownIcon className={`w-5 h-5 transform transition-transform ${openMobileSubmenu === item.title ? 'rotate-180' : ''}`} />
                                        </button>
                                        {openMobileSubmenu === item.title && (
                                            <div className="pl-6 mt-1 space-y-1">
                                                {item.children.map((child: NavItem) => (
                                                    <Link
                                                        key={child.title}
                                                        to={child.href || '#'}
                                                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-[#0E104B] hover:bg-gray-50"
                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                    >
                                                        {child.title}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <Link
                                        to={item.href || '#'}
                                        className="block px-3 py-2 rounded-md text-lg font-medium text-gray-700 hover:bg-gray-100"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {item.title}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;