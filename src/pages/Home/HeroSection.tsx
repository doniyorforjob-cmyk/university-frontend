import React from 'react';
import Container from '../../components/shared/Container';
import { Button } from '../../components/ui';

const HeroSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-slate-50 to-blue-50">
      <Container>
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-3xl font-extrabold tracking-tight leading-none md:text-4xl xl:text-5xl text-gray-900">
              Namangan Davlat Texnika Universiteti
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-700 lg:mb-8 md:text-lg lg:text-xl">
              Zamonaviy ta&apos;lim standartlari asosida yuqori malakali mutaxassislarni tayyorlaymiz. Biz bilan kelajagingizni quring!
            </p>
            <div className="space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
              <Button asLink to="/about" variant="default" size="lg">
                Batafsil ma&apos;lumot
                <svg
                  className="w-5 h-5 ml-2 -mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Button>
              <Button asLink to="/contact" variant="outline" size="lg">
                Biz bilan bog&apos;lanish
              </Button>
            </div>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img src="https://picsum.photos/600/400" alt="university building" className="w-full h-auto object-cover rounded-lg shadow-lg hover:scale-105 transition-transform duration-300" />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
