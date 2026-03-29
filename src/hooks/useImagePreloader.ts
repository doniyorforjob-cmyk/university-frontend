import { useState, useEffect } from 'react';

interface UseImagePreloaderOptions {
  images: string[];
  enabled?: boolean;
}

export const useImagePreloader = ({ images, enabled = true }: UseImagePreloaderOptions) => {
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled || images.length === 0) {
      setLoaded(true);
      return;
    }

    setLoading(true);
    setError(null);

    let loadedCount = 0;
    const totalImages = images.length;

    images.forEach((src) => {
      const img = new Image();
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setLoading(false);
          setLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setLoading(false);
          setLoaded(true);
          setError('Some images failed to load');
        }
      };
      img.src = src;
    });
  }, [images, enabled]);

  return { loaded, loading, error };
};