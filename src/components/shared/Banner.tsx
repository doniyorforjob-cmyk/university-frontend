import React from 'react';

interface BannerProps {
  title: string;
  backgroundImage: string;
}

const Banner: React.FC<BannerProps> = ({ title, backgroundImage }) => {
  return (
    <div
      className="relative h-48 bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center text-white z-10">
        <h1 className="text-4xl font-bold">
          {title}
        </h1>
      </div>
    </div>
  );
};

export default Banner;