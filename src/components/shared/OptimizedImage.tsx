import React, { useState, useRef, useEffect } from 'react';
import { useWebPSupport } from '../../hooks/useWebPSupport';
import { getWebPUrl, getAvifUrl, createImageObserver, generateBlurPlaceholder } from '../../utils/imageOptimization';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  aspectRatio?: number; // e.g., 16/9, 4/3, 1/1
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
  aspectRatio,
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
    return generateBlurPlaceholder(20, 20);
  };

  const avifUrl = getAvifUrl(src);
  const webpUrl = getWebPUrl(src);
  const hasSources = avifUrl !== src || webpUrl !== src;

  // Render content
  const renderImage = () => {
    // Agar tashqaridan object-fit klassi berilgan bo'lsa, default object-coverni ishlatmaymiz
    const hasObjectFit = className.includes('object-');

    return (
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={lazy ? 'lazy' : 'eager'}
        onLoad={handleLoad}
        onError={handleError}
        className={`${className} w-full h-full ${hasObjectFit ? '' : 'object-cover'} transition-all duration-500 ${isLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-lg'
          }`}
        style={{
          backgroundImage: !isLoaded ? `url(${getPlaceholder()})` : undefined,
          backgroundSize: 'cover',
        }}
      />
    );
  };

  // Xatolik bo'lganda - universitet logosini ko'rsatish
  if (hasError) {
    return (
      <div
        className={`relative bg-gray-50 flex items-center justify-center ${className}`}
        style={aspectRatio ? { aspectRatio: aspectRatio.toString(), width: width || '100%' } : { width, height }}
      >
        <img
          src="/images/logo.png"
          alt="NDTU Logo"
          className="absolute inset-0 m-auto w-1/2 h-1/2 object-contain opacity-50"
        />
      </div>
    );
  }

  // Skeletons
  if (!isInView && lazy) {
    return (
      <div
        ref={imgRef}
        className={`bg-gray-200 animate-pulse ${className}`}
        style={{ width, height }}
      />
    );
  }

  // Wrapper style ni hisoblash (inline style w-full ni buzmasligi uchun)
  const isFullWidth = className.includes('w-full');
  const isFullHeight = className.includes('h-full');

  const wrapperStyle: React.CSSProperties = aspectRatio
    ? {
      aspectRatio: aspectRatio.toString(),
      width: isFullWidth ? undefined : (width || '100%')
    }
    : {
      width: isFullWidth ? undefined : width,
      height: isFullHeight ? undefined : height
    };

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={wrapperStyle}
    >
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      {hasSources ? (
        <picture>
          {avifUrl !== src && <source srcSet={avifUrl} type="image/avif" />}
          {webpUrl !== src && <source srcSet={webpUrl} type="image/webp" />}
          {renderImage()}
        </picture>
      ) : (
        renderImage()
      )}
    </div>
  );
};

export default OptimizedImage;