import React, { useState, useEffect } from "react";
import { useStandardSection } from './hooks/useStandardSection';
import { transformHeroData } from './transformers/heroTransformer';
import { homeApi } from '../../api/homeApi';
import Container from '../../components/shared/Container';
import { Button } from '@/components/ui/button';
import HeroFeatureCards from './components/HeroFeatureCards';

// Responsive utilities
const getResponsiveClasses = () => ({
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  title: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold',
  subtitle: 'text-base sm:text-lg md:text-xl',
  padding: 'py-16 sm:py-20 md:py-24 lg:py-32',
  button: 'px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg',
});

export default function HeroSection() {
  const responsiveClasses = getResponsiveClasses();
  const [videoError, setVideoError] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [startCardAnimation, setStartCardAnimation] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  // Yangi arxitektura: useStandardSection hook with API
  const { data, loading } = useStandardSection(
    'hero',
    homeApi.getHeroData,
    {
      ttlMinutes: 60, // 1 soat cache
      transformData: transformHeroData
    }
  );

  // Reset video states when data changes
  useEffect(() => {
    if (data?.backgroundVideo) {
      setVideoError(false);
      setIsVideoLoading(true);
      // Start card animation after initial data is loaded
      const timer = setTimeout(() => setStartCardAnimation(true), 300);
      return () => clearTimeout(timer);
    } else {
      setStartCardAnimation(false);
    }
  }, [data]);

  // Loading state - return null to hide the section completely while loading
  if (loading || !data) {
    return null;
  }

  const handleAnimationComplete = () => {
    setShowVideo(true);
  };

  return (
    <section className="relative min-h-[80vh] overflow-hidden">
      {/* Background - Video or Image */}
      {showVideo && data.backgroundVideo && !videoError ? (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            onCanPlayThrough={() => setIsVideoLoading(false)} // This will hide the fallback image
            onError={() => setVideoError(true)}
          >
            <source src={data.backgroundVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {isVideoLoading && (
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ // Fallback image while video loads
                backgroundImage: `url(${data.backgroundImage})`,
              }}
            />
          )}
        </div>
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${data.backgroundImage})`, // Initial background image
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            width: '100%',
            height: '100%',
          }}
        />
      )}

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "rgba(14, 16, 75, 0.7)", // #0E104B rangining RGBA formati, tabiiy shaffoflik uchun
        }}
      />

      {/* Content */}
      <Container>
        <div className={`relative z-10 flex items-center ${responsiveClasses.padding} min-h-full`}>
          {/* Left Side Content */}
          <div className="lg:w-3/5">
            {/* Title */}
            <h1
              className={`font-bold mb-6 text-secondary-500`}
              style={{
                lineHeight: '1.1',
                fontSize: 'clamp(1.6rem, 3.5vw, 3rem)' // Sarlavha o'lchami yana kichraytirildi
              }}
            >
              {data.title}
            </h1>

            {/* Subtitle */}
            <p
              className={`mb-8 max-w-xl text-white`}
              style={{
                lineHeight: '1.5',
                fontSize: 'clamp(1rem, 2.5vw, 1.25rem)'
              }}
            >
              {data.subtitle}
            </p>

            {/* CTA Button */}
            <Button asLink to={data.ctaButton.link} size="xl" className="shadow-lg transform hover:scale-105 transition-transform duration-300 bg-primary/60 hover:bg-primary/50">
              {data.ctaButton.text}
              <svg
                className="w-5 h-5" // Button komponenti ichidagi ikon uchun ml-2 kerak emas
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Button>
          </div>

          {/* Right Side - Placeholder for future content */}
          <div className="flex-1 hidden lg:flex items-center justify-center relative">
            <HeroFeatureCards
              startAnimation={startCardAnimation}
              onAnimationComplete={handleAnimationComplete}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
