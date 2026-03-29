import { useState, useEffect } from 'react';

/**
 * WebP format qo'llab-quvvatlashini tekshiruvchi hook
 */
export const useWebPSupport = () => {
  const [supportsWebP, setSupportsWebP] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkWebPSupport = async () => {
      try {
        // Canvas orqali WebP qo'llab-quvvatlashini tekshirish
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          setSupportsWebP(false);
          setIsLoading(false);
          return;
        }

        // WebP formatini sinab ko'rish
        canvas.toBlob((blob) => {
          const supports = blob !== null && blob.type === 'image/webp';
          setSupportsWebP(supports);
          setIsLoading(false);
        }, 'image/webp', 0.1);
      } catch (error) {
        // Xatolik bo'lsa, WebP qo'llab-quvvatlamaydi
        setSupportsWebP(false);
        setIsLoading(false);
      }
    };

    checkWebPSupport();
  }, []);

  return { supportsWebP, isLoading };
};