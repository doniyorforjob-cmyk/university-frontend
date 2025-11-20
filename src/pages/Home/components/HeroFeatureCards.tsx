import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Monitor } from 'lucide-react';

interface CardData {
  title: string;
  href: string;
  icon: React.ComponentType<React.ComponentProps<'svg'>>;
  users: number;
}

const featureCards: CardData[] = [
  { title: 'Hemis', href: '#', icon: Monitor, users: 25000 },
  { title: 'Moodle', href: '#', icon: BookOpen, users: 15000 },
  { title: 'Kutubxona', href: '#', icon: BookOpen, users: 10000 },
  { title: 'Kadrlar', href: '#', icon: Users, users: 5000 },
];

interface HeroFeatureCardsProps {
  startAnimation: boolean;
  onAnimationComplete: () => void;
}

const HeroFeatureCards: React.FC<HeroFeatureCardsProps> = ({ startAnimation, onAnimationComplete }) => {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    if (startAnimation) {
      // Short delay to ensure the component is rendered before animating
      const startTimer = setTimeout(() => {
        setIsAnimated(true);
      }, 100);

      // Notify parent component that animation is finished
      const completeTimer = setTimeout(() => {
        onAnimationComplete();
      }, 1100); // Animation duration (1000ms) + start delay (100ms)

      return () => {
        clearTimeout(startTimer);
        clearTimeout(completeTimer);
      };
    }
  }, [startAnimation, onAnimationComplete]);

  const getCardTransform = (index: number): string => {
    if (!isAnimated) {
      return 'translate(0, 0) rotate(0deg) scale(0.5)';
    }
    switch (index) {
      case 0: // Yuqori chap
        return 'translate(-140px, -140px) rotate(0deg) scale(1)';
      case 1: // Yuqori o'ng
        return 'translate(140px, -140px) rotate(0deg) scale(1)';
      case 2: // Past o'ng
        return 'translate(140px, 140px) rotate(0deg) scale(1)';
      case 3: // Past chap
        return 'translate(-140px, 140px) rotate(0deg) scale(1)';
      default:
        return 'translate(0, 0) rotate(0deg) scale(1)';
    }
  };

  const getLineStyle = (index: number) => {
    const length = 169; // sqrt(120^2 + 120^2)
    switch (index) {
      case 0: // Yuqori chap
        return {
          width: `${length}px`,
          height: '2px',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) rotate(-45deg)',
          zIndex: 0,
        };
      case 1: // Yuqori o'ng
        return {
          width: `${length}px`,
          height: '2px',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) rotate(45deg)',
          zIndex: 0,
        };
      case 2: // Past o'ng
        return {
          width: `${length}px`,
          height: '2px',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) rotate(135deg)',
          zIndex: 0,
        };
      case 3: // Past chap
        return {
          width: `${length}px`,
          height: '2px',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) rotate(-135deg)',
          zIndex: 0,
        };
      default:
        return {};
    }
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center" style={{ transform: 'translateY(50px)' }}>
      {/* Center Logo */}
      <div
        className="absolute w-56 h-56 border-2 border-white/50 rounded-lg flex items-center justify-center"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1,
        }}
      >
        <div
          className="w-48 h-48 bg-primary rounded-lg flex items-center justify-center shadow-lg"
        >
          <img
            src="/logo192.png"
            alt="University Logo"
            className="w-44 h-44 object-contain"
          />
        </div>
      </div>
      {/* Connecting Lines */}
      {featureCards.map((card, index) => (
        <div
          key={`line-${index}`}
          className="absolute bg-white/30 transition-opacity duration-1000 ease-out"
          style={{
            ...getLineStyle(index),
            opacity: isAnimated ? 1 : 0,
            willChange: 'opacity',
          }}
        />
      ))}
      {featureCards.map((card, index) => (
        <Link
          to={card.href}
          key={index}
          className="absolute w-48 h-48 backdrop-blur-md bg-white/10 p-4 rounded-lg shadow-xl border border-white/20 transition-all duration-1000 ease-out flex items-center justify-center text-white hover:bg-white/20 hover:scale-110"
          style={{
            transform: getCardTransform(index),
            opacity: isAnimated ? 1 : 0,
            willChange: 'transform, opacity',
            zIndex: 1,
          }}
        >
          <div className="flex flex-col items-center gap-2">
            <card.icon className="w-10 h-10 flex-shrink-0 text-white/80" />
            <span className="text-3xl font-bold text-secondary-500">{card.users}</span>
            <span className="font-semibold text-base text-center">{card.title}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default HeroFeatureCards;
