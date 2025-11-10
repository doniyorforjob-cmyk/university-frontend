import React, { useState, useRef, useEffect } from 'react';
import { useWebPSupport } from '../../hooks/useWebPSupport';
import { getWebPUrl, createImageObserver, generateBlurPlaceholder } from '../../utils/imageOptimization';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  lazy?: boolean;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * Optimizatsiya qilingan rasm komponenti
 * WebP qo'llab-quvvatlash, lazy loading, va placeholder
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  lazy = true,
  placeholder,
  onLoad,
  onError,
}) => {
  const { supportsWebP, isLoading: webpLoading } = useWebPSupport();
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(!lazy);
  const imgRef = useRef<HTMLImageElement>(null);

  // Lazy loading uchun Intersection Observer
  useEffect(() => {
    if (!lazy || isInView) return;

    const observer = createImageObserver((entry) => {
      setIsInView(true);
      observer.disconnect();
    });

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [lazy, isInView]);

  // Rasm yuklanganda
  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  // Xatolik bo'lganda
  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Placeholder yaratish
  const getPlaceholder = () => {
    if (placeholder) return placeholder;
    if (width && height) {
      return generateBlurPlaceholder(width / 10, height / 10);
    }
    return generateBlurPlaceholder();
  };

  // Agar WebP loading bo'lsa yoki lazy loading ishlamayotgan bo'lsa
  if (webpLoading || (lazy && !isInView)) {
    return (
      <div
        ref={imgRef}
        className={`bg-gray-200 animate-pulse ${className}`}
        style={{ width, height }}
        role="img"
        aria-label={alt}
      />
    );
  }

  // Xatolik bo'lganda
  if (hasError) {
    return (
      <div
        className={`bg-gray-100 flex items-center justify-center text-gray-400 text-sm ${className}`}
        style={{ width, height }}
        role="img"
        aria-label={`${alt} - Rasm yuklanmadi`}
      >
        Rasm yuklanmadi
      </div>
    );
  }

  // WebP qo'llab-quvvatlaydigan brauzerlar uchun
  if (supportsWebP) {
    return (
      <picture className={className}>
        <source srcSet={getWebPUrl(src)} type="image/webp" />
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={lazy ? 'lazy' : 'eager'}
          onLoad={handleLoad}
          onError={handleError}
          className={`${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
          style={{
            backgroundImage: !isLoaded ? `url(${getPlaceholder()})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </picture>
    );
  }

  // Oddiy rasm
  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
      width={width}
      height={height}
      loading={lazy ? 'lazy' : 'eager'}
      onLoad={handleLoad}
      onError={handleError}
      style={{
        backgroundImage: !isLoaded ? `url(${getPlaceholder()})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    />
  );
};

export default OptimizedImage;