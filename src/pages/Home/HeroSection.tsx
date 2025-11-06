import React, { useState, useEffect } from "react";
import Container from '../../components/shared/Container';
import { slides, cards } from '../../data/heroData';

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("left");
  const [progress, setProgress] = useState(0);

  // Avtomatik slayd o'zgarishi
  useEffect(() => {
    const interval = setInterval(() => {
      setSlideDirection("left");
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setProgress(0);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  // Progress bar
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => Math.min(prev + 1, 100));
    }, 70);
    return () => clearInterval(interval);
  }, []);

  // Slaydga o'tish funksiyasi
  const goToSlide = (index: number) => {
    setSlideDirection("left");
    setCurrentSlide(index);
  };

  return (
    <section className="w-full bg-gradient-to-r from-blue-100 to-white py-12 relative">
      <Container>
        <div className="flex items-center justify-between gap-8 h-[400px] relative overflow-hidden">
          {/* Karusel slaydlari */}
          <div className="flex w-full h-full relative">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out ${
                  index === currentSlide
                    ? "opacity-100 z-10"
                    : "opacity-0 z-0"
                }`}
                style={{ pointerEvents: index === currentSlide ? "auto" : "none" }}
              >
                <div className="flex flex-col md:flex-row items-start justify-between h-full">
                  {/* Chap tomonda matn */}
                  <div className="flex-1 pt-8">
                    <p className="text-sm text-blue-600 mb-2 uppercase tracking-wide">Universitet</p>
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h1>
                    <p className="text-xl md:text-2xl mb-6">{slide.description}</p>
                    <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition flex items-center gap-2">
                      <span>→</span> {slide.button}
                    </button>
                  </div>
                  {/* O'ng tomonda rasm */}
                  <div className="flex-1 flex justify-center items-center">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-auto max-h-[400px] object-cover rounded-lg shadow-lg"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* Pastdagi kartochkalar */}
      <div className="absolute left-1/2 transform -translate-x-1/2 hidden lg:flex justify-center gap-6 md:gap-12 w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8" style={{ bottom: '-32px', zIndex: 10 }}>
        {cards.map((card, index) => (
          <button
            key={index}
            type="button"
            className="relative backdrop-blur-md bg-white/30 rounded-xl shadow-lg p-6 min-w-0 flex-1 min-h-[140px] flex items-center justify-start gap-4 cursor-pointer transition hover:scale-105 focus:outline-none"
            onClick={() => goToSlide(index)}
          >
            <img
              src={slides[index].image}
              alt={card.title}
              className="h-16 w-16 object-cover rounded-lg flex-shrink-0"
            />
            <div className="flex flex-col items-start justify-center">
              <h3 className="text-lg font-semibold mb-1 text-left">{card.title}</h3>
              <p className="text-sm mb-2 text-left">{card.description}</p>
            </div>
            {index === currentSlide && (
              <div className="absolute bottom-0 left-6 right-6 h-1 bg-gray-300 rounded">
                <div className="h-1 bg-blue-500 rounded transition-all duration-100" style={{ width: `${progress}%` }}></div>
              </div>
            )}
          </button>
        ))}
      </div>

    </section>
  );
}
