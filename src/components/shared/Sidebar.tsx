import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fetchNavItems, NavItem } from '../../api/navbarApi';

const Sidebar = () => {
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const location = useLocation();
  const activeClasses = 'bg-blue-100 text-blue-600 font-semibold';

  useEffect(() => {
    const loadNavItems = async () => {
        const items = await fetchNavItems();
        setNavItems(items);
    };
    loadNavItems();
  }, []);

  const informationService = navItems.find(item => item.title === 'Axborot xizmati');

  return (
    <div>
      <div className="sticky top-24 space-y-8">
        {/* Qidiruv paneli */}
        <div className="bg-gray-100 p-6 shadow-lg">
          <div className="relative">
            <input
              type="text"
              placeholder="Yangiliklarni izlash..."
              className="w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        {/* Axborot xizmati */}
        <div className="bg-white shadow-md">
          <h3 className="text-lg font-bold text-white bg-blue-800 p-3">Axborot xizmati</h3>
          <ul className="space-y-1 p-4">
            {informationService?.children?.map((child: NavItem, index: number) => {
              const isActive = location.pathname.startsWith(child.href!);
              // OAV biz haqimizda linkini to'g'ri marshrutga o'zgartirish
              const href = child.href === '/media' ? '/media-about-us' : child.href;
              
              return (
                <li key={index}>
                  <Link
                    to={href!}
                    className={`block py-2 px-4 rounded-md transition-colors ${isActive ? activeClasses : 'hover:bg-gray-100'}`}
                  >
                    {child.title === "E'lonlar" ? "E'lonlar" : child.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;