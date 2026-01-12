import React, { useState, useEffect } from 'react';
import { ChevronUpIcon } from '@heroicons/react/24/outline';
import { useLocation } from 'react-router-dom';

/**
 * Global "Yuqoriga qaytish" tugmasi va Avtomatik scroll reset
 * 1. Foydalanuvchi sahifani pastga scroll qilganda tugma paydo bo'ladi
 * 2. Sahifa o'zgarganda (pathname) avtomatik eng yuqoriga o'tadi
 */
const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { pathname } = useLocation();

  // 1. Sahifa o'zgarganda avtomatik yuqoriga chiqish
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // 2. Scroll holatini kuzatish (tugma uchun)
  useEffect(() => {
    const toggleVisibility = () => {
      // 300px dan ko'proq scroll qilganda ko'rsatish
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  // Yuqoriga scroll qilish funksiyasi
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 right-16 z-50 p-4 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-full shadow-2xl hover:from-blue-600 hover:to-blue-800 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all duration-300 ease-in-out group"
          aria-label="Yuqoriga qaytish"
        >
          <ChevronUpIcon className="w-8 h-8 group-hover:animate-bounce" />
        </button>
      )}
    </>
  );
};

export default ScrollToTop;

