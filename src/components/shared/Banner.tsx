import React from 'react';

interface BannerProps {
  title: string;
  subtitle?: string;
  backgroundImage: string;
}

const Banner: React.FC<BannerProps> = ({ title, subtitle, backgroundImage }) => {
  return (
    <div
      className="relative h-48 bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center text-white z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default Banner;