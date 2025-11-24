import React, { useState, useRef, useEffect, JSX } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useClickOutside from '../../../hooks/useClickOutside';
import { fetchNavItems, NavItem } from '../../../api/navbarApi';
import { useCachedApi } from '../../../hooks/useCachedApi';
import Container from '../../shared/Container';
import { PrefetchLink } from '../../shared';
import {
  ChevronDownIcon,
  ChevronRightIcon,
  BuildingLibraryIcon,
} from '@heroicons/react/24/solid';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

interface NavbarProps {
  isSticky: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isSticky }) => {
  const { data: navItems, loading } = useCachedApi({
    key: 'navbar-items',
    fetcher: fetchNavItems,
    ttlMinutes: 60, // Cache for 1 hour
  });

  // Layout shift oldini olish uchun har doim array qaytarish
  const displayNavItems = navItems || [];
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenMobileSubmenu(null);
    setIsSearchOpen(false);
    setActiveDropdown(null);
  }, [location]);

  useClickOutside(navRef, () => {
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
    setOpenMobileSubmenu(null);
    setIsSearchOpen(false);
  });

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleMobileSubmenu = (title: string) => {
    setOpenMobileSubmenu(openMobileSubmenu === title ? null : title);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  // Dropdown yopish funksiyasi
  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  const getSectionDescription = (title: string): string => {
    const descriptions: Record<string, string> = {
      'Axborot xizmati':
        "Universitet yangiliklari, e'lonlar, press-relizlar va ommaviy axborot vositalari bilan hamkorlikni ta'minlovchi bo'lim. Bu yerda universitetdagi barcha voqealar haqida batafsil ma'lumot topishingiz mumkin.",
      Universitet:
        "Universitetning to'liq tarixi, rahbariyat tarkibi, strategik maqsad va vazifalari, shuningdek, rivojlanish rejalari haqida batafsil ma'lumot. Universitetning missiyasi va vizyoni shu yerda.",
      Tuzilma:
        "Universitetning to'liq tashkiliy tuzilmasi: rahbariyat, fakultetlar, kafedralar, bo'limlar va markazlar. Har bir bo'limning vazifalari va mas'ul shaxslar haqida batafsil.",
      Talabalar:
        "Talabalar hayoti, qabul jarayoni, stipendiya dasturlari, yotoqxona va talaba tashkilotlari haqida batafsil ma'lumot. Talabalar uchun qo'llanmalar va resurslar.",
      'Xalqaro aloqalar':
        "Xalqaro hamkorlik aloqalari, almashinuv dasturlari, grantlar va xalqaro loyihalar haqida batafsil. Chet el universitetlari bilan hamkorlik.",
      'Ilmiy faoliyat':
        "Ilmiy loyihalar, konferensiyalar, ilmiy nashrlar va innovatsiyalar haqida batafsil ma'lumot. Ilmiy markazlar va laboratoriyalar.",
      Kutubxona:
        "Elektron va an'anaviy kutubxona xizmatlari, ilmiy adabiyotlar, maqolalar va resurslar haqida batafsil. Onlayn katalog va qidiruv tizimi.",
      "Masofaviy ta'lim":
        "Onlayn kurslar, masofaviy o'qitish platformalari, videodarslar va resurslar haqida batafsil ma'lumot. Masofaviy ta'lim tizimi.",
    };
    return descriptions[title] || "Ushbu bo'lim haqida batafsil ma'lumot";
  };

  const getSectionIcon = (): JSX.Element => {
    return <BuildingLibraryIcon className="h-9 w-9" />;
  };

  return (
    <div className="font-sans bg-primary" ref={navRef}>
      {/* ==== DESKTOP NAVBAR ==== */}
      <Container>
        <nav className="relative hidden lg:flex items-center justify-between w-full h-16">
            <div
              className={`flex h-full items-center transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}
            >
              {isSticky && (
                <Link
                  to="/"
                  className="flex items-center h-full px-4 text-[#0E104B] bg-white hover:bg-gray-100 transition-colors duration-300"
                  title="Bosh sahifa"
                  onClick={closeDropdown}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-7 h-7"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                  </svg>
                </Link>
              )}

              {displayNavItems.map((item: NavItem) => {
                const hasCategories =
                  item.children && item.children.some((child) => child.children && child.children.length > 0);

                return (
                  <div
                    key={item.title}
                    className="group h-full"
                    onMouseEnter={() => item.children && setActiveDropdown(item.title)}
                    onMouseLeave={() => item.children && setActiveDropdown(null)}
                  >
                    <PrefetchLink
                      to={item.title === 'Universitet' ? '/university' : (item.href || '#')}
                      prefetch={true}
                      prefetchDelay={150}
                      onClick={() => {
                        closeDropdown();
                        if (item.children) {
                          // Dropdown mavjud bo'lsa, hover effektini to'xtatish uchun
                          const element = document.activeElement as HTMLElement;
                          element?.blur();
                        }
                      }}
                      className={`flex items-center h-full px-4 text-base font-bold transition-colors duration-300 cursor-pointer ${
                        activeDropdown === item.title
                          ? 'bg-white text-black'
                          : 'text-white hover:bg-white hover:text-black'
                      }`}
                    >
                      <span>{item.title}</span>
                      {item.children && <ChevronDownIcon className="w-5 h-5 ml-1" />}
                    </PrefetchLink>

                    {/* ==== DROPDOWN ==== */}
                    {item.children && activeDropdown === item.title && (
                      <div
                        className="absolute top-full left-0 right-0 z-50 pointer-events-none bg-white"
                      >
                        <div className="pointer-events-auto">
                          <div className="bg-white border shadow-lg overflow-hidden animate-slide-in-bottom">
                            <div className="p-6">
                              <div className="grid grid-cols-3 gap-8">
                                {/* LEFT PANEL */}
                                <div className="col-span-1 space-y-4">
                                  <div className="flex items-start gap-4">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20">
                                      {getSectionIcon()}
                                    </div>
                                    <h3 className="text-xl font-bold text-black">{item.title}</h3>
                                  </div>
                                  <p className="text-base text-black leading-relaxed max-w-xs">
                                    {getSectionDescription(item.title)}
                                  </p>
                                </div>

                                {/* RIGHT PANEL */}
                                <div className="col-span-2">
                                  {item.title === 'Tuzilma' ? (
                                    <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                                      {/* RAHBARIYAT */}
                                      <div>
                                        <h4 className="text-base font-bold text-black mb-3 pb-1 border-b border-primary/20 inline-block">
                                          Rahbariyat
                                        </h4>
                                        <ul className="space-y-2">
                                          {[
                                            { to: "/rahbariyat/rektor", label: "Rektor" },
                                            { to: "/rahbariyat/prorektorlar", label: "Prorektorlar" },
                                          ].map((link) => (
                                            <li key={link.to}>
                                              <Link
                                                to={link.to}
                                                onClick={closeDropdown}
                                                className="
                                                  flex items-center gap-2 text-base font-medium text-black
                                                  border-b border-gray-300
                                                  hover:bg-gray-100
                                                  px-3 py-2 transition-all duration-150
                                                "
                                              >
                                                <ChevronRightIcon className="h-5 w-5 opacity-60" />
                                                {link.label}
                                              </Link>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>

                                      {/* FAKULTETLAR */}
                                      <div>
                                        <h4 className="text-base font-bold text-black mb-3 pb-1 border-b border-primary/20 inline-block">
                                          Fakultetlar
                                        </h4>
                                        <ul className="space-y-2">
                                          {[
                                            { to: "/fakultetlar/informatika", label: "Informatika fakulteti" },
                                            { to: "/fakultetlar/multimedia", label: "Multimedia texnologiyalari fakulteti" },
                                          ].map((link) => (
                                            <li key={link.to}>
                                              <Link
                                                to={link.to}
                                                onClick={closeDropdown}
                                                className="
                                                  flex items-center gap-2 text-base font-medium text-black
                                                  border-b border-gray-300
                                                  hover:bg-gray-100
                                                  px-3 py-2 transition-all duration-150
                                                "
                                              >
                                                <ChevronRightIcon className="h-5 w-5 opacity-60" />
                                                {link.label}
                                              </Link>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>

                                      {/* KAFEDRALAR */}
                                      <div>
                                        <h4 className="text-base font-bold text-black mb-3 pb-1 border-b border-primary/20 inline-block">
                                          Kafedralar
                                        </h4>
                                        <ul className="space-y-2">
                                          {[
                                            { to: "/kafedralar/matematika", label: "Matematika kafedrasi" },
                                            { to: "/kafedralar/programmalash", label: "Dasturlash kafedrasi" },
                                          ].map((link) => (
                                            <li key={link.to}>
                                              <Link
                                                to={link.to}
                                                onClick={closeDropdown}
                                                className="
                                                  flex items-center gap-2 text-base font-medium text-black
                                                  border-b border-gray-300
                                                  hover:bg-gray-100
                                                  px-3 py-2 transition-all duration-150
                                                "
                                              >
                                                <ChevronRightIcon className="h-5 w-5 opacity-60" />
                                                {link.label}
                                              </Link>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>

                                      {/* BO'LIMLAR */}
                                      <div>
                                        <h4 className="text-base font-bold text-black mb-3 pb-1 border-b border-primary/20 inline-block">
                                          Bo&apos;limlar
                                        </h4>
                                        <ul className="space-y-2">
                                          {[
                                            { to: "/tuzilma/bolimlar/marketing", label: "Marketing bo&apos;limi" },
                                            { to: "/tuzilma/bolimlar/raqamli-texnologiyalar", label: "Raqamli texnologiyalarni rivojlantirish" },
                                          ].map((link) => (
                                            <li key={link.to}>
                                              <Link
                                                to={link.to}
                                                onClick={closeDropdown}
                                                className="
                                                  flex items-center gap-2 text-base font-medium text-black
                                                  border-b border-gray-300
                                                  hover:bg-gray-100
                                                  px-3 py-2 transition-all duration-150
                                                "
                                              >
                                                <ChevronRightIcon className="h-5 w-5 opacity-60" />
                                                {link.label}
                                              </Link>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    </div>
                                  ) : hasCategories ? (
                                    <div className="grid grid-cols-2 gap-6">
                                      {item.children!.map((category: NavItem) => (
                                        <div key={category.title} className="space-y-3">
                                          <Link
                                            to={category.href || '#'}
                                            onClick={closeDropdown}
                                            className="
                                              block text-lg font-bold text-black
                                              border-b-2 border-primary
                                              hover:bg-primary/5
                                              pb-1 transition-all duration-150
                                            "
                                          >
                                            {category.title}
                                          </Link>
                                          {category.children && (
                                            <ul className="space-y-1">
                                              {category.children.map((link: NavItem) => (
                                                <li key={link.title}>
                                                  <Link
                                                    to={link.href!}
                                                    onClick={closeDropdown}
                                                    className="
                                                      flex items-center gap-2 text-base font-medium text-black
                                                      border-b border-gray-300
                                                      hover:bg-gray-100
                                                      px-3 py-2 transition-all duration-150
                                                    "
                                                  >
                                                    <ChevronRightIcon className="h-5 w-5 opacity-50" />
                                                    {link.title}
                                                  </Link>
                                                </li>
                                              ))}
                                            </ul>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <ul className="grid grid-cols-2 gap-x-8 gap-y-2">
                                      {item.children!.map((link: NavItem) => (
                                        <li key={link.title}>
                                          <Link
                                            to={link.href!}
                                            onClick={closeDropdown}
                                            className="
                                              flex items-center gap-2 text-base font-medium text-black
                                              border-b border-gray-300
                                              hover:bg-gray-100
                                              px-3 py-2 transition-all duration-150
                                            "
                                          >
                                            <ChevronRightIcon className="h-5 w-5 opacity-60" />
                                            {link.title}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                </div>
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
            <div className="relative h-full ml-16 group">
              <button
                onClick={toggleSearch}
                className="flex items-center h-full px-4 text-base font-medium text-white hover:bg-navbar-dropdown hover:text-black transition-colors duration-300 cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path
                    fillRule="evenodd"
                    d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {/* SEARCH DROPDOWN */}
              <div
                className={`absolute top-[100%] right-0 w-80 bg-white rounded-lg shadow-lg border border-gray-200 transition-all duration-200 z-50 ${
                  isSearchOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
              >
                <div className="relative p-4">
                  <input
                    type="text"
                    placeholder="Saytdan qidirish..."
                    className="w-full px-4 py-3 pr-14 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-blue-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
        </nav>
      </Container>

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
            {displayNavItems.map((item: NavItem) => (
              <div key={item.title}>
                {item.children ? (
                  <>
                    <button
                      onClick={() => toggleMobileSubmenu(item.title)}
                      className="w-full flex justify-between items-center text-gray-700 px-3 py-2 rounded-md text-lg font-medium hover:bg-gray-100"
                    >
                      <span>{item.title}</span>
                      <ChevronDownIcon
                        className={`w-5 h-5 transform transition-transform ${
                          openMobileSubmenu === item.title ? 'rotate-180' : ''
                        }`}
                      />
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